import { storeToRefs } from "pinia";
import { useAuthStore } from "../store/auth";
import { useDialogStore } from "@/store/dialog";
export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const dialogStore = useDialogStore();
  const { closeDialog } = dialogStore;
  const { accessToken } = storeToRefs(authStore);

  closeDialog();
  if (!accessToken.value && to.name !== "login") {
    return navigateTo("/login");
  }

  if (accessToken.value && to.name === "login") {
    return navigateTo("/");
  }
});
