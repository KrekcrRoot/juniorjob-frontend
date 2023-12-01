<script setup>
import { ref, defineProps, computed } from 'vue';
import api from '~/api';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';


if (process.client) {
    const router = useRouter();
    const userStore = useUserStore();
}

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const userName = computed(() => {
    return props.user?.userData.name + " " + props.user?.userData.surname
})

const userAge = computed(() => {
  const birthdate = new Date(props.user.userData.birthday);
  const today = new Date();

  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDiff = today.getMonth() - birthdate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
    age--;
  }

  return age;
});

</script>
<template>
    <div class="xl:container mx-auto">
        <div class="profile mt-10">
            <div class="profile__left">
                <div class="flex gap-3">
                    <div class="profile__image">
                        <img src="@/assets/images/profile/profile.svg" alt="profile">
                    </div>
                    <div class="w-full">
                        <!-- Имя -->
                        <div class="w-full flex justify-between">
                            <p class="profile__name">
                                {{ userName }}
                            </p>
                            <a>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_1506_1906" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="20" height="20">
                                        <rect width="20" height="20" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_1506_1906)">
                                        <path
                                            d="M4.16667 15.8334H5.33333L12.5208 8.64591L11.3542 7.47925L4.16667 14.6667V15.8334ZM16.0833 7.43758L12.5417 3.93758L13.7083 2.77091C14.0278 2.45147 14.4201 2.29175 14.8854 2.29175C15.3507 2.29175 15.7431 2.45147 16.0625 2.77091L17.2292 3.93758C17.5486 4.25703 17.7153 4.64244 17.7292 5.09383C17.7431 5.54522 17.5903 5.93064 17.2708 6.25008L16.0833 7.43758ZM14.875 8.66675L6.04167 17.5001H2.5V13.9584L11.3333 5.12508L14.875 8.66675Z"
                                            fill="#604D9E" />
                                    </g>
                                </svg>
                            </a>
                        </div>
                        <!-- Информация -->
                        <p class="profile__info mt-4">{{ userAge }} лет</p>
                        <p class="profile__info mt-1">МБОУ “СШ №40”</p>
                        <p class="profile__info flex items-center gap-1 mt-1">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_1506_1853" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="20" height="20">
                                    <rect width="20" height="20" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_1506_1853)">
                                    <path
                                        d="M9.99992 10.0001C10.4583 10.0001 10.8508 9.83675 11.1774 9.51008C11.5035 9.18397 11.6666 8.79175 11.6666 8.33341C11.6666 7.87508 11.5035 7.48258 11.1774 7.15591C10.8508 6.8298 10.4583 6.66675 9.99992 6.66675C9.54158 6.66675 9.14936 6.8298 8.82325 7.15591C8.49659 7.48258 8.33325 7.87508 8.33325 8.33341C8.33325 8.79175 8.49659 9.18397 8.82325 9.51008C9.14936 9.83675 9.54158 10.0001 9.99992 10.0001ZM9.99992 16.1251C11.6944 14.5695 12.9513 13.1562 13.7708 11.8851C14.5902 10.6145 14.9999 9.48619 14.9999 8.50008C14.9999 6.98619 14.5171 5.74647 13.5516 4.78091C12.5866 3.81591 11.4027 3.33341 9.99992 3.33341C8.59714 3.33341 7.41297 3.81591 6.44742 4.78091C5.48242 5.74647 4.99992 6.98619 4.99992 8.50008C4.99992 9.48619 5.40964 10.6145 6.22909 11.8851C7.04853 13.1562 8.30547 14.5695 9.99992 16.1251ZM9.99992 18.3334C7.76381 16.4306 6.09381 14.6631 4.98992 13.0309C3.88547 11.3992 3.33325 9.88897 3.33325 8.50008C3.33325 6.41675 4.00353 4.75703 5.34409 3.52091C6.68409 2.2848 8.23603 1.66675 9.99992 1.66675C11.7638 1.66675 13.3158 2.2848 14.6558 3.52091C15.9963 4.75703 16.6666 6.41675 16.6666 8.50008C16.6666 9.88897 16.1146 11.3992 15.0108 13.0309C13.9063 14.6631 12.236 16.4306 9.99992 18.3334Z"
                                        fill="#604D9E" />
                                </g>
                            </svg>
                            <span>г. Смоленск</span>
                        </p>
                        <p class="profile__info flex items-center underline gap-1 mt-1">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <mask id="mask0_1506_1861" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0"
                                    width="20" height="20">
                                    <rect width="20" height="20" fill="#D9D9D9" />
                                </mask>
                                <g mask="url(#mask0_1506_1861)">
                                    <path
                                        d="M7.9585 15.0001L3.2085 10.2501L4.396 9.06258L7.9585 12.6251L15.6043 4.97925L16.7918 6.16675L7.9585 15.0001Z"
                                        fill="#604D9E" />
                                </g>
                            </svg>
                            <span>Есть рекомендации из школы</span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="profile__right">
                <div class="profile__about">
                    Ответственный и коммуникабельный, наделен предпринимательской жилкой и лидерскими качествами. Отлично
                    учусь в школе и веду активный образ жизни. Люблю животных. Есть опыт журналистики, видеоблогинга и
                    работы над проектами
                </div>
                <div class="tags-section mt-5">
                    <div class="tags-section__item">
                        Публичные выступления
                    </div>
                    <div class="tags-section__item">
                        Python
                    </div>
                    <div class="tags-section__item">
                        Видеосъемка
                    </div>
                    <div class="tags-section__item">
                        Общение с животными
                    </div>
                </div>
                <div class="profile__reviews-section mt-3">
                    <h2 class="profile__reviews-section-title">
                        Отзывы
                    </h2>
                    <div class="profile__reviews">
                        <div class="profile__reviews-item">
                            <a class="profile__reviews-item-head">
                                <div class="profile__reviews-item-avatar">
                                    <img src="@/assets/images/profile/review-demo.png" alt="">
                                </div>
                                <div>
                                    <p class="profile__reviews-item-name">Ольга</p>
                                    <div class="stars">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                        <img src="@/assets/images/icons/star-color.svg" alt="star">
                                    </div>
                                </div>
                            </a>
                            <p class="profile__reviews-item-comment">
                                Шпицы довольны. 5 звезд!
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>