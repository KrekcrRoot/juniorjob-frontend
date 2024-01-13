<script setup>
import { ref, onMounted } from "vue";
import api from "~/api";
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

const isEdit = ref(false);

const formData = ref();

const oldPassword = ref("");
const newPassword = ref("");

const edit = () => {
  isEdit.value = true;
};

const update = () => {
  isEdit.value = false;
};

const updatePassword = () => {
  api.users.changePassword(oldPassword.value, newPassword.value);
};

onMounted(() => {
  if (userStore.user) {
    formData.value = userStore.user;
  }
});

watch(userStore.user, (oldValue, newValue) => {
  if (userStore.user) {
    formData.value = newValue;
  }
});
</script>
<template>
  <div class="accordion w-full max-w-3xl pl-5 mt-10">
    <div class="divide-y divide-gray-100">
      <!-- <details class="group">
          <summary
            class="flex cursor-pointer list-none items-center justify-between py-4 accordion__title">
            Общие
            <div class="text-secondary-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="block h-5 w-5 transition-all duration-300 group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </summary>
          <div class="pb-4">
            
            <div class="divide-y divide-gray-100">
              <details class="group">
                <summary
                  class="flex cursor-pointer list-none items-center justify-between py-4 accordion__subtitle">
                  Аккаунт
                  <div class="text-secondary-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="block h-5 w-5 transition-all duration-300 group-open:rotate-180">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </summary>
                <div class="pb-4 text-secondary-500"></div>
              </details>
              </div>
          </div>
        </details> -->

      <details class="group accordion__field">
        <summary
          class="flex cursor-pointer list-none items-center justify-between py-4 accordion__title"
        >
          Аккаунт
          <div class="text-secondary-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </div>
        </summary>
        <div class="accordion__content pb-4 text-secondary-500">
          <div class="max-w-lg flex items-center justify-between mb-4">
            <p class="accordion__subtitle mr-5">Введите новый пароль:</p>
            <input type="password" class="field" />
          </div>
          <details class="group accordion__field">
            <summary
              class="flex cursor-pointer list-none items-center justify-between py-4 accordion__subtitle"
            >
              Изменить пароль
              <div class="text-secondary-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="block h-5 w-5 transition-all duration-300 group-open:rotate-180"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
            </summary>
            <div class="accordion__content pb-4 text-secondary-500">
              <div class="max-w-lg flex items-center justify-between mb-4">
                <p class="accordion__subtitle-2 mr-5">Введите старый пароль:</p>
                <input type="password" class="field" v-model="oldPassword" />
              </div>
              <div class="max-w-lg flex items-center justify-between mb-4">
                <p class="accordion__subtitle-2 mr-5">Введите новый пароль:</p>
                <input type="password" class="field" v-model="newPassword" />
              </div>
              <button @click="updatePassword" class="btn accordion__btn">
                Обновить пароль
              </button>
            </div>
          </details>
        </div>
        <!-- v-if="userStore?.roles?.current === 'applicant'" -->
        <!-- <div class="max-w-lg flex items-center justify-between pt-5 mb-7">
              <p class="accordion__subtitle">
                Пароль:
              </p>
              <input class="field" v-if="isEdit">
              <p v-else class="accordion__text">Телефон</p>
            </div>
            <button v-if="!isEdit" @click="edit" class="btn accordion__btn">
              Редактировать
            </button>
            <button v-if="isEdit" @click="update" class="btn accordion__btn">
              Сохранить
            </button> -->
        <!-- </div> -->
      </details>

      <!-- <details class="group">
          <summary
            class="flex cursor-pointer list-none items-center justify-between py-4 accordion__title">
            Помощь
            <div class="text-secondary-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="block h-5 w-5 transition-all duration-300 group-open:rotate-180">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </summary>
          <div class="pb-4 text-secondary-500"></div>
        </details> -->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.accordion {
  &__title {
    color: #2c1b47;
    font-family: "Marmelad";
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
    padding: 20px;
    border-radius: 10px;
    &:hover {
      background: #d4ccf1;
    }
  }
  &__subtitle {
    color: #604d9e;

    font-family: "Source Sans Pro";
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: 25px;
  }

  &__subtitle-2 {
    color: #604d9e;

    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    flex-shrink: 0;
    line-height: 25px;
  }

  &__field {
    border-radius: 10px;

    &:hover {
      background: #fbfaff;
    }
  }

  &__content {
    padding: 20px;
  }

  &__text {
    color: #604d9e;

    text-align: right;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: 25px; /* 125% */
    text-decoration-line: underline;
  }

  &__btn {
    padding-top: 7px;
    padding-bottom: 7px;
  }
}
</style>
