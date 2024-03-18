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
import { io } from 'socket.io-client';


export default {

  setup() {
    const modalOpen = ref(false);
    const userUuid = '8d477c7a-34be-4da3-933f-2c0d8aa53dd9';
    const socket = io('wss://socket.junior-job.ru', {
      path: '/',
      extraHeaders: {
        Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTNmZmNkMzYtODA3Mi00M2JjLTg2M2EtZGY3YmJlY2RlYzUzIiwiZW1haWwiOiJ0ZXN0dGVzdEBtYWlsLnJ1Iiwicm9sZSI6ImxlZ2FsX2VudGl0eSIsImlhdCI6MTcxMDc2NjI5NiwiZXhwIjoxNzEwNzY2ODk2fQ.RQSn6QgHKDQ6fXq5T8UdBqxOOkBpAzN7Xw0HOZtNYhs'
      },
      auth: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiZTNmZmNkMzYtODA3Mi00M2JjLTg2M2EtZGY3YmJlY2RlYzUzIiwiZW1haWwiOiJ0ZXN0dGVzdEBtYWlsLnJ1Iiwicm9sZSI6ImxlZ2FsX2VudGl0eSIsImlhdCI6MTcxMDc2NjI5NiwiZXhwIjoxNzEwNzY2ODk2fQ.RQSn6QgHKDQ6fXq5T8UdBqxOOkBpAzN7Xw0HOZtNYhs'
      },
      query: { user_uuid: userUuid },
      transports: ['websocket']
    });

    socket.on('incoming', (data) => {
      console.log('Incoming data:', data);
    });

    socket.on('debug', (data) => {
      console.log('Debug:', data);
    });

    const openModal = () => {
      modalOpen.value = true;
    };

    const customAction = () => {
      console.log('Performing custom action...');
    };

    const sendMessage = () => {
      const message = {
        body: 'text from app'
      };
      socket.emit('message', message);
    };

    return { modalOpen, openModal, customAction, sendMessage };
  }
};
</script>