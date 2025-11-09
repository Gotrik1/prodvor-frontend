
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Configuration } from './configuration';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:6000';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// 1. Interceptor to add the token to every request
api.interceptors.request.use(
  (config) => {
    // Make sure we get the fresh token on every request
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (!config.headers['Content-Type'] && config.data) {
        config.headers['Content-Type'] = 'application/json';
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 2. Interceptor to handle token refresh on 401 errors
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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, setTokens, signOut } = useUserStore.getState();

      if (!refreshToken) {
        // No refresh token available, logout immediately.
        await signOut();
        isRefreshing = false;
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/api/v1/auth/refresh`, { refreshToken });
        
        const newAccessToken = data.accessToken;
        if (!newAccessToken) {
            throw new Error("No new access token received");
        }

        setTokens({ accessToken: newAccessToken });
        // Update the default header for subsequent requests
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        processQueue(refreshError, null);
        await signOut(); // Logout if refresh fails
        return Promise.reject(refreshError);
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
