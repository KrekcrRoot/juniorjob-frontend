<script setup>
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
const vacancyList = [
  {
    id: 1,
    title: "ООО «Демидовский огурец»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Собирать продукцию...",
  },
  {
    id: 2,
    title: "ООО «Демидовский огурец2»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Собирать продукцию...",
  },
  {
    id: 3,
    title: "ООО «Демидовский огурец3»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Собирать продукцию...",
  }
];
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