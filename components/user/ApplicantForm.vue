<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '~/api';
import translationService from '~/services/translationService';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();


const form = ref({
  email: '',
  password: '',
  city_uuid: '',
  userData: {
    name: "Name",
    surname: "Surname",
    birthday: "2023-11-19T07:43:06.568Z",
    study_place: "Study place",
    inn: "6234573345",
    competitions: "['coding']",
    summary: "{some json}",
  }
})


const formErrors = ref([])

const submit = async () => {
  try {
    formErrors.value = []
    const response = await api.auth.register(form.value);

    if (response.data.access_token) {
      userStore.access_token = response.data.access_token;
    }

    if (response.data.refresh_token) {
      userStore.refresh_token = response.data.refresh_token;
    }

    await userStore.fetchRoles()
    const currrentRole = userStore.payload.role
    const updateResponse = await api.roles[currrentRole](userStore.currentRoleId, form.value.userData)
    userStore.user.userData = updateResponse.data

    router.push('/profile')


  } catch (error) {
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        console.error('Server responded with an error:', error.response.data);
        formErrors.value = error.response.data.message;
        formErrors.value = formErrors.value.map((error) => {
          return translationService.translateError(error, 'ru')
        })
      }
    } else if (error.request) {
      formErrors.value = ["Ошибка отправки формы"];

    } else {
      formErrors.value = ["Ошибка отправки формы. Временные работы на сайте"];
    }
  }
};

</script>
<template>
  <div class="container-centered">
    <h1 class="user-title">Регистрация</h1>
    <form @submit.prevent="submit" class="user-form mt-5">
      <FormUploadImage @change="uploadImage" />
      <input placeholder="Фамилия" type="text" class="field mt-3">
      <input placeholder="Имя" type="text" class="field mt-3">
      <input placeholder="Отчество" type="text" class="field mt-3">
      <input v-model="form.email" placeholder="Email" type="text" class="field mt-3">
      <input v-model="form.password" placeholder="Пароль" type="password" class="field mt-3">
      <input placeholder="Дата рождения" type="date" class="field mt-3">
      <FormSelect v-model="form.city_uuid" />

      <input placeholder="ИНН" type="text" class="field mt-3">
      <FormMultiSelect class="mt-3" />
      <textarea placeholder="Обо мне" class="field mt-3"></textarea>
      <template v-if="formErrors">
        <div class="py-4">
          <p class="error-message text-center" v-for="formError in formErrors">
            {{ formError }}
          </p>
        </div>
      </template>
      <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
    </form>
    <div class="mt-3 pb-12">
      <p class="ask-text">Уже зарегистрированы? <NuxtLink to="/login" class="ask-text__link">Войти</NuxtLink>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.user-form {
  max-width: 313px;
}

.container-centered {
  justify-content: flex-start;
}

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