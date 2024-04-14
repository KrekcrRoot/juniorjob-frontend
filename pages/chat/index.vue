<template>
  <div class="xl:container mx-auto chat-page">
    <div class="grid xl:grid-cols-12">
      <div class="chat__chats col-start-1 col-span-4">
        <h1 class="chat__title">Сообщения</h1>
        <div v-if="chats && chats.length > 0">
          <template v-if="isMobile">
            <NuxtLink
              v-for="(chat, index) in useUserStore().chats"
              :to="{
                name: 'chat-user-id',
                params: { id: chat?.user?.uuid },
                query: { chat: chat.uuid },
              }"
              :key="index"
              class="chat__chats-item"
            >
              <div class="chat__chats-item-avatar">
                <img
                  v-if="
                    (chat.user.image && chat.user.image === 'image.png') ||
                    !chat.user.image
                  "
                  src="@/assets/images/profile/profile.svg"
                  alt="profile"
                />
                <img
                  v-else
                  :src="`${$config.public.baseURL}/storage/users/${chat.user.image}`"
                  alt=""
                />
              </div>
              <div class="chat__chats-item-content">
                <template v-if="chat.user.role.current === 'legal_entity'">
                  <p
                    v-if="chat.user.userData.title === ''"
                    class="chat__chats-item-title"
                  >
                    Пользователь
                  </p>
                  <div v-else class="flex items-center gap-2">
                    <p class="chat__chats-item-title">
                      {{ chat.user.userData.title }}
                    </p>
                  </div>
                </template>
                <template v-else>
                  <p
                    v-if="
                      chat.user.userData.name === '' &&
                      chat.user.userData.surname === ''
                    "
                    class="chat__chats-item-title"
                  >
                    Пользователь
                  </p>
                  <div v-else class="flex items-center gap-2">
                    <p class="chat__chats-item-title">
                      {{ chat.user.userData.name }}
                      {{ chat.user.userData.surname }}
                    </p>
                  </div>
                </template>

                <p class="chat__chats-item-text" v-html="chat.lastMsg"></p>
                <div class="chat__new" v-if="chat.unreadMessages"></div>
              </div>
            </NuxtLink>
          </template>
          <template v-else>
            <button
              v-for="(chat, index) in useUserStore().chats"
              @click="chooseDesktopChat(chat?.user?.uuid, chat.uuid)"
              :key="index"
              class="chat__chats-item"
            >
              <template v-if="chat.lastMsg !== ''">
                <div class="chat__chats-item-avatar">
                  <img
                    v-if="
                      (chat.user.image && chat.user.image === 'image.png') ||
                      !chat.user.image
                    "
                    src="@/assets/images/profile/profile.svg"
                    alt="profile"
                  />
                  <img
                    v-else
                    :src="`${$config.public.baseURL}/storage/users/${chat.user.image}`"
                    alt=""
                  />
                </div>
                <div class="chat__chats-item-content">
                  <template v-if="chat.user.role.current === 'legal_entity'">
                    <p
                      v-if="chat.user.userData.title === ''"
                      class="chat__chats-item-title"
                    >
                      Пользователь
                    </p>
                    <div v-else class="flex items-center gap-2">
                      <p class="chat__chats-item-title">
                        {{ chat.user.userData.title }}
                      </p>
                    </div>
                  </template>
                  <template v-else>
                    <p
                      v-if="
                        chat.user.userData.name === '' &&
                        chat.user.userData.surname === ''
                      "
                      class="chat__chats-item-title"
                    >
                      Пользователь
                    </p>
                    <div v-else class="flex items-center gap-2">
                      <p class="chat__chats-item-title">
                        {{ chat.user.userData.name }}
                        {{ chat.user.userData.surname }}
                      </p>
                    </div>
                  </template>

                  <p class="chat__chats-item-text" v-html="chat.lastMsg"></p>
                  <div class="chat__new" v-if="chat.unreadMessages"></div>
                </div>
              </template>
            </button>
          </template>
        </div>
        <p v-else>У вас нет чатов</p>
      </div>

      <div v-if="!isMobile" class="col-start-5 col-span-6 mt-10">
        <template v-if="activeChat && activeUser">
          <ChatMessages
            :user="activeUser"
            :chat="activeChat"
            :isScroll.sync="isScroll"
          />
        </template>
        <template v-else> Выберите, кому хотите написать </template>
      </div>
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

const isMobile = ref(false);

const activeChat = ref(null);
const activeUser = ref(null);
const isScroll = ref(false);

const checkMobile = () => {
  isMobile.value = window.innerWidth < 980;
};

const showlastMsg = async (chatId, chatmateName) => {
  const msgs = await api.chat.get_chat_messages(chatId);
  if (msgs.length > 0) {
    const lastMsg = msgs[0];
    const user = lastMsg.user;
    let isMe = user === useUserStore().user.uuid ? true : false;
    if (isMe) {
      return `Вы: <span>${lastMsg.content}</span>`;
    } else {
      return `${chatmateName !== "" ? chatmateName : "Собеседник"}: <span>${
        lastMsg.content
      }</span>`;
    }
  }
  return "";
};

const chooseDesktopChat = (user, chat) => {
  activeChat.value = chat;
  activeUser.value = user;
  isScroll.value = true;
};
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
    const userData = await api.roles.get_user_roles(user.uuid);
    // Теперь добавим ключ 'test' к каждому объекту в chatsData
    chats.value[i] = {
      ...chatsData.value[i],
      user: { ...user, userData: userData[user.role.current] },
    };
  }
}

onMounted(async () => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  chatsData.value = await api.chat.get_my_chats();
  await fetchUsersAndUpdateChats();
  useUserStore().chats = chats.value;
  for (let chat of useUserStore().chats) {
    useUserStore().initializeSocket(chat.user.uuid);
    chat.lastMsg = await showlastMsg(
      chat.uuid,
      chat.user.userData.name || chat.user.userData.title
    );
  }
  // useUserStore().chats.forEach((chat) => {
  //   chat.unreadMessages = false;
  // });

  useUserStore().socket.on("incoming", async (data) => {
    for (let chat of useUserStore().chats) {
      chat.lastMsg = await showlastMsg(
        chat.uuid,
        chat.user.userData.name || chat.user.userData.title
      );
      chat.unreadMessages = true;
    }
  });
});
</script>

<style lang="scss" scoped>
.chat {
  &__new {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #604d9e;
  }
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
          object-fit: cover;
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
.chat-page {
  padding-left: 30px;
  padding-right: 30px;
}
</style>
