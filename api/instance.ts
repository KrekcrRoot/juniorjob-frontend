import axios from "axios";
import {useUserStore} from "~/store/user";
import api from ".";

const instance = axios.create({
    baseURL: 'https://api.junior-job.ru',
    withCredentials: true,
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
    }
})

instance.interceptors.request.use((config) => {
    if(process.client) {
        const userStore = useUserStore()
        config.headers.Authorization = `Bearer ${userStore.access_token}`

    }
    return config
})

instance.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if ( (error.response.status === 403 || error.response.status === 401) && !originalRequest._retry ) {
        originalRequest._retry = true;

        if(process.client) {
            const userStore = useUserStore()
        await api.auth.refresh({
            access_token: userStore.access_token,
            refresh_token: userStore.refresh_token
        })
    }
    }
}
)

export default instance