<script setup>
import { defineEmits,watch,ref } from 'vue'
import logoBig from "@/assets/images/big-logo.svg";

</script>

<template>
  <div class="register-welcome">
    <img :src="logoBig" alt="" />
    <p class="register-welcome__postitle mt-5">
        Начни зарабатывать вместе с нами!
    </p>
    <div class="flex justify-center flex-wrap items-center gap-4 xl:gap-7 mt-7">
        <NuxtLink to="/register/applicant" class="btn register-welcome__btn">Я соискатель</NuxtLink>
        <NuxtLink to="/register/employer" class="btn register-welcome__btn">Я работодатель</NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.register-welcome {
  width: 100%;
  height: calc(100vh - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  &__postitle {
    color: #2c1b47;
    text-align: center;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
  &__btn {
    padding: 12px 35px;
    min-width: 276px;
  }
  @media (max-width: 490px) {
    padding-left: 50px;
    padding-right: 50px;
  }
}
</style>