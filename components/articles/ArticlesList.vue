<script setup>
import articleDemo from "@/assets/images/articles/articles-demo.jpg";
const articlesList = [
  {
    id: 1,
    title: "Как стать востребованным сотрудником?",
    photo: articleDemo,
    link: '/'
  },
  {
    id: 2,
    title: "Как стать востребованным сотрудником?",
    photo: articleDemo,
    link: '/'
  }
];
</script>

<template>
  <div>
    <h1 class="main-title">Новые вакансии</h1>
    <div class="mt-7">
        <ArticlesItem v-for="articlesItem in articlesList" :article="articlesItem" :key="articlesItem.icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>