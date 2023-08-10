import { useAuthStore } from "@/store/auth";

interface SearchParameters {
  [key: string]: any;
}
interface FetchBaseOption {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: RequestInit["body"] | Record<string, any>;
  params?: SearchParameters;
  query?: SearchParameters;
}

export const useBaseFetch = async (
  request: string,
  option: FetchBaseOption
) => {
  const authStore = useAuthStore();
  const router = useRouter();
  const { accessToken } = authStore;
  const config = useRuntimeConfig();
  try {
    return await $fetch(request, {
      baseURL: config.public.apiBase,
      headers: {
        Authorization: `Bearer ${accessToken || ""}`,
      },
      ...option,
    });
  } catch (error: any) {
    if (error.data.statusCode === 406 || error.data.statusCode === 401) {
      authStore.logout();
      window.location.reload();
    }
  }
};
