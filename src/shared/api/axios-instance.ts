'use client';

import axios, { AxiosError, type AxiosInstance, type RawAxiosRequestConfig } from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// ====== State for refresh logic (lock + queue) ======
let isRefreshing = false;
let failedQueue: Array<(token: string | null) => void> = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom(null); // Reject promise by resolving with null
    } else {
      prom(token);
    }
  });

  failedQueue = [];
};

// ====== 1. Interceptor to add accessToken to every request ======
api.interceptors.request.use(
  (config) => {
    const accessToken = useUserStore.getState().accessToken;
    if (accessToken && !config.headers?.Authorization) {
      config.headers = { ...config.headers, Authorization: `Bearer ${accessToken}` };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ====== 2. Interceptor to handle token refresh on 401 errors ======
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RawAxiosRequestConfig & { _retry?: boolean };

    // If it's a 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const url = (originalRequest.url || "").toLowerCase();
      // Protect against loops on auth endpoints
      if (url.includes("/auth/login") || url.includes("/auth/refresh")) {
        useUserStore.getState().signOut(); // Force logout
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push((token: string | null) => {
            if (token) {
              originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${token}` };
              resolve(api(originalRequest));
            } else {
              resolve(Promise.reject(error));
            }
          });
        });
      }

      isRefreshing = true;
      
      const { refreshToken, setTokens, signOut } = useUserStore.getState();

      if (!refreshToken) {
        await signOut();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}/api/v1/auth/refresh`,
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
        if (!newAccessToken) throw new Error("Invalid refresh response");

        setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken || refreshToken });

        originalRequest.headers = { ...originalRequest.headers, Authorization: `Bearer ${newAccessToken}` };
        processQueue(null, newAccessToken);
        
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed, logging out:', refreshError);
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

export default api;
