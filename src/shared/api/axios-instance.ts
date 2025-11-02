
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor to add the auth token
api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    // If the error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/api/v1/auth/refresh`, {}, {
            headers: {
                Authorization: `Bearer ${refreshToken}`
            }
        });
        
        const { accessToken: newAccessToken } = refreshResponse.data;
        useUserStore.getState().setTokens(newAccessToken, refreshToken);
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);

      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        useUserStore.getState().signOut();
        // Redirect to login page
        if (typeof window !== 'undefined') {
            window.location.href = '/auth';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
