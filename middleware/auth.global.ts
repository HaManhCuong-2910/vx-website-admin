import { useAuthStore } from "../store/auth";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const { accessToken } = authStore;
  // if (!accessToken && to.name !== "login") {
  //   return navigateTo("/login");
  // }
});
