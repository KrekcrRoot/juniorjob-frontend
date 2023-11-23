import axios from "axios";
import {useUserStore} from "~/store/user";

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

export default instance