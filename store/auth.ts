import moment from "moment";
import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth-store",
  state: () => {
    return {
      accessToken: "",
      user: null as any,
    };
  },
  actions: {
    setAccessToken(value: string) {
      this.accessToken = value;
    },
    setDataUser(value: any) {
      this.user = value;
    },
    logout() {
      this.accessToken = "";
      this.user = null;
    },
  },
  getters: {
    getAccessToken: (state) => state.accessToken,
  },
  persist: {
    storage: persistedState.cookiesWithOptions({
      sameSite: "strict",
      expires: moment(new Date()).add(1, "days").toDate(),
    }),
  },
});
