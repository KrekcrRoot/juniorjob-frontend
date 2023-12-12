<script setup>
import {  ref, onMounted } from 'vue';
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
import { useVacanciesStore } from "~/store/vacancies";

const vacancyList = ref(null)

if(process.client) {
  const vacanciesStore = useVacanciesStore();




onMounted(async() => {
  await vacanciesStore.fetchVacancies()
  vacancyList.value = vacanciesStore.vacancies.slice(0, 3)
})
}

</script>

<template>
  <div>
    <h1 class="main-title">Новые вакансии</h1>
    <div class="xl:mt-7 mt-3">
        <VacancyItem v-for="vacancyItem in vacancyList" :vacancy="vacancyItem" :key="vacancyItem.icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>