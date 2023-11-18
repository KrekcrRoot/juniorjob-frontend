export const useTokenFetch = (request , options)=>{
    const config = useRuntimeConfig()
    const { route, token, ...opts } = options || {};
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    }
    return useFetch(request,{baseURL:config.public.baseURL, headers,
        onRequest({ request, options }) {
            // Set the request headers
        },
        onRequestError({ request, options, error }) {
            // Handle the request errors
        },
        onResponse({ request, response, options }) {
            // Process the response data
            return response._data
        },
        onResponseError({ request, response, options }) {
            // Handle the response errors
        },
        ...opts})
}