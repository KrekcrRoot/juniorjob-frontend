<template>
  <div class="chat-message__messages">
    <div
      v-for="message in messages"
      :key="message.uuid"
      class="message"
      :class="{
        'my-message': message.user === user.user.uuid,
        'other-message': message.user !== user.user.uuid,
      }"
    >
      <div class="message-content">
        {{ message.content }}
      </div>
    </div>
  </div>
  <div class="chat-message__chat">
    <input v-model="message" type="text" class="field w-full" />
    <button @click="sendMessage" class="btn">Отправить</button>
  </div>
</template>

<script>
import { ref } from "vue";
import api from "~/api";
import { useUserStore } from "~/store/user";
definePageMeta({
  layout: "chat",
});

// const userStore = useUserStore();
export default {
  data() {
    return {
      socket: null,
      message: "",
      messages: [],
      user: "",
    };
  },
  async mounted() {
    if (process.client) {
      this.user = useUserStore();
      useUserStore().socketConnect = false;
      this.initializeSocket();
      this.messages = await api.chat.get_chat_messages(this.$route.query.chat);
    }
  },
  methods: {
    initializeSocket() {
      const token = useUserStore().access_token;
      if (
        token &&
        this.$route.params.id &&
        useUserStore().socketConnect === false
      ) {
        // Инициализируйте соединение с сервером socket.io
        this.socket = io("wss://socket.junior-job.ru", {
          query: {
            user_uuid: this.$route.params.id,
          },
          extraHeaders: {
            authorization: token,
          },
        });
        useUserStore().socketConnect = true;
      }

      this.socket.on("connect", () => {
        console.log("Connected to socket.io server");
        // Вы можете здесь отправить сообщение или подписаться на события
      });

      this.socket.on("incoming", (data) => {
        // alert("Получено сообщение: ", data);
        const { body, ...otherProps } = data;
        const incomingMessage = { content: body, ...otherProps };
        // Вам, возможно, придется настроить структуру incomingMessage, чтобы соответствовать вашему массиву сообщений
        this.messages.push(incomingMessage);
      });

      this.socket.on("disconnect", (reason) => {
        console.log(`Disconnected: ${reason}`);
      });

      // Обработчики других событий...
    },
    async sendMessage() {
      const newMessage = { body: this.message };
      this.socket.emit("message", JSON.stringify(newMessage));
      this.messages.push({
        uuid: new Date().getTime(), // Временный уникальный ID, настройте согласно вашим требованиям
        content: this.message,
        user: this.user.user.uuid, // Настройте при необходимости, чтобы соответствовать вашей структуре данных
      });
      this.message = "";
    },
    async getMessage() {
      this.messages = await api.chat.get_chat_messages(this.$route.query.chat);
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  },
};
</script>

<style lang="scss" scoped>
.chat-message {
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;

  display: flex;
  flex-direction: column;
  height: 100%;
  &__messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    padding-bottom: 50px;
    width: 100%;
  }
  &__chat {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    height: 30px;
    height: 30px;
  }
}
.message {
  padding: 15px 35px;
  border-radius: 15px;
  border: 1px solid #aaa2d8;
  margin: 10px 0;
}
.my-message {
  display: inline-flex;
  align-self: flex-end;
}
.other-message {
  display: inline-flex;
  align-self: flex-start;
  background: #e2ddf8;
}
</style>
