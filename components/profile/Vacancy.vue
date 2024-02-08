<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { useUserStore } from "~/store/user";
import { useVacanciesStore } from "~/store/vacancies";
import { useRouter, useRoute } from "vue-router";
import api from "~/api";
const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const vacanciesStore = useVacanciesStore();

const vacancy = ref(null);
const responsesByVacancy = ref("");

const isScreenSmall = ref(window.innerWidth <= 490);

const handleResize = () => {
  isScreenSmall.value = window.innerWidth <= 490;
};

const isInMyVacancies = ref(false);
const activeVacancyComment = ref(null);
const message = ref("");

const vacancyResponse = async (data) => {
  try {
    const res = await api.vacancies.createResponse(data);
    activeVacancyComment.value = "";
  } catch (err) {
    console.log(err);
  }
  if (userStore.roles && userStore.roles.current === "applicant") {
    vacanciesStore.fetchApplicantResponses(userStore.user.uuid);
    // vacanciesStore.vacanciesResponses = [
    //   ...vacanciesStore.vacanciesResponses,
    //   res,
    // ];
  }
};

const searchResponse = (id) => {
  if (userStore.roles.current === "applicant") {
    return !!vacanciesStore.vacanciesResponses.find((w) => {
      return w.vacancy.uuid === id;
    });
  }
};

const toggleVacancyComment = (id) => {
  message.value = "";
  activeVacancyComment.value = id;
};

// const searchResponse = computed(() => {
//   if(userStore.roles.current === 'applicant' && vacancy.value) {
//     return !!vacanciesStore.vacanciesResponses.find((w) => {
//       return w.vacancy.uuid === "6527fa16-c2d9-41ea-a984-0c18252537d5";
//     })
//   }
// })

onMounted(async () => {
  if (userStore.roles && userStore.roles.current === "applicant") {
    vacanciesStore.fetchApplicantResponses(userStore.user.uuid);
  }
  window.addEventListener("resize", handleResize);
  vacancy.value = await vacanciesStore.getById(route?.params?.id);
  if (
    userStore.access_token !== "" &&
    userStore.user.role.current !== "applicant"
  ) {
    await vacanciesStore.getMyVacancies();
    let res = await api.vacancies.getCandidatsByVacancy(vacancy?.value?.uuid);
    responsesByVacancy.value = res;
    responsesByVacancy.value = await Promise.all(
      res.map(async (item) => {
        console.log(item);
        const applicant = await api.roles.get_roles_data(
          item.applicant.role.uuid
        );
        Object.assign(item.applicant, applicant[applicant.current]);
        return { ...item };
      })
    );
    isInMyVacancies.value = vacanciesStore.vacanciesUser.find(
      (v) => v.uuid === vacancy.value?.uuid
    )
      ? true
      : false;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <div class="xl:container mx-auto">
    <div class="profile w-full profile-mobile-main relative mt-10">
      <!-- АВАТАР И ИМЯ НА МОБИЛКЕ -->
      <template v-if="isScreenSmall">
        <div class="profile-mobile-wrapper">
          <div
            v-if="vacancy !== null"
            class="profile-mobile profile__image profile__image--vacancy"
          >
            <img
              :src="`${$config.public.baseURL}/storage/users/${vacancy.employer.image}`"
              alt="profile"
            />
          </div>
          <div>
            <p class="profile-mobile profile__name profile__name--vacancy">
              {{ vacancy?.title }}
            </p>
            <p
              class="profile-mobile profile__name profile__name--vacancy color-purple"
            >
              {{ vacancy?.employer?.email }}
            </p>
          </div>
          <!-- РЕДАКТИРОВАТЬ -->
          <NuxtLink
            v-if="isInMyVacancies"
            class="cursor-pointer"
            :to="{ name: 'vacancies-edit-id', params: { id: vacancy?.uuid } }"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1986_2674"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1986_2674)">
                <path
                  d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                  fill="#604D9E"
                />
              </g>
            </svg>
          </NuxtLink>
          <!-- //РЕДАКТИРОВАТЬ -->
        </div>
        <div class="flex items-center gap-1 mt-0">
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1986_2713"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="21"
            >
              <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1986_2713)">
              <path
                d="M12 10.9195C12.55 10.9195 13.021 10.7549 13.413 10.4256C13.8043 10.0969 14 9.70153 14 9.23953C14 8.77753 13.8043 8.38189 13.413 8.05261C13.021 7.72389 12.55 7.55953 12 7.55953C11.45 7.55953 10.9793 7.72389 10.588 8.05261C10.196 8.38189 10 8.77753 10 9.23953C10 9.70153 10.196 10.0969 10.588 10.4256C10.9793 10.7549 11.45 10.9195 12 10.9195ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                fill="#604D9E"
              />
            </g>
          </svg>
          <p class="profile__info">{{ vacancy?.place }}</p>
        </div>
        <!-- НЕОБХОДИМ ОПЫТ РАБОТЫ -->
        <div
          v-if="vacancy?.required_experience"
          class="flex items-center gap-1 mt-1"
        >
          <svg
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_1986_2718"
              style="mask-type: alpha"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="24"
              height="21"
            >
              <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_1986_2718)">
              <path
                d="M11 10.0795H13V5.87953H11V10.0795ZM12 13.4395C12.2833 13.4395 12.521 13.3589 12.713 13.1976C12.9043 13.0369 13 12.8375 13 12.5995C13 12.3615 12.9043 12.1619 12.713 12.0006C12.521 11.8399 12.2833 11.7595 12 11.7595C11.7167 11.7595 11.4793 11.8399 11.288 12.0006C11.096 12.1619 11 12.3615 11 12.5995C11 12.8375 11.096 13.0369 11.288 13.1976C11.4793 13.3589 11.7167 13.4395 12 13.4395ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                fill="#604D9E"
              />
            </g>
          </svg>
          <p class="profile__info">Необходим опыт работы</p>
        </div>
        <!-- //НЕОБХОДИМ ОПЫТ РАБОТЫ -->
        <p class="profile__about mt-3">
          {{ vacancy?.time }}. {{ vacancy?.description }}
        </p>
        <template v-if="userStore.access_token !== ''">
          <div
            class="w-full flex items-center flex-col mt-3 mb-3"
            v-if="userStore.user.role.current === 'applicant'"
          >
            <p class="vacancy__check" v-if="searchResponse(vacancy?.uuid)">
              Вы откликнулись на эту вакансию
            </p>
            <template v-else>
              <template v-if="activeVacancyComment === vacancy?.uuid">
                <button
                  @click="toggleVacancyComment('')"
                  class="btn vacancy__btn"
                >
                  Отмена
                </button>
              </template>
              <button
                @click="toggleVacancyComment(vacancy.uuid)"
                v-else
                class="btn vacancy__btn"
              >
                Откликнуться
              </button>
              <div
                v-if="activeVacancyComment === vacancy?.uuid"
                class="vacancies-list__item-review"
              >
                <h3>
                  Напишите немного о себе (можете прикрепить ссылки на
                  портфолио)
                </h3>
                <textarea
                  v-model="message"
                  class="field vacancies-list__item-review--field"
                ></textarea>
                <button
                  @click="
                    vacancyResponse({ uuid: vacancy.uuid, message: message })
                  "
                  class="vacancies-list__btn btn-outline mt-3"
                >
                  Откликнуться
                </button>
              </div>
            </template>

            <button class="btn mt-2">Написать</button>
            <div class="items-center justify-center flex mt-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="19"
                viewBox="0 0 20 19"
                fill="none"
              >
                <path
                  d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                  fill="#545388"
                />
              </svg>
              <p class="color-purple text">В избранное</p>
            </div>
          </div>
          <div v-else>
            <div v-if="isInMyVacancies" class="profile__reviews-section">
              <h2 class="profile__reviews-section-title">Кандидаты</h2>
              <p v-if="!responsesByVacancy">Пока нет откликов по вакансии</p>
              <div v-else class="profile__reviews mt-3">
                <div
                  v-for="(candidat, index) in responsesByVacancy"
                  :key="index"
                  class="profile__reviews-item"
                >
                  <a
                    class="profile__reviews-item-head profile-reviews-head-mobile"
                  >
                    <div class="flex items-center">
                      <div class="profile__reviews-item-avatar">
                        <img
                          v-if="candidat.applicant.image === 'image.png'"
                          src="@/assets/images/profile/profile.svg"
                          alt=""
                        />
                        <img
                          v-else
                          :src="`${$config.public.baseURL}/storage/users/${candidat.applicant.image}`"
                          alt=""
                        />
                      </div>
                      <div>
                        <p class="profile__reviews-item-name">
                          {{ candidat.applicant.surname }}
                          {{ candidat.applicant.name }}
                        </p>
                        <!-- <div class="stars">
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                      </div> -->
                      </div>
                    </div>
                    <p
                      v-if="
                        vacancy.responseSelected !== null &&
                        vacancy.responseSelected !== '' &&
                        vacancy.responseSelected === candidat.uuid
                      "
                    >
                      Выбран исполнителем
                    </p>
                    <button v-else class="btn btn--small ml-2">
                      Выбрать исполнителем
                    </button>
                  </a>
                  <p class="profile__reviews-item-comment">
                    {{ candidat.message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
      </template>
      <!-- АВАТАР И ИМЯ НА ПК -->
      <template v-else>
        <div class="profile__left">
          <div class="flex gap-3">
            <div
              class="profile__image profile__image--vacancy"
              v-if="vacancy !== null"
            >
              <img
                :src="`${$config.public.baseURL}/storage/users/${vacancy.employer.image}`"
                alt="profile"
              />
            </div>
            <div class="w-full">
              <!-- Имя -->
              <div class="w-full flex justify-between">
                <div>
                  <p class="profile__name profile__name--vacancy">
                    {{ vacancy?.title }}
                  </p>
                  <p class="profile__name profile__name--vacancy color-purple">
                    {{ vacancy?.employer?.email }}
                  </p>
                </div>
                <!-- РЕДАКТИРОВАТЬ -->
                <NuxtLink
                  v-if="isInMyVacancies"
                  class="cursor-pointer"
                  :to="{
                    name: 'vacancies-edit-id',
                    params: { id: vacancy?.uuid },
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <mask
                      id="mask0_1986_2674"
                      style="mask-type: alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                    >
                      <rect width="24" height="24" fill="#D9D9D9" />
                    </mask>
                    <g mask="url(#mask0_1986_2674)">
                      <path
                        d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                        fill="#604D9E"
                      />
                    </g>
                  </svg>
                </NuxtLink>
                <!-- //РЕДАКТИРОВАТЬ -->
              </div>
            </div>
          </div>
          <div class="flex items-center gap-1 mt-4">
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1986_2713"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="21"
              >
                <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1986_2713)">
                <path
                  d="M12 10.9195C12.55 10.9195 13.021 10.7549 13.413 10.4256C13.8043 10.0969 14 9.70153 14 9.23953C14 8.77753 13.8043 8.38189 13.413 8.05261C13.021 7.72389 12.55 7.55953 12 7.55953C11.45 7.55953 10.9793 7.72389 10.588 8.05261C10.196 8.38189 10 8.77753 10 9.23953C10 9.70153 10.196 10.0969 10.588 10.4256C10.9793 10.7549 11.45 10.9195 12 10.9195ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                  fill="#604D9E"
                />
              </g>
            </svg>
            <p class="profile__info">{{ vacancy?.place }}</p>
          </div>
          <!-- НЕОБХОДИМ ОПЫТ РАБОТЫ -->
          <div
            v-if="vacancy?.required_experience"
            class="flex items-center gap-1 mt-2"
          >
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask
                id="mask0_1986_2718"
                style="mask-type: alpha"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="21"
              >
                <rect y="0.839844" width="24" height="20.16" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1986_2718)">
                <path
                  d="M11 10.0795H13V5.87953H11V10.0795ZM12 13.4395C12.2833 13.4395 12.521 13.3589 12.713 13.1976C12.9043 13.0369 13 12.8375 13 12.5995C13 12.3615 12.9043 12.1619 12.713 12.0006C12.521 11.8399 12.2833 11.7595 12 11.7595C11.7167 11.7595 11.4793 11.8399 11.288 12.0006C11.096 12.1619 11 12.3615 11 12.5995C11 12.8375 11.096 13.0369 11.288 13.1976C11.4793 13.3589 11.7167 13.4395 12 13.4395ZM12 17.0935C14.0333 15.5255 15.5417 14.1009 16.525 12.8196C17.5083 11.5389 18 10.4015 18 9.40753C18 7.88153 17.4207 6.63189 16.262 5.65861C15.104 4.68589 13.6833 4.19953 12 4.19953C10.3167 4.19953 8.89567 4.68589 7.737 5.65861C6.579 6.63189 6 7.88153 6 9.40753C6 10.4015 6.49167 11.5389 7.475 12.8196C8.45833 14.1009 9.96667 15.5255 12 17.0935ZM12 19.3195C9.31667 17.4015 7.31267 15.6199 5.988 13.9746C4.66267 12.3299 4 10.8075 4 9.40753C4 7.30753 4.80433 5.63453 6.413 4.38853C8.021 3.14253 9.88333 2.51953 12 2.51953C14.1167 2.51953 15.979 3.14253 17.587 4.38853C19.1957 5.63453 20 7.30753 20 9.40753C20 10.8075 19.3377 12.3299 18.013 13.9746C16.6877 15.6199 14.6833 17.4015 12 19.3195Z"
                  fill="#604D9E"
                />
              </g>
            </svg>
            <p class="profile__info">Необходим опыт работы</p>
          </div>
          <!-- //НЕОБХОДИМ ОПЫТ РАБОТЫ -->
        </div>
        <div class="profile__right">
          <p class="profile__about mt-3">
            {{ vacancy?.time }}. {{ vacancy?.description }}
          </p>
          <template v-if="userStore.access_token !== ''">
            <div
              class="w-full flex items-center mt-3 mb-3 gap-4"
              v-if="userStore.user.role.current === 'applicant'"
            >
              <p class="vacancy__check" v-if="searchResponse(vacancy?.uuid)">
                Вы откликнулись на эту вакансию
              </p>
              <template v-else>
                <template v-if="activeVacancyComment === vacancy?.uuid">
                  <button
                    @click="toggleVacancyComment('')"
                    class="btn vacancy__btn"
                  >
                    Отмена
                  </button>
                </template>
                <button
                  @click="toggleVacancyComment(vacancy.uuid)"
                  v-else
                  class="btn vacancy__btn"
                >
                  Откликнуться
                </button>
              </template>
              <button class="btn vacancy__btn">Написать</button>
              <div class="items-center justify-center flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M6.85 14.825L10 12.925L13.15 14.85L12.325 11.25L15.1 8.85L11.45 8.525L10 5.125L8.55 8.5L4.9 8.825L7.675 11.25L6.85 14.825ZM3.825 19L5.45 11.975L0 7.25L7.2 6.625L10 0L12.8 6.625L20 7.25L14.55 11.975L16.175 19L10 15.275L3.825 19Z"
                    fill="#545388"
                  />
                </svg>
                <p class="color-purple text">В избранное</p>
              </div>
            </div>
            <div v-else>
              <div v-if="isInMyVacancies" class="profile__reviews-section">
                <h2 class="profile__reviews-section-title">Кандидаты</h2>
                <p
                  v-if="!responsesByVacancy || responsesByVacancy.length === 0"
                >
                  Пока нет откликов по вакансии
                </p>
                <div class="profile__reviews mt-3">
                  <div
                    v-for="(candidat, index) in responsesByVacancy"
                    :key="index"
                    class="profile__reviews-item"
                  >
                    <a
                      class="profile__reviews-item-head profile-reviews-head-mobile"
                    >
                      <div class="flex items-center">
                        <div class="profile__reviews-item-avatar">
                          <img
                            v-if="candidat.applicant.image === 'image.png'"
                            src="@/assets/images/profile/profile.svg"
                            alt=""
                          />
                          <img
                            v-else
                            :src="`${$config.public.baseURL}/storage/users/${candidat.applicant.image}`"
                            alt=""
                          />
                        </div>
                        <div>
                          <p class="profile__reviews-item-name">
                            {{ candidat.applicant.surname }}
                            {{ candidat.applicant.name }}
                          </p>
                          <!-- <div class="stars">
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                        <img
                          src="@/assets/images/icons/star-color.svg"
                          alt="star"
                        />
                      </div> -->
                        </div>
                      </div>
                      <p
                        v-if="
                          vacancy.responseSelected !== null &&
                          vacancy.responseSelected !== '' &&
                          vacancy.responseSelected === candidat.uuid
                        "
                      >
                        Выбран исполнителем
                      </p>
                      <button v-else class="btn btn--small ml-2">
                        Выбрать исполнителем
                      </button>
                    </a>
                    <!-- <p class="profile__reviews-item-comment">
                  Хочу помочь вам с вашими чудесными мохнатиками!
                </p> -->
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                v-if="activeVacancyComment === vacancy?.uuid"
                class="vacancies-list__item-review"
              >
                <h3>
                  Напишите немного о себе (можете прикрепить ссылки на
                  портфолио)
                </h3>
                <textarea
                  v-model="message"
                  class="field vacancies-list__item-review--field"
                ></textarea>
                <button
                  @click="
                    vacancyResponse({ uuid: vacancy.uuid, message: message })
                  "
                  class="vacancies-list__btn btn-outline mt-3"
                >
                  Откликнуться
                </button>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.profile-mobile.profile__image.profile__image--vacancy {
  width: 90px;
  height: 90px;
  transform: translate(0, -50%);
}

.profile-mobile.profile__name.profile__name--vacancy {
  font-size: 20px;
}

.profile-mobile-wrapper {
  position: relative;
  display: flex;
  align-items: flex-start;
  max-height: 60px;
}

.profile-mobile-main {
  @media screen and (max-width: 500px) {
    position: absolute;
    top: 0;
    margin-top: 0;
    padding-top: 0;
    gap: 10px;
  }
}

.profile-mobile-info {
  font-size: 26px;
}

.profile-about-mobile {
  @media screen and (max-width: 500px) {
    padding-left: 20px;
    padding-right: 20px;
  }
}

.profile-reviews-head-mobile {
  @media screen and (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
}

.vacancy__btn {
  padding: 8px 25px;
}

.vacancy__check {
  color: #604d9e;
  font-weight: 600;
  font-size: 18px;
}

.vacancies-list__item-review {
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;

  &--field {
    min-width: 50%;
    min-height: 70px;
    margin-top: 15px;
  }
}
</style>
