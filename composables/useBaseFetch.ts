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
  const { accessToken } = authStore;
  const config = useRuntimeConfig();
  return await $fetch(request, {
    baseURL: config.public.apiBase,
    headers: {
      Authorization: `Bearer ${accessToken || ""}`,
    },
    ...option,
  });
};
