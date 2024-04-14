<template>
  <div class="chat-message__messages-head">
    {{ chatmateData.name || "Пользователь" }}
  </div>
  <div class="chat-message__wrapper" ref="messagesContainer">
    <transition-group
      name="fade"
      tag="div"
      class="chat-message__messages"
      ref="messagesContainer"
    >
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
    </transition-group>
  </div>

  <div class="chat-message__chat">
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Сообщение"
      type="text"
      class="field w-full"
    />
    <button @click="sendMessage" class="btn">Отправить</button>
    <button
      v-if="showScrollButton"
      class="scroll-down-button"
      @click="scrollToBottom"
    >
      ↓
    </button>
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
  props: ["user", "chat", "isScroll"],
  data() {
    return {
      socket: null,
      message: "",
      messages: [],
      user: "",
      chatmateData: [],
      showScrollButton: false,
    };
  },
  async mounted() {
    if (process.client) {
      this.user = useUserStore();
      useUserStore().socketConnect = false;
      let chatmateDataRes = await api.roles.get_user_roles(this.$props.user);
      this.chatmateData = chatmateDataRes[chatmateDataRes.current];
      this.initializeSocket();
      this.messages = (
        await api.chat.get_chat_messages(this.$props.chat)
      ).reverse();
      // Добавляем nextTick, чтобы убедиться, что DOM обновлён
      this.$nextTick(() => {
        // Используйте this.$refs для доступа к элементу
        const messagesContainer = this.$refs.messagesContainer;
        window.scrollTo(0, messagesContainer.scrollHeight);
      });

      document.addEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    initializeSocket() {
      const token = useUserStore().access_token;
      if (token && this.$props.user && useUserStore().socketConnect === false) {
        // Инициализируйте соединение с сервером socket.io
        this.socket = io("wss://socket.junior-job.ru", {
          query: {
            user_uuid: this.$props.user,
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
        this.messages.unshift(incomingMessage);
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        this.scrollToBottom();
      });

      this.socket.on("disconnect", (reason) => {
        console.log(`Disconnected: ${reason}`);
      });

      // Обработчики других событий...
    },
    async sendMessage() {
      const newMessage = { body: this.message };
      this.socket.emit("message", newMessage);
      this.messages.push({
        uuid: new Date().getTime(), // Временный уникальный ID, настройте согласно вашим требованиям
        content: this.message,
        user: this.user.user.uuid, // Настройте при необходимости, чтобы соответствовать вашей структуре данных
      });
      this.message = "";
      this.scrollToBottom();
    },
    async getMessage() {
      this.messages = await api.chat.get_chat_messages(this.$props.chat);
    },
    markAsRead(messageId) {
      // Отправьте информацию на сервер о том, что сообщение было прочитано
      this.socket.emit("read", messageId);
    },
    scrollToBottom() {
      const wrapper = this.$refs.messagesContainer; // Если в refs указан chat-message__wrapper
      if (wrapper) {
        wrapper.scrollTop = wrapper.scrollHeight;
      }
    },
    handleScroll() {
      // Показать кнопку, если пользователь прокрутил выше на 300px от нижнего края
      this.showScrollButton =
        window.scrollY <
        document.documentElement.scrollHeight - window.innerHeight - 300;
    },
  },
  beforeDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
    const messagesContainer = this.$refs.messagesContainer;
    if (messagesContainer) {
      messagesContainer.removeEventListener("scroll", this.handleScroll);
    }
  },
  watch: {
    isScroll(newValue) {
      if (newValue === true) {
        this.scrollToBottom(); // Вызов метода для прокрутки
        this.$emit("update:isScroll", false); // Сброс isScroll до false
      }
    },
    messages(newValue, oldValue) {
      if (newValue.length > oldValue.length) {
        this.$nextTick(() => {
          const messagesContainer = this.$refs.messagesContainer;
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          this.markAsRead(newValue[newValue.length - 1].uuid);
        });
      }
    },
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
  background: #f5f5fb;

  height: 100%;
  &__messages {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    @media screen and (max-width: 980px) {
      padding-bottom: 50px;
    }
    &-head {
      width: 100%;
      padding-top: 10px;
      padding-bottom: 10px;
      background: #aaa2d8;
      color: #15112e;
      border-top-right-radius: 10px;
      border-top-left-radius: 10px;
      padding-left: 30px;
      font-size: 25px;
      font-family: "Marmelad";
      font-weight: 500;
    }
  }
  &__wrapper {
    position: relative;
    max-height: 50vh;
    background: #f5f5fb;
    overflow-y: auto;
    padding: 20px;
  }
  &__chat {
    position: sticky;
    bottom: 0;
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 20px;
    background: #f5f5fb;
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
  background: #e2ddf8;
}
.other-message {
  display: inline-flex;
  align-self: flex-start;
}
.scroll-down-button {
  position: fixed; // или absolute в зависимости от вашей верстки
  right: 20px; // расположение кнопки справа
  bottom: 60px; // и отступ снизу
  z-index: 10; // убедитесь, что кнопка будет поверх других элементов
  // Добавьте стили для кнопки, чтобы она выглядела приятно
  padding: 10px;
  border: none;
  border-radius: 50%;
  background-color: #aaa2d8;
  color: white;
  cursor: pointer;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
