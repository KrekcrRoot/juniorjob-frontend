<script setup>
import { ref, onMounted } from "vue";
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
import { useVacanciesStore } from "~/store/vacancies";
import api from "~/api";
import { useUserStore } from "~/store/user";
import axios from "axios";

const vacancyList = ref(null);

const loading = ref(true);

const fileName = ref(null);

const change = (e) => {
  if (process.client) {
    const userStore = useUserStore();
    fileName.value = e.target.files[0];
    const formData = new FormData();
    formData.append("image", fileName.value);
    api.users
      .uploadImage(formData)
      .then((res) => {
        userStore.user.image = res.image;
        console.log(res);
      })

      // axios.post('https://api.junior-job.ru/users/uploadImage', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': `Bearer ${userStore.access_token}`,
      //   },
      // })
      .then((response) => {
        // Обработка успешного ответа
        console.log(response);
      })
      .catch((error) => {
        // Обработка ошибок
        console.error(error);
      });
  }
};

if (process.client) {
  const vacanciesStore = useVacanciesStore();
  const userStore = useUserStore();

  onMounted(async () => {
    const vacancies = await vacanciesStore.getWithFilter({
      row: 4,
      sortByCreatedAt: "Down",
    });
    vacancyList.value = vacancies;
    loading.value = false;
  });
}
</script>

<template>
  <div class="relative">
    <!-- <h1 class="main-title">Новые вакансии</h1> -->
    <!-- Экран загрузки -->
    <template v-if="loading">
      <UiLoader />
    </template>
    <div class="vacancies-items">
      <VacancyItem
        v-for="vacancyItem in vacancyList"
        :vacancy="vacancyItem"
        :key="vacancyItem.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vacancies-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    &__item {
      width: calc(25% - 8px);
  
      border: 1px solid #e6e0ff;
      border-radius: 10px;
      padding: 24px;
      max-width: 304px;
      width: 100%;

  
      box-shadow: 0 4px 20px 0 rgba(96, 77, 158, 0.08);
      background: #fff;
      display: flex;
  
      gap: 15px;
    }
    &__image {
      width: 55px;
      height: 55px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    &__title {
      font-weight: 500;
  font-size: 18px;
  line-height: 122%;
  color: #000;
    }
  }</style>
