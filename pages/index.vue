<script setup>
import { io } from 'socket.io-client';

definePageMeta({
  layout: "default",
});

const socket = io("wss://socket.junior-job.ru", {
  query: {
    "user_uuid": "dfdee640-9dc8-4d81-99d6-00a9e23fbcaa"
  },
  extraHeaders: {
    "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiNTQ1NzMyYTktZTkyNC00MTc3LWExNGUtN2M2ZWJlZjI1OGYzIiwiZW1haWwiOiJtb2RlckBiay5ydSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpYXQiOjE3MTA4Njg2NTcsImV4cCI6MTcxMDg2OTI1N30.KABl2UF-nWqDKpTKHtljM9GR9a-bpLnpD4M7-u6F4Gg"
  },
  transports: ["websocket"]
});

const onClick = () => {
  socket.emit("message", JSON.stringify({
    "body": "message"
  }))
}
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
