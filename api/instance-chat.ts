import axios from "axios";
import { useUserStore } from "~/store/user";
import api from ".";

const instanceChat = axios.create({
  baseURL: "https://chatapi.junior-job.ru",
  withCredentials: true,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

instanceChat.interceptors.request.use((config) => {
  if (process.client) {
    const userStore = useUserStore();
    if (
      userStore.access_token.trim() !== "" &&
      userStore.refresh_token.trim() !== ""
    ) {
      config.headers.Authorization = `Bearer ${userStore.access_token}`;
    }
  }
  return config;
});

instanceChat.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.data.statusCode === 409 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      return error.response;
    }

    if (
      error.response &&
      error.response.data.statusCode === 401 &&
      !originalRequest._retry
    ) {
      const userStore = useUserStore();
      originalRequest._retry = true;

      try {
        const tokens = await api.auth.refresh({
          access_token: userStore.access_token,
          refresh_token: userStore.refresh_token,
        });

        // @ts-ignore
        userStore.access_token = tokens.access_token;
        // @ts-ignore
        userStore.refresh_token = tokens.refresh_token;

        originalRequest.headers["Authorization"] =
          "Bearer " + userStore.access_token;
        return instanceChat(originalRequest);
      } catch (e) {
        userStore.access_token = "";
        userStore.refresh_token = "";
        userStore.logout();
        //     сделай редирект на главную страницу после логаута
      }
    }

    return Promise.reject(error);
  }
);

export default instanceChat;
