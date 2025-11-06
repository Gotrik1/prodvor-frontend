
'use client';

import axios, { type AxiosRequestConfig } from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Configuration } from './configuration';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// 1. Access Token -> в каждый запрос
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// 2. 401 -> refresh -> повтор
let isRefreshing = false;
let failedQueue: { resolve: (token: string | null) => void; reject: (error: any) => void; }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
            return Promise.reject(err);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, signOut } = useUserStore.getState();

      if (!refreshToken) {
        signOut();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, { refreshToken });
        const newAccessToken = data.accessToken;
        
        setTokens({ accessToken: newAccessToken });
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        processQueue(null, newAccessToken);
        return api(originalRequest);
        
      } catch (refreshError) {
        processQueue(refreshError, null);
        signOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);


export const apiConfig = new Configuration({
    basePath: API_BASE_URL,
    accessToken: () => useUserStore.getState().accessToken || '',
});


export default api;
