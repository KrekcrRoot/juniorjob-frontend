<script setup>
import articleDemo from "@/assets/images/articles/articles-demo.jpg";
import articleWelcome from "@/assets/images/articles/welcome.png";
const articlesList = [
  {
    id: 1,
    title: "Добро пожаловать в Junior Job!",
    photo: articleWelcome,
    link: "/articles/demo",
  },
];
</script>

<template>
  <div>
    <h1 class="main-title">Статьи</h1>
    <div class="xl:mt-7 mt-3">
      <ArticlesItem
        v-for="articlesItem in articlesList"
        :article="articlesItem"
        :key="articlesItem.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
