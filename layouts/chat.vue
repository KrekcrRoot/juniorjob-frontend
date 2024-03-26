<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "~/api";
const user = ref([]);
const route = useRoute();
// onMounted(async () => {
//   if (route.params.id) {
//     user.value = await api.users.getById(route.params.id);
//   }
// });
</script>

<template>
  <div class="chat">
    <header class="chat__header">
      <div class="xl:container mx-auto">
        <NuxtLink to="/chat" class="flex items-center chat__back">
          <img src="@/assets/images/icons/arrow_white-left.svg" alt="" />
          <div v-if="user" class="chat__user">
            <div class="chat__user-avatar">
              <img src="@/assets/images/profile/review-demo.png" alt="" />
            </div>
            <p class="chat__user-name">{{ user?.email }}</p>
          </div>
        </NuxtLink>
      </div>
    </header>
    <div class="chat__main xl:container mx-auto">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import url("~/assets/css/main.css");
.chat {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
  &__header {
    width: 100%;
    height: 95px;
    display: flex;
    align-items: center;
    gap: 20px;
    background: #bfb9e2;
  }
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  &__back {
    gap: 25px;
  }
  &__user {
    display: flex;
    align-items: center;
    gap: 10px;

    &-name {
      font-family: "Marmelad";
      font-weight: 400;
      font-size: 25px;
      color: #000;
    }
  }
  &__footer {
    width: 100%;
    height: 30px;
    background: lightcoral;
  }
}
</style>
