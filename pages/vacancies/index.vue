<script setup>
import { ref, onMounted } from 'vue';

const loading = ref(true)

onMounted(() => {
    loading.value = false
})
</script>
<template>
    <div class="">
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <!-- Формы регистрации -->
        <template v-else>
            <div class="xl:container mx-auto">
                <div class="categories my-3">
                    <h1 class="page-title mt-12 mb-9">
                        Категории
                    </h1>
                    <div class="categories__container">
                        <NuxtLink  class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </NuxtLink>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                        <div class="categories__item">
                            <div class="categories__image">
                                <img src="@/assets/images/categories/bytovue.png" alt="">
                            </div>
                            <p class="categories__item-title">
                                Бытовые задачи
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </template>
    </div>
</template>

<style lang="scss" scoped>
.categories {
    @media screen and (max-width: 1080px) {
        padding-left: 20px;
        padding-right: 20px;
    }
    &__container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 30px;
        justify-content: space-between;

        @media screen and (max-width: 420px) {
            grid-template-columns: repeat(3, 70px);
        }
    }
    &__item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 7px;
    }
    &__image {
        width: 75px;
        height: 75px;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
    }
    &__item-title {
        color: #604D9E;
        text-align: center;
        font-family: 'Source Sans Pro';
        font-size: 16px;
        font-style: normal;
        font-weight: 300;
        line-height: 15px;
    }

}
</style>