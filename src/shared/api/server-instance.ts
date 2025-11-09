
import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

// This is a server-safe instance of axios, without any client-side interceptors.
export const api = axios.create({
  baseURL: BASE_URL,
});
