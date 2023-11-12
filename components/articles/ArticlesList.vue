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
    <h1 class="main-title">Статьи</h1>
    <div class="xl:mt-7 mt-3">
        <ArticlesItem v-for="articlesItem in articlesList" :article="articlesItem" :key="articlesItem.icon" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>