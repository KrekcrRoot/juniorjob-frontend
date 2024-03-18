<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <UiModal
      :is-open="modalOpen"
      @close="modalOpen = false"
      title="Custom Modal Title"
    >
      <p>Here goes your custom content!</p>
      <button @click="sendMessage">Custom Action</button>
    </UiModal>
  </div>
</template>

<script>
// import socket from "~/plugins/socket.io";
import { io } from "socket.io-client";
const socket = io("wss://socket.junior-job.ru");
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    customAction() {
      console.log("Performing custom action...");
    },
    sendMessage() {
      let message = {
        body: "text from app",
      };
      socket.emit("message", message);
    },
  },
};
</script>
