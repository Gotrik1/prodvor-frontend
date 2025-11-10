
'use client';

import axios, { type AxiosError, type AxiosInstance, type RawAxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

// Публичный клиент — безопасен в Server Actions / на сервере
export const httpPublic: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpPublic.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('API error:', err?.response?.data || err);
    return Promise.reject(err);
  }
);


// Авторизованный клиент — токен и рефреш логика добавляются ТОЛЬКО в браузере
export const httpAuth: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

httpAuth.interceptors.request.use(async (config) => {
    // На сервере (Server Actions / RSC) — НИЧЕГО не делаем
    if (typeof window === 'undefined') {
        return config;
    }
    
    // Динамически импортим стор только в браузере
    const { useUserStore } = await import('@/widgets/dashboard-header/model/user-store');
    const accessToken = useUserStore.getState?.().accessToken;

    if (accessToken && !config.headers?.Authorization) {
        config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
});

// Перехватчик для обновления токена - только для авторизованного клиента
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

httpAuth.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RawAxiosRequestConfig & { _retry?: boolean };

    // Работаем только в браузере, где есть стор
    if (typeof window !== 'undefined' && error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
            }
            return httpAuth(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { useUserStore } = await import('@/widgets/dashboard-header/model/user-store');
      const { refreshToken, setTokens, signOut } = useUserStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
        await signOut();
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await httpPublic.post(
          '/api/v1/auth/refresh',
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        
        setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken || refreshToken });
        
        if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }
        processQueue(null, newAccessToken);
        
        return httpAuth(originalRequest);

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
