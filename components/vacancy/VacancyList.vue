<script setup>
import { ref, onMounted } from 'vue';
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
import { useVacanciesStore } from "~/store/vacancies";
import api from '~/api';

const vacancyList = ref(null)

const loading = ref(true)

if (process.client) {
  const vacanciesStore = useVacanciesStore();

  onMounted(async () => {
    const res = await api.vacancies.all({ row: 1 })
      console.log(res)

      // vacancyList.value = await vacanciesStore.getWithFilter({
      //   "row": 1,
      //   "sortByCreatedAt": "Up"
      // })
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