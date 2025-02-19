export const useAPIFetch: typeof useLazyFetch = (request, opts?) => {
    const config = useRuntimeConfig()
  
    return useLazyFetch(request, { baseURL: config.public.baseURL, ...opts })
  }