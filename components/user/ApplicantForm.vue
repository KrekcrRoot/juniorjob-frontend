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
    name: "",
    surname: "",
    patronymic: "",
    birthday: "",
    study_place: "",
    inn: "",
    competitions: "['coding']",
    summary: "",
  }
})


const formErrors = ref([])

const submit = async () => {
  try {
    formErrors.value = []
    const response = await api.auth.register(form.value);

    if (response.access_token) {
      userStore.access_token = response.access_token;
    }

    if (response.refresh_token) {
      userStore.refresh_token = response.refresh_token;
    }

    await userStore.fetchRoles()
    const currrentRole = userStore.payload.role
    const updateResponse = await api.roles[currrentRole](userStore.currentRoleId, form.value.userData)
    userStore.user.userData = updateResponse

    router.push('/profile')


  } catch (error) {
    if (error.response) {
      if (error.response.data && error.response.data.message) {
        formErrors.value = error.response.data.message;
                if(Array.isArray(formErrors.value)) {
                    formErrors.value = formErrors.value.map((error) => {
                    return translationService.translateError(error, 'ru')
                })
                }
                else {
                    formErrors.value = [translationService.translateError(formErrors.value, 'ru')]
                }
      }
    } else if (error.request) {
      formErrors.value = ["Ошибка отправки формы"];

    } else {
      formErrors.value = ["Ошибка отправки формы. Временные работы на сайте"];
    }
  }
};

const setDateInput = (e) => {
  e.target.type = 'date'
}

const removeDateInput = (e) => {
  e.target.type = 'text'
}

</script>
<template>
  <div class="container-centered">
    <h1 class="user-title">Регистрация</h1>
    <form @submit.prevent="submit" class="user-form mt-5">
      <FormUploadImage @change="uploadImage" />
      <input v-model="form.userData.surname" placeholder="Фамилия" type="text" class="field mt-3">
      <input v-model="form.userData.name" placeholder="Имя" type="text" class="field mt-3">
      <input v-model="form.userData.patronymic" placeholder="Отчество" type="text" class="field mt-3">
      <input v-model="form.email" placeholder="Email" type="text" class="field mt-3">
      <input v-model="form.password" placeholder="Пароль" type="password" class="field mt-3">
      <input v-model="form.userData.birthday" placeholder="Дата рождения" type="text" @focus="setDateInput" @focusout="removeDateInput" class="field mt-3">
      <FormSelect v-model="form.city_uuid" />
      <input v-model="form.userData.study_place" placeholder="Место учебы" type="text" class="field mt-3">
      <input v-model="form.userData.inn" placeholder="ИНН" type="text" class="field mt-3">
      <FormMultiSelect v-model="form.userData.competitions" class="mt-3" />
      <textarea v-model="form.userData.summary" placeholder="Резюме (расскажите о своих навыках, достижениях и качествах)" class="field mt-3"></textarea>
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