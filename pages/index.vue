<script setup>
import { onMounted } from "vue";
import socket from "~/plugins/socket";
// import { io } from "socket.io-client";

definePageMeta({
  layout: "default",
});

// const socket = io("wss://socket.junior-job.ru", {
//   query: {
//     user_uuid: "78dce235-cc1a-48ca-89d7-0faf47e7d867",
//   },
//   extraHeaders: {
//     authorization:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNjMDI5YjktZTFiMy00OWFiLWFhZGEtOTM1NWQwZjU2NzdjIiwiZW1haWwiOiJtb2RlckBiay5ydSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpYXQiOjE3MTExMjYzODUsImV4cCI6MTcxMTEyNzI4NX0.PjruxXvzJqLl6rpmUKOyLLhLKtejTM-b986Sj9tlqnU",
//   },
//   transports: ["websocket"],
// });

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

// socket.on("disconnect", (reason) => {
//   console.log(`Disconnected: ${reason}`);
// });

// socket.on("error", (error) => {
//   console.error(`Connection error: ${error}`);
// });

// const onClick = () => {
//   socket.emit(
//     "message",
//     JSON.stringify({
//       body: "message",
//     })
//   );
// };
</script>

<template>
  <div class="container mx-auto xl:mt-14 px-5">
    <div class="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-20">
      <div>
        <div class="xl:mt-12 mt-4">
          <VacancyList />
        </div>
        <div class="xl:mt-12 mt-4">
          <ProfessionList />
        </div>
      </div>
      <div>
        <div class="xl:mt-12">
          <ArticlesList />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
