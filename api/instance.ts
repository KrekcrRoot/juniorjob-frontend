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

instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    async function (error) {
      const originalRequest = error.config;
      if ((error.response.status === 403) && !originalRequest._retry) {
        originalRequest._retry = true;
  
        if (process.client) {
          const userStore = useUserStore();
          await api.auth.refresh({
            access_token: userStore.access_token,
            refresh_token: userStore.refresh_token,
          });
  
          // После успешного обновления токенов, повторяем оригинальный запрос
          const retryResponse = await instance(originalRequest);
  
          // Возвращаем только тело ответа
          return retryResponse.data;
        }
      }
  
      // Если не 403 или повторная попытка, возвращаем ошибку
      return Promise.reject(error);
    }
  );

export default instance