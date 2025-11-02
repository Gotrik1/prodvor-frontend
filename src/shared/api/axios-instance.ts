'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const api = axios.create({
  baseURL: 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev',
});

api.interceptors.request.use(
  (config) => {
    const token = useUserStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // For GET requests, ensure Content-Type is not set to avoid 422 error
    if (config.method === 'get') {
        delete config.headers['Content-Type'];
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
    if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('refreshToken');

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
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
