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
                <h1 class="profile__vacancy-title">
                    Выгул шпицев
                </h1>
                <div class="flex items-center gap-1 mt-4">
                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1986_2713" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                            height="21">
                            <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_1986_2713)">
                            <path
                                d="M12 10.9195C12.55 10.9195 13.021 10.7549 13.413 10.4256C13.8043 10.0969 14 9.70153 14 9.23953C14 8.77753 13.8043 8.38189 13.413 8.05261C13.021 7.72389 12.55 7.55953 12 7.55953C11.45 7.55953 10.9793 7.72389 10.588 8.05261C10.196 8.38189 10 8.77753 10 9.23953C10 9.70153 10.196 10.0969 10.588 10.4256C10.9793 10.7549 11.45 10.9195 12 10.9195ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                                fill="#604D9E" />
                        </g>
                    </svg>
                    <p class="profile__info">Промышленный р-н</p>
                </div>
                <div class="flex items-center gap-1 mt-2">
                    <svg width="24" height="21" viewBox="0 0 24 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_1986_2718" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24"
                            height="21">
                            <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_1986_2718)">
                            <path
                                d="M11 10.0795H13V5.87953H11V10.0795ZM12 13.4395C12.2833 13.4395 12.521 13.3589 12.713 13.1976C12.9043 13.0369 13 12.8375 13 12.5995C13 12.3615 12.9043 12.1619 12.713 12.0006C12.521 11.8399 12.2833 11.7595 12 11.7595C11.7167 11.7595 11.4793 11.8399 11.288 12.0006C11.096 12.1619 11 12.3615 11 12.5995C11 12.8375 11.096 13.0369 11.288 13.1976C11.4793 13.3589 11.7167 13.4395 12 13.4395ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                                fill="#604D9E" />
                        </g>
                    </svg>
                    <p class="profile__info">Необходим опыт работы</p>
                </div>
                <p class="profile__about mt-3">
                    Вторник 17:00-17:30. Выгуливать двух собачек (померанских шпицев) по придомовой территории и держать их
                    подальше от чужих собак. Оплата по договоренности.
                </p>
                <div class="profile__reviews-section">
                    <h2 class="profile__reviews-section-title">
                        Кандидаты
                    </h2>
                    <div class="profile__reviews mt-3">
                        <div class="profile__reviews-item">
                            <a class="profile__reviews-item-head">
                                <div class="profile__reviews-item-avatar">
                                    <img src="@/assets/images/profile/review-demo.png" alt="">
                                </div>
                                <div>
                                    <p class="profile__reviews-item-name">Чернявский Иван</p>
                                    <div class="stars">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                    </div>
                                </div>
                                <button class="btn btn--small ml-2">Выбрать исполнителем</button>
                            </a>
                            <p class="profile__reviews-item-comment">
                                Хочу помочь вам с вашими чудесными мохнатиками! 
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>