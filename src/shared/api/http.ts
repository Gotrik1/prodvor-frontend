'use client';

import axios, { type AxiosError, type AxiosInstance, type RawAxiosRequestConfig } from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

export const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

http.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('API error:', err?.response?.data || err);
    return Promise.reject(err);
  }
);


let isRefreshing = false;
let failedQueue: Array<{ resolve: (value?: any) => void; reject: (reason?: any) => void }> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

http.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken && !config.headers?.Authorization) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RawAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return http(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, signOut } = useUserStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
        await signOut();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        
        setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken || refreshToken });
        
        if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken);
        
        return http(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError as Error, null);
        await signOut();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default http;
