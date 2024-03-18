import { io } from "socket.io-client";

export default defineNuxtPlugin((nuxtApp) => {
  const socket = io("wss://socket.junior-job.ru");
  return socket;
});
