<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <UiModal
      :is-open="modalOpen"
      @close="modalOpen = false"
      title="Custom Modal Title"
    >
      <p>Here goes your custom content!</p>
      <button @click="customAction">Custom Action</button>
    </UiModal>
  </div>
</template>

<script>
import { ref } from 'vue';
// import { io } from 'socket.io-client';


export default {

  setup() {
    const modalOpen = ref(false);
    // const userUuid = '8d477c7a-34be-4da3-933f-2c0d8aa53dd9';
    // const socketUrl = "wss://socket.junior-job.ru";

    // let socket = io(socketUrl, {
    //     query: {
    //       "user_uuid": userUuid
    //     },
    //     extraHeaders: {
    //       "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTNmZmNkMzYtODA3Mi00M2JjLTg2M2EtZGY3YmJlY2RlYzUzIiwiZW1haWwiOiJ0ZXN0dGVzdEBtYWlsLnJ1Iiwicm9sZSI6ImxlZ2FsX2VudGl0eSIsImlhdCI6MTcxMDkyMzkyMSwiZXhwIjoxNzEwOTI0NTIxfQ._FKTpNNTLXUITIn5BBRpEsF6U7aZ4s2Z5f3RfyQ8B6Y"
    //     },
    //     "transports": ['websocket'],
    //   });

    // socket.on('incoming', (data) => {
    //   console.log('Incoming data:', data);
    // });

    // socket.on('debug', (data) => {
    //   console.log('Debug:', data);
    // });

    const openModal = () => {
      modalOpen.value = true;
    };

    const customAction = () => {
      console.log('Performing custom action...');
    };

    // const sendMessage = () => {
    //   const message = {
    //     body: 'text from app'
    //   };
    //   socket.emit('message', JSON.stringify(message));
    // };

    return { modalOpen, openModal, customAction, sendMessage };
  },
  mounted() {
  }
};
</script>