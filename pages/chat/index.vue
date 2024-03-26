<template>
  <div class="xl:container mx-auto">
    <h1 class="chat__title">Сообщения</h1>
    <div v-if="chats && chats.length > 0" class="chat__chats">
      <NuxtLink
        v-for="(chat, index) in chats"
        :to="{
          name: 'chat-user-id',
          params: { id: chat?.user?.uuid },
          query: { chat: chat.uuid },
        }"
        :key="index"
        class="chat__chats-item"
      >
        <div class="chat__chats-item-avatar">
          <img src="@/assets/images/profile/review-demo.png" alt="" />
        </div>
        <div class="chat__chats-item-content">
          <p class="chat__chats-item-title">{{ chat.user.email }}</p>
          <p class="chat__chats-item-text">
            Вы: <span>Расскажите про свой опыт</span>
          </p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "~/api";

import { useUserStore } from "~/store/user";
definePageMeta({
  layout: "default",
});

const chatsData = ref([]);

const chats = ref([]);

// const chats = computed(async () => {
//   const user = await api.users.getById(obj.second_user);
//   console.log(user);
//   const data = chatsData.value.map((obj) => {
//     // Добавление нового ключа "test" с его значением к каждому объекту
//     return { ...obj, user: user };
//   });
//   return data;
// });

async function fetchUsersAndUpdateChats() {
  for (let i = 0; i < chatsData.value.length; i++) {
    let arrUser = [
      chatsData.value[i].first_user,
      chatsData.value[i].second_user,
    ];

    arrUser.splice(arrUser.indexOf(useUserStore().user.uuid), 1);
    let remainingUser = arrUser[0];
    const user = await api.users.getById(remainingUser);

    // Теперь добавим ключ 'test' к каждому объекту в chatsData
    chats.value[i] = {
      ...chatsData.value[i],
      user: user,
      test: { test: 123, test2: 456 },
    };
  }
}

onMounted(async () => {
  chatsData.value = await api.chat.get_my_chats();
  await fetchUsersAndUpdateChats();
});
</script>

<style lang="scss" scoped>
.chat {
  &__title {
    margin-top: 40px;
    font-weight: 600;
    font-size: 25px;
    line-height: 80%;
    color: #2c1b47;
    margin-bottom: 35px;
  }
  &__chats {
    display: flex;
    flex-direction: column;
    gap: 18px;
    &-item {
      display: flex;
      align-items: center;
      gap: 10px;

      &-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      &-avatar {
        width: 50px;
        height: 50px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-title {
        font-weight: 400;
        font-size: 20px;
        color: #000;
        font-family: "Marmelad";
      }
      &-text {
        font-weight: 300;
        font-size: 20px;
        color: #604d9e;
        span {
          color: #000;
        }
      }
    }
  }
}
</style>
