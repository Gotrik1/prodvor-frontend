
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Configuration } from './configuration';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev';

const api = axios.create({
  baseURL: API_BASE_URL,
});

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

export const apiConfig = new Configuration({
    basePath: API_BASE_URL,
    accessToken: (name?: string, scopes?: string[]) => useUserStore.getState().accessToken || '',
});

export default api;
