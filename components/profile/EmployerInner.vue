<script setup>
import { ref } from 'vue';
import api from '~/api';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';
if (process.client) {
    const router = useRouter();
    const userStore = useUserStore();
}

</script>
<template>
    <div class="xl:container mx-auto">
        <div class="profile mt-10">
            <div class="profile__left">
                <h1 class="profile__title">
                    Мои вакансии
                </h1>
                <div class="profile__vacancies mt-5">
                    <!-- VACANCIES ITEM -->
                    <a class="profile__vacancies-item">
                        <div class="profile__vacancies-item-head">
                            <p class="profile__vacancies-item-name">
                                Выгул шпицев
                            </p>
                            <div class="flex gap-2">
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2674" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2674)">
                                            <path
                                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2677" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2677)">
                                            <path
                                                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>

                            </div>
                        </div>
                        <p class="profile__info">
                            Вторник 17:00-17:30. Выгуливать двух собачек...
                        </p>
                    </a>
                    <!-- //VACANCIES ITEM -->
                                        <!-- VACANCIES ITEM -->
                                        <a class="profile__vacancies-item">
                        <div class="profile__vacancies-item-head">
                            <p class="profile__vacancies-item-name">
                                Выгул шпицев
                            </p>
                            <div class="flex gap-2">
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2674" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2674)">
                                            <path
                                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2677" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2677)">
                                            <path
                                                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>

                            </div>
                        </div>
                        <p class="profile__info">
                            Вторник 17:00-17:30. Выгуливать двух собачек...
                        </p>
                    </a>
                    <!-- //VACANCIES ITEM -->
                                        <!-- VACANCIES ITEM -->
                                        <a class="profile__vacancies-item">
                        <div class="profile__vacancies-item-head">
                            <p class="profile__vacancies-item-name">
                                Выгул шпицев
                            </p>
                            <div class="flex gap-2">
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2674" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2674)">
                                            <path
                                                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>
                                <a>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <mask id="mask0_1986_2677" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                            y="0" width="24" height="24">
                                            <rect width="24" height="24" fill="#D9D9D9" />
                                        </mask>
                                        <g mask="url(#mask0_1986_2677)">
                                            <path
                                                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                                                fill="#604D9E" />
                                        </g>
                                    </svg>
                                </a>

                            </div>
                        </div>
                        <p class="profile__info">
                            Вторник 17:00-17:30. Выгуливать двух собачек...
                        </p>
                    </a>
                    <!-- //VACANCIES ITEM -->
                    <button class="btn mt-7">
                        Новая вакансия
                    </button>
                </div>
            </div>
            <div class="profile__right">


        </div>
    </div>
</div></template>

<style lang="scss" scoped></style>