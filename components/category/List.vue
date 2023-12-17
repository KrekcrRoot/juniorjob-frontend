
import type { CategoryItem } from '#build/components';

import type SelectCategoryVue from '../form/SelectCategory.vue';
<template>
    <div v-if="categories" class="categories__container">
        <NuxtLink v-for="category in categories" :key="category.uuid" :to="{ name: 'categories-id', params: { id: category.uuid } }" class="categories__item">
            <div class="categories__image">
                <img :src="'https://api.junior-job.ru' + category.image" alt="">
            </div>
            <p class="categories__item-title">
                {{ category.title }}
            </p>
        </NuxtLink>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '~/store/categories';

const categoriesStore = useCategoriesStore();

const categories = ref(null)

onMounted(async() => {
    await categoriesStore.fetchCategories()
    categories.value = categoriesStore.categories
})
</script>

<style lang="scss" scoped>

</style>