<script setup>
import vacancyLogo from "@/assets/images/profile/review-demo.png";
import vacancyLogo2 from "@/assets/images/profile/profile.svg";
const professionList = [
  {
    id: 1,
    title: "Кванториум",
    logo: vacancyLogo,
    time: "12 марта 2024",
    short_text: "Мастер-класс по программированию",
  },
  {
    id: 2,
    title: "СГИИ - урок народного искусства",
    logo: vacancyLogo2,
    time: "23 марта 2024",
    short_text: "Открытый урок по творческим профессиям",
  },
];
</script>

<template>
  <div>
    <h1 class="main-title">Профессиональные пробы</h1>
    <div class="xl:mt-7 mt-3">
      <ProfessionItem
        v-for="professionItem in professionList"
        :profession="professionItem"
        :key="professionItem.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
