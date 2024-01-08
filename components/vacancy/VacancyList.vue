<script setup>
import { ref, onMounted } from 'vue';
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
import { useVacanciesStore } from "~/store/vacancies";
import api from '~/api';
import { useUserStore } from '~/store/user';
import axios from 'axios';

const vacancyList = ref(null)

const loading = ref(true)

const fileName = ref(null)

const change = (e) => {
  if (process.client) {
    const userStore = useUserStore();
  fileName.value = e.target.files[0]
  const formData = new FormData();
formData.append('image', fileName.value);
api.users.uploadImage(formData)
    .then(res => {
      userStore.user.image = res.image
      console.log(res)
    })

// axios.post('https://api.junior-job.ru/users/uploadImage', formData, {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//     'Authorization': `Bearer ${userStore.access_token}`,
//   },
// })
.then(response => {
  // Обработка успешного ответа
  console.log(response);
})
.catch(error => {
  // Обработка ошибок
  console.error(error);
});
  }
}


if (process.client) {




  const vacanciesStore = useVacanciesStore();
  const userStore = useUserStore();

  onMounted(async () => {
    const vacancies = await vacanciesStore.getWithFilter({row: 3})
    vacancyList.value = vacancies
    loading.value = false
    
  })
}

</script>

<template>
  <div class="relative">
    <h1 class="main-title">Новые вакансии</h1>
     <!-- Экран загрузки -->
     <template v-if="loading">
        <UiLoader />
      </template>
    <div class="xl:mt-7 mt-3">
        <VacancyItem v-for="vacancyItem in vacancyList" :vacancy="vacancyItem" :key="vacancyItem.icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>