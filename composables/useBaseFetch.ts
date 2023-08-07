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
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZDBiYWFlN2ZjNzY1ZWQ0NDFhYWJiYyIsInN0YXR1cyI6IkFDVElWRSIsInJvbGVzIjpbXSwiaWF0IjoxNjkxNDIyOTQ2LCJleHAiOjE2OTE1MDkzNDZ9.TMOHcFMqAIWdJE-pPt2ioXj8mv7Rdbq0USCJUaNM9AU",
    },
    ...option,
  });
};
