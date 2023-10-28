<script setup>
import vacancyLogo from "@/assets/images/vacancy/temp_vacancy.svg";
const professionList = [
  {
    id: 1,
    title: "ООО «Демидовский огурец»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Квалифицированные огурцы научат вашего ребенка быть....",
  },
  {
    id: 2,
    title: "ООО «Демидовский огурец2»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Квалифицированные огурцы научат вашего ребенка быть....",
  },
  {
    id: 3,
    title: "ООО «Демидовский огурец3»",
    logo: vacancyLogo,
    time: "Ежедневно с 11:00 до 14:00",
    short_text: "Квалифицированные огурцы научат вашего ребенка быть....",
  }
];
</script>

<template>
  <div>
    <h1 class="main-title">Профессиональные сборы</h1>
    <div class="mt-7">
        <ProfessionItem v-for="professionItem in professionList" :profession="professionItem" :key="professionItem.icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>