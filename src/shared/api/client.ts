import { Api } from "@/shared/api/sdk"; 
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";

export const api = new Api({
  BASE: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000",
  TOKEN: async () => useUserStore.getState().accessToken || "",
});
