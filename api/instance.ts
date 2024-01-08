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
      console.log(error)
      const originalRequest = error.config;
      if(error.response) {
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
          originalRequest._retry = true;
    
          if (process.client) {
            const userStore = useUserStore();
            try {
              await userStore.refresh()
            }
            catch(error: any) {
              userStore.access_token = '';
              userStore.refresh_token = '';
              userStore.user = null;
            }
            // await api.auth.refresh({
            //   access_token: userStore.access_token,
            //   refresh_token: userStore.refresh_token,
            // });
    
            const retryResponse = await instance(originalRequest);

            axios.defaults.headers.common['Authorization'] = 'Bearer ' + userStore.access_token;
            originalRequest.headers['Authorization'] = 'Bearer ' + userStore.access_token;

            return axios(retryResponse);
          }
        }
      }

  
      // Если не 403 или повторная попытка, возвращаем ошибку
      return Promise.reject(error);
    }
  );

export default instance