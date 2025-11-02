
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const api = axios.create({
  baseURL: 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
  headers: {
    'Content-Type': 'application/json', // Ensure all requests default to JSON
  },
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
                const refreshResponse = await axios.post(`https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/api/v1/auth/refresh`, {}, {
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
