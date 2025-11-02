
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    // This function now correctly runs on the client side before each request.
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // This interceptor will now only run on the client side, preventing server-side errors.
    if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Use a separate axios instance for refresh to avoid circular interceptor calls
                const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/refresh`, {}, {
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
                window.location.href = '/auth'; // Force redirect to login
                return Promise.reject(refreshError);
            }
        }
    }
    return Promise.reject(error);
  }
);


export default api;
