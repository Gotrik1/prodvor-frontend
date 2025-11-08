'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Configuration } from './configuration';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// 🔹 Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (!config.headers["Content-Type"] && config.data) {
    config.headers["Content-Type"] = "application/json";
  }
  return config;
});

// 🔹 Авто-refresh при 401
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string | null) => void, reject: (error: any) => void }> = [];

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
  (r) => r,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject});
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return api(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, signOut } = useUserStore.getState();
      if (!refreshToken) {
        signOut();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const ref = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken });
        const newAccessToken = ref.data?.accessToken;
        if (!newAccessToken) throw new Error("No new access token");

        setTokens({ accessToken: newAccessToken });
        api.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;
        originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;
        
        processQueue(null, newAccessToken);
        return api(originalRequest);

      } catch (e) {
        processQueue(e, null);
        signOut();
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  }
);


export const apiConfig = new Configuration({
    basePath: BASE_URL,
    accessToken: () => useUserStore.getState().accessToken || '',
});
