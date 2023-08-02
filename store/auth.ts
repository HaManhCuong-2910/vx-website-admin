import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      accessToken: "",
    };
  },
  actions: {
    setAccessToken(value: string) {
      this.accessToken = value;
    },
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
  },
});
