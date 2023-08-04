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
  const config = useRuntimeConfig();
  return await $fetch(request, {
    baseURL: config.public.apiBase,
    headers: {
      Signature: "cuongtest",
    },
    ...option,
  });
};
