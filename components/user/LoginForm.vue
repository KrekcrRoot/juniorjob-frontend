<script setup>
import { ref } from 'vue';
</script>

<script>

import api from "~/api";
import { useUserStore } from "~/store/user.ts";

export default defineComponent({
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    async submit() {
      const response = api.auth.login(this.form);

      response.then(
          (res) => {

            const user = useUserStore();
            user.access_token = res.data.access_token;
            user.refresh_token = res.data.refresh_token;

          })
          .catch(
          (error) => {
            alert('Ошибка');
          }
        )
    }
  },
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