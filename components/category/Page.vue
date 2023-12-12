<template>
    <div class="category">
        <h1 class="page-title mt-12 mb-7">
            Вакансии
        </h1>
        <div class="vacancies-list">
            <div class="vacancies-list__item">
                <div class="flex items-center gap-2">
                    <div class="vacancies-list__item-star">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <mask id="mask0_1050_1499" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                              <rect width="24" height="24" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_1050_1499)">
                              <path d="M8.85 17.825L12 15.925L15.15 17.85L14.325 14.25L17.1 11.85L13.45 11.525L12 8.125L10.55 11.5L6.9 11.825L9.675 14.25L8.85 17.825ZM5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#604D9E"/>
                            </g>
                          </svg>
                    </div>
                    <div class="vacancies-list__avatar">
                        <img src="@/assets/images/profile/review-demo.png" alt="">
                    </div>
                    <div>
                        <NuxtLink class="vacancies-list__title">
                            Выгул шпицев
                        </NuxtLink>
                        <p class="vacancies-list__text">
                            Промышленный р-н
                        </p>
                        <p class="vacancies-list__text">
                            Вторник 17:00-17:30
                        </p>
                    </div>
        
                </div>
                <button class="vacancies-list__btn btn-outline">
                    Откликнуться
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from "~/store/categories";

const categoriesStore = useCategoriesStore();

onMounted(() => {
    if(categoriesStore.categories.length === 0) {
        useCategoriesStore.fetchCategories()
    }
})

</script>

<style lang="scss" scoped>
.category {
    @media screen and (max-width: 1280px) {
        padding-left: 20px;
        padding-right: 20px;
    }
}
.vacancies-list {
    &__btn {
        min-width: 270px;
        @media screen and (max-width: 734px) {
            display: none;
        }
    }

    &__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        border-radius: 10px;
        &:hover {
            background: #f6f4ff;
        }
    }
    &__avatar {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        overflow: hidden;
        img {
            width: 100%;height: 100%;
            object-fit: contain;
        }
    }
    &__title {
        cursor: pointer;
        color: #000;
        font-family: 'Marmelad';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    &__text {
        color: #604D9E;
        font-family: 'Source Sans Pro';
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }
}
</style>