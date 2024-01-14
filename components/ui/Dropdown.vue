<script setup>
import { ref, onMounted } from "vue";
import api from "~/api";
import { useUserStore } from "~/store/user";
const userStore = useUserStore();

const isEdit = ref(false);

const formData = ref({
  title: "",
  inn: "",
  contact_info: "",
  summary: "",
  name: "",
  surname: "",
  birthday: "",
  study_place: "",
  competitions: "",
  patronymic: "",
});

const passwordMessageParams = ref({
  type: "info",
  content: "",
  show: false,
});

const infoMessageParams = ref({
  type: "info",
  content: "",
  show: false,
});

const emailMessageParams = ref({
  type: "info",
  content: "",
  show: false,
});

const oldPassword = ref("");
const newPassword = ref("");

//Для смены E-mail
const newEmail = ref("");
const passwordForChangeEmail = ref("");

const edit = () => {
  isEdit.value = true;
};

const update = () => {
  isEdit.value = false;
};

const updatePassword = async () => {
  try {
    const res = await api.users.changePassword(
      oldPassword.value,
      newPassword.value
    );
    passwordMessageParams.value.show = true;
    passwordMessageParams.value.content = "Пароль обновлен";
    passwordMessageParams.value.type = "info";
  } catch (error) {
    passwordMessageParams.value.show = true;
    passwordMessageParams.value.type = "danger";
    passwordMessageParams.value.content =
      "Вы ввели неправильный текущий пароль. Попробуйте ещё раз";
  } finally {
    setTimeout(() => {
      passwordMessageParams.value.show = false;
    }, 3000);
  }
};

const updateInfo = async () => {
  try {
    // Обновление formData перед отправкой на сервер
    formData.value.birthday = formattedBirthday.value;

    const currentRole = userStore.payload.role;
    const updateResponse = await api.roles[currentRole](
      userStore.currentRoleId,
      formData.value
    );
    userStore.user.userData = updateResponse;
    infoMessageParams.value.show = true;
    infoMessageParams.value.content = "Данные обновлены";
    infoMessageParams.value.type = "info";
  } catch (error) {
    infoMessageParams.value.show = true;
    infoMessageParams.value.type = "danger";
    infoMessageParams.value.content =
      "Ошибка обновления данных. Попробуйте ещё раз";
  } finally {
    setTimeout(() => {
      infoMessageParams.value.show = false;
    }, 3000);
  }
};

const updateEmail = async () => {
  try {
    const res = await api.users.changeEmail(
      newEmail.value,
      passwordForChangeEmail.value
    );
    emailMessageParams.value.show = true;
    emailMessageParams.value.content = "E-mail обновлен";
    emailMessageParams.value.type = "info";
  } catch (error) {
    emailMessageParams.value.show = true;
    emailMessageParams.value.type = "danger";
    emailMessageParams.value.content =
      "Ошибка обновления данных. Попробуйте ещё раз";
  } finally {
    setTimeout(() => {
      emailMessageParams.value.show = false;
    }, 3000);
  }
};

const formattedBirthday = ref("");

onMounted(() => {
  if (userStore.user) {
    formData.value = userStore.user?.userData;
    if (formData.value.birthday) {
      const birthday = new Date(formData.value.birthday);
      formattedBirthday.value = birthday.toISOString().split("T")[0];
    }
  }
});

watch(userStore.user, (oldValue, newValue) => {
  if (userStore.user) {
    formData.value = newValue?.userData;
    newEmail.value = userStore.user.email;
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

      <details class="group accordion__field" open>
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
          <details class="group accordion__field">
            <summary
              class="flex cursor-pointer list-none items-center justify-between py-4 accordion__subtitle"
            >
              Общие данные
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
              <div
                v-if="userStore.roles.current === 'legal_entity'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Название:
                </p>
                <input type="text" class="field" v-model="formData.title" />
              </div>
              <div
                v-if="userStore.roles.current === 'legal_entity'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">ИНН:</p>
                <input type="text" class="field" v-model="formData.inn" />
              </div>
              <div
                v-if="userStore.roles.current === 'legal_entity'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Контакты:
                </p>
                <input
                  type="text"
                  class="field"
                  v-model="formData.contact_info"
                />
              </div>

              <div
                v-if="
                  userStore.roles.current === 'applicant' ||
                  userStore.roles.current === 'individual'
                "
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">Имя:</p>
                <input type="text" class="field" v-model="formData.name" />
              </div>
              <div
                v-if="
                  userStore.roles.current === 'applicant' ||
                  userStore.roles.current === 'individual'
                "
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">Фамилия:</p>
                <input type="text" class="field" v-model="formData.surname" />
              </div>
              <div
                v-if="userStore.roles.current === 'applicant'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Дата рождения:
                </p>
                <input type="date" class="field" v-model="formattedBirthday" />
              </div>
              <div
                v-if="userStore.roles.current === 'applicant'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Место обучения:
                </p>
                <input
                  type="text"
                  class="field"
                  v-model="formData.study_place"
                />
              </div>
              <div
                v-if="userStore.roles.current === 'applicant'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">ИНН:</p>
                <input type="text" class="field" v-model="formData.inn" />
              </div>
              <div
                v-if="userStore.roles.current === 'applicant'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">Резюме:</p>
                <input type="text" class="field" v-model="formData.summary" />
              </div>
              <div
                v-if="userStore.roles.current === 'individual'"
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Отчество:
                </p>
                <input
                  type="text"
                  class="field"
                  v-model="formData.patronymic"
                />
              </div>
              <div
                v-if="
                  userStore.roles.current === 'legal_entity' ||
                  userStore.roles.current === 'individual'
                "
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Какая помощь требуется:
                </p>
                <input type="text" class="field" v-model="formData.summary" />
              </div>
              <div class="flex accordion__footer gap-4">
                <button @click="updateInfo" class="btn accordion__btn">
                  Обновить
                </button>
                <UiMessage
                  id="info-message"
                  view="text"
                  :content="infoMessageParams.content"
                  :type="infoMessageParams.type"
                  :show="infoMessageParams.show"
                />
              </div>
            </div>
          </details>
          <details class="group accordion__field">
            <summary
              class="flex cursor-pointer list-none items-center justify-between py-4 accordion__subtitle"
            >
              Изменить e-mail
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
              <div
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[330px] mr-5">
                  Введите новый e-mail:
                </p>
                <input type="email" class="field" v-model="newEmail" />
              </div>
              <div
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[320px] mr-5">
                  Введите пароль для подтверждения:
                </p>
                <input
                  type="password"
                  class="field"
                  v-model="passwordForChangeEmail"
                />
              </div>
              <div class="flex accordion__footer gap-4">
                <button @click="updateEmail" class="btn accordion__btn">
                  Обновить e-mail
                </button>
                <UiMessage
                  id="mail-message"
                  view="text"
                  :content="emailMessageParams.content"
                  :type="emailMessageParams.type"
                  :show="emailMessageParams.show"
                />
              </div>
            </div>
          </details>
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
              <div
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Введите текущий пароль:
                </p>
                <input type="password" class="field" v-model="oldPassword" />
              </div>
              <div
                class="accordion__content-item max-w-lg flex items-center justify-between mb-4"
              >
                <p class="accordion__subtitle-2 min-w-[300px] mr-5">
                  Введите новый пароль:
                </p>
                <input type="password" class="field" v-model="newPassword" />
              </div>
              <div class="flex accordion__footer gap-4">
                <button @click="updatePassword" class="btn accordion__btn">
                  Обновить пароль
                </button>
                <UiMessage
                  id="password-message"
                  view="text"
                  :content="passwordMessageParams.content"
                  :type="passwordMessageParams.type"
                  :show="passwordMessageParams.show"
                />
              </div>
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
    @media screen and (max-width: 667px) {
      padding-left: 10px;
      padding-right: 10px;
    }
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

  &__footer {
    align-items: center;
    @media screen and (max-width: 667px) {
      flex-direction: column;
    }
  }

  &__content-item {
    @media screen and (max-width: 667px) {
      flex-direction: column;
      align-items: flex-start !important;
    }
  }
}
</style>
