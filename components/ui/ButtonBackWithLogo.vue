<script setup>
import logo from "@/assets/images/logo.svg";

import { useRouter } from 'vue-router';

const router = useRouter();

const goBack = () => {
  router.go(-1);
};
</script>
<template>
  <button @click="goBack" class="flex gap-5 items-center select-none">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
        <path d="M8.34235 20L0.459473 10L8.34235 0L9.74157 1.775L3.2579 10L9.74157 18.225L8.34235 20Z" fill="#AAA2D8"/>
      </svg>
    </div>
    <div class="logo">
      <img :src="logo" alt="">
    </div>
  </button>

</template>

<style lang="scss" scoped>

</style>