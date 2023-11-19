<script setup>
</script>

<template>
  <div class="container mx-auto xl:mt-14 px-5">
    <div class="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-20">
      <div>
        <div class="xl:mt-12 mt-4">
          <VacancyList />
        </div>
        <div class="xl:mt-12 mt-4">
          <ProfessionList />
        </div>
      </div>
      <div>
        <div class="xl:mt-12">
          <ArticlesList />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>