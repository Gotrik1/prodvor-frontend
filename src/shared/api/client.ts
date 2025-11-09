import { Configuration } from "@/shared/api/sdk";
import api from "./axios-instance";

// This configuration is used by the generated SDK client.
// It injects our custom axios instance which handles Bearer tokens
// and automatic token refreshing.
export const apiConfig = new Configuration({
  basePath: process.env.NEXT_PUBLIC_API_BASE_URL,
  baseOptions: {
    // By passing our configured axios instance, we leverage its interceptors.
    adapter: api.defaults.adapter,
  }
});
