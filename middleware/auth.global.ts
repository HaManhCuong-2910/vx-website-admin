import { useAuthStore } from "../store/auth";
import { useDialogStore } from "@/store/dialog";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const dialogStore = useDialogStore();
  const { closeDialog } = dialogStore;
  const { accessToken } = authStore;

  closeDialog();
  // if (!accessToken && to.name !== "login") {
  //   return navigateTo("/login");
  // }
});
