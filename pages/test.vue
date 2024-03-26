<template>
  <div>
    <!-- Ваш компонент -->
    <button @click="button">button</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
    };
  },
  mounted() {
    if (process.client) {
      this.initializeSocket();
    }
  },
  methods: {
    initializeSocket() {
      // Инициализируйте соединение с сервером socket.io
      this.socket = io("wss://socket.junior-job.ru", {
        query: {
          user_uuid: "78dce235-cc1a-48ca-89d7-0faf47e7d867",
        },
        extraHeaders: {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNjMDI5YjktZTFiMy00OWFiLWFhZGEtOTM1NWQwZjU2NzdjIiwiZW1haWwiOiJtb2RlckBiay5ydSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpYXQiOjE3MTEyNjM4MDUsImV4cCI6MTcxMTI2NDcwNX0.KZ0IOhvCBhBk3C4JijWyMv0p-TwY1fKel63v7hfYSIw",
        },
      });

      this.socket.on("connect", () => {
        console.log("Connected to socket.io server");
        // Вы можете здесь отправить сообщение или подписаться на события
      });

      this.socket.on("message", (data) => {
        console.log("Message received: ", data);
        // Обработка входящих сообщений
      });

      this.socket.on("disconnect", (reason) => {
        console.log(`Disconnected: ${reason}`);
      });

      // Обработчики других событий...
    },
    button() {
      this.socket.emit("message", JSON.stringify({ body: "m7878" }));
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>
