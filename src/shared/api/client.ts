import { Api } from "@/shared/api/sdk"; 
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";

export const api = new Api({
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || "https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev",
  TOKEN: async () => useUserStore.getState().accessToken || "",
});
