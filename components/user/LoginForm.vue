<script setup>
import { ref } from 'vue';


</script>

<script>

import {$fetch} from "ofetch";

export default defineComponent({
  name: 'LoginForm',
  data() {
    return {
      api: {},
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submit() {

      $fetch('/auth/local/signin', {
        method: 'POST',
        baseURL: 'https://api.junior-job.ru',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.form,
      }).then(res => {
        console.log(res);
      }, error => {
        console.log(error.data)
      })
    }
  },
  mounted() {
    const { $api } = useNuxtApp();
    this.api = $api
  }
})

</script>

<template>
    <div class="container-centered">
        <h1 class="user-title">Вход</h1>
        <form @submit.prevent="submit" class="mt-5">
            <input v-model="form.email" placeholder="Email" type="text" class="field mt-3">
            <input v-model="form.password" placeholder="Пароль" type="password" class="field mt-3">
            <button type="submit" class="btn w-full mt-3">Войти</button>
            <div class="mt-3">
                <p class="ask-text">Нет аккаунта? <NuxtLink to="/register-welcome" class="ask-text__link">Зарегистрироваться</NuxtLink></p>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
.ask-text {
    color: #604D9E;
text-align: center;
font-family: 'Source Sans Pro';
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;

&__link {
    color: #2C1B47;
font-family: 'Source Sans Pro';
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
text-decoration-line: underline;
cursor: pointer;
}
}
</style>