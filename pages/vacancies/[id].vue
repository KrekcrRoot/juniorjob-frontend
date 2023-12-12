<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useVacanciesStore } from '~/store/vacancies';

const loading = ref(true)
const route = useRoute()
if (process.client) {

    const vacanciesStore = useVacanciesStore()

    const vacancy = ref()

    onMounted(() => {
        loading.value = false
        vacancy.value = vacanciesStore.getById(route.params.id)
    })
}

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
                {{ route.params.id }}
            </div>

        </template>
    </div>
</template>

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
            width: 100%;
            height: 100%;
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
}</style>