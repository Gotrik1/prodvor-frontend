
'use client';

import axios from 'axios';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Configuration } from './configuration';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "/api"; // nginx сам проксирует /api → backend

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// 🔹 Добавляем токен в каждый запрос
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  if (!config.headers["Content-Type"] && config.data)
    config.headers["Content-Type"] = "application/json";
  return config;
});

// 🔹 Авто-refresh при 401
let isRefreshing = false;
let queue: Array<(t: string | null) => void> = [];

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    const { response, config } = error;
    if (!response) throw error;
    const original = config as any;

    if (response.status === 401 && !original._retry) {
      original._retry = true;
      const { refreshToken, setTokens, signOut } = useUserStore.getState();
      if (!refreshToken) {
        signOut();
        throw error;
      }

      if (isRefreshing) {
        // Подождать, пока другой refresh завершится
        const token = await new Promise<string | null>((res) => queue.push(res));
        if (token) original.headers.Authorization = `Bearer ${token}`;
        return api(original);
      }

      try {
        isRefreshing = true;
        const ref = await axios.post(`${BASE_URL}/v1/auth/refresh`, { refreshToken });
        const newAccess = ref.data?.accessToken;
        if (!newAccess) throw new Error("no access token");
        setTokens({ accessToken: newAccess });
        queue.forEach((res) => res(newAccess));
        queue = [];
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      } catch (e) {
        queue.forEach((res) => res(null));
        queue = [];
        useUserStore.getState().signOut();
        throw e;
      } finally {
        isRefreshing = false;
      }
    }
    throw error;
  }
);


export const apiConfig = new Configuration({
    basePath: BASE_URL,
    accessToken: () => useUserStore.getState().accessToken || '',
});


export default api;
