
'use client';

import axios, { type AxiosError, type AxiosInstance, type RawAxiosRequestConfig, AxiosHeaders } from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

// This is a server-safe instance of axios, without any client-side interceptors.
export const apiConfig = {
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
};

const api = axios.create(apiConfig);

api.interceptors.response.use(
  (r) => r,
  (err) => {
    console.error('API error:', err?.response?.data || err);
    return Promise.reject(err);
  }
);

// This is the instance that SHOULD be used for client-side authenticated requests.
const httpAuth: AxiosInstance = axios.create(apiConfig);

httpAuth.interceptors.request.use(async (config) => {
    const accessToken = useUserStore.getState?.().accessToken;
    
    if (accessToken) {
        if (!(config.headers instanceof AxiosHeaders)) {
            config.headers = new AxiosHeaders(config.headers);
        }
        config.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return config;
});

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

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              (originalRequest.headers as AxiosHeaders).set('Authorization', `Bearer ${token}`);
            }
            return httpAuth(originalRequest);
          })
          .catch((err) => Promise.reject(err));
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
        const refreshResponse = await api.post(
          '/api/v1/auth/refresh',
          { refresh_token: refreshToken },
        );
        
        const { access_token: newAccessToken, refresh_token: newRefreshToken } = refreshResponse.data;
        
        setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken || refreshToken });
        
        if (originalRequest.headers) {
            (originalRequest.headers as AxiosHeaders).set('Authorization', `Bearer ${newAccessToken}`);
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


export default api;
export { httpAuth };

    