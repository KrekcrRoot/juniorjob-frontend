<template>
  <header class="xl:container mx-auto px-4 xl:px-0">
    <div class="header-inner py-7">
      <NuxtLink to="/" class="flex gap-5 items-center select-none">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="20"
            viewBox="0 0 10 20"
            fill="none"
          >
            <path
              d="M8.34235 20L0.459473 10L8.34235 0L9.74157 1.775L3.2579 10L9.74157 18.225L8.34235 20Z"
              fill="#AAA2D8"
            />
          </svg>
        </div>
        <div class="logo">
          <img :src="logo" alt="" />
        </div>
      </NuxtLink>
    </div>
  </header>
  <div
    class="error-main w-full flex justify-center items-center flex-col mt-7 max-w-sm mx-auto text-center card"
  >
    <template v-if="error.statusCode === 404">
      <div class="error-main__image">
        <img src="@/assets/images/404.svg" alt="" />
      </div>
      <div class="error-main__title">404</div>
      <div class="error-main__postitle">Страница не найдена</div>
    </template>
    <template v-else>
      <div class="error-main__image">
        <img src="@/assets/images/500.svg" alt="" />
      </div>
      <div class="error-main__title">500</div>
      <div class="error-main__postitle">Ремонтируем сервер</div>
    </template>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import logo from "@/assets/images/logo.svg";
definePageMeta({
  layout: "empty",
});
const props = defineProps(["error"]);

onMounted(() => {
  console.log(props)
})
</script>

<style lang="scss" scoped>
.error-main {
  width: 100vw;
  height: calc(100vh - 170px);
  &__image {
    width: 170px;
    height: 170px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &__title {
    font-weight: 400;
    font-size: 55px;
    text-align: center;
    color: #2c1b47;
  }
  &__postitle {
    max-width: 172px;
    font-weight: 400;
    font-size: 25px;
    text-align: center;
    color: #2c1b47;
  }
}
</style>
