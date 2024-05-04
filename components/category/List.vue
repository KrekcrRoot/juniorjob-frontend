<template>
    <div class="relative">
        <div v-if="categories" class="categories__container vacancies-items">
        <NuxtLink v-for="category in categories" :key="category.uuid" :to="{ name: 'categories-id', params: { id: category.uuid } }" class="categories__item vacancies-items__item">
            <div class="categories__image vacancies-items__image">
                <img :src="`${$config.public.baseURL}/storage/vacanciesCategory/${category.image}`" alt="">
            </div>
            <p class="categories__item-title vacancies-items__title">
                {{ category.title }}
            </p>
        </NuxtLink>
    </div>
    <UiLoader v-else />
    </div>
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '~/store/categories';
if(process.client) {
    const categoriesStore = useCategoriesStore();
    onMounted(async() => {
    await categoriesStore.fetchCategories()
    categories.value = categoriesStore.categories
})
}

const categories = ref(null)


</script>

<style lang="scss" scoped>
.vacancies-items {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 40px;
    &__item {
      width: calc(25% - 8px);
  
      border: 1px solid #e6e0ff;
      border-radius: 10px;
      padding: 24px;
      max-width: 304px;
      width: 100%;
      height: 123px;
  
      box-shadow: 0 4px 20px 0 rgba(96, 77, 158, 0.08);
      background: #fff;
      display: flex;
      align-items: center;
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
  }
</style>