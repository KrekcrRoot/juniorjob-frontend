<template>
  <div class="professional container mx-auto">
    <template v-if="userStore.roles && userStore.roles.current === 'moderator'">
      <div class="professional__add">
        <NuxtLink class="btn" to="/professional/create"> Добавить </NuxtLink>
      </div>
    </template>
    <h1 class="professional__title">Профессиональные пробы</h1>

    <div class="professional__list">
      <div v-for="prof in profs" :key="prof.uuid" class="professional__item">
        <TransitionRoot appear :show="isOpen2" as="template">
          <Dialog as="div" @close="closeModal2" class="modal relative z-10">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="modal__title text-lg font-medium leading-6 text-gray-900"
                    >
                      Запись
                    </DialogTitle>
                    <div class="mt-2">
                      <h1>Вы успешно записаны</h1>
                    </div>

                    <div class="mt-4 flex gap-1">
                      <div
                        type="button"
                        class="flex-auto cursor-pointer modal__button inline-flex justify-center bg-purple-300 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="closeModal2"
                      >
                        Закрыть
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
        <TransitionRoot appear :show="isOpen" as="template">
          <Dialog as="div" @close="closeModal" class="modal relative z-10">
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
              <div
                class="flex min-h-full items-center justify-center p-4 text-center"
              >
                <TransitionChild
                  as="template"
                  enter="duration-300 ease-out"
                  enter-from="opacity-0 scale-95"
                  enter-to="opacity-100 scale-100"
                  leave="duration-200 ease-in"
                  leave-from="opacity-100 scale-100"
                  leave-to="opacity-0 scale-95"
                >
                  <DialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
                  >
                    <DialogTitle
                      as="h3"
                      class="modal__title text-lg font-medium leading-6 text-gray-900"
                    >
                      Информация
                    </DialogTitle>
                    <div class="mt-2">
                      <h1>{{ prof.title }}</h1>
                      <p class="modal__text text-sm text-black">
                        <b>Адрес: </b>{{ prof.place }} <br />
                        <b>Время: </b>{{ prof.time }} <br />
                        <b>Дата: </b
                        >{{ formatDateService.formatDate(prof.date) }} <br />
                      </p>
                    </div>

                    <div class="mt-4 flex gap-1">
                      <div
                        type="button"
                        class="flex-auto cursor-pointer modal__button inline-flex justify-center bg-purple-300 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="closeModal"
                      >
                        Закрыть
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </TransitionRoot>
        <div class="professional__item-image">
          <img
            :src="`${$config.public.baseURL}/storage/professionalTrial/${prof.image}`"
          />
        </div>
        <div class="professional__item-content">
          <span class="professional__item-tag">{{ prof.category.title }}</span>
          <p class="professional__item-title">
            {{ prof.title }}
          </p>
          <div class="flex flex-col mt-2">
            <div class="flex items-center gap-2">
              {{ prof.place }}
            </div>
            <div class="flex items-center gap-2">
              {{ formatDateService.formatDate(prof.date) }} &nbsp;&nbsp;
              {{ prof.time }}
            </div>
          </div>
          <template
            v-if="userStore.roles && userStore.roles.current === 'moderator'"
          >
            <div class="flex flex-row gap-1 items-center">
              <button
                @click="openModal"
                class="btn-outline professional__item-button"
              >
                Подробнее
              </button>
              <div class="professional__delete" @click="deleteProf(prof.uuid)">
                <img src="@/assets/images/icons/trash.svg" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col professional__item-buttons">
              <button
                @click="openModal"
                class="btn-outline professional__item-button"
              >
                Подробнее
              </button>
              <button @click="openModal2" class="btn professional__item-button">
                Записаться
              </button>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="professional__item">
        <div class="professional__item-image">
          <img src="@/assets/images/professional/demo2.jpeg" alt="" />
        </div>
        <div class="professional__item-content">
          <span class="professional__item-tag">Творчество</span>
          <p class="professional__item-title">
            Открытый урок по творческим профессиям
          </p>
          <div class="flex flex-col mt-2">
            <div class="flex items-center gap-2">
              Смоленск, ул. Румянцева, 8
            </div>
            <div class="flex items-center gap-2">23 марта 2024 в 16:00</div>
          </div>
          <div class="flex flex-col professional__item-buttons">
            <button class="btn-outline professional__item-button">
              Подробнее
            </button>
            <button class="btn professional__item-button">Записаться</button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const isOpen = ref(false);
const isOpen2 = ref(false);
import { ref, onMounted } from "vue";
import api from "~/api";
import formatDateService from "~/services/formatDateService";
import { useUserStore } from "~/store/user";
const profs = ref([]);
let userStore = ref({
  roles: {
    current: "guest",
  },
});
const deleteProf = async (uuid: string) => {
  await api.profession.delete({
    professional_trial_uuid: uuid,
  });
  profs.value = await api.profession.all();
};
onMounted(async () => {
  if (process.client) {
    userStore.value = useUserStore();
    profs.value = await api.profession.all();
  }
});
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
function closeModal2() {
  isOpen2.value = false;
}
function openModal2() {
  isOpen2.value = true;
}
</script>

<style scoped lang="scss">
.professional {
  padding-top: 60px;
  padding-bottom: 140px;
  &__title {
    font-weight: 600;
    font-size: 30px;
    line-height: 67%;
    color: #2c1b47;
    margin-bottom: 28px;
    @media screen and (max-width: 678px) {
      font-size: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &__delete {
    width: 51px;
    height: 51px;
  }
  &__list {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    @media screen and (max-width: 678px) {
      flex-direction: column;
    }
  }
  &__item {
    min-width: 300px;
    background: #f9f9ff;
    box-shadow: 0 4px 21px 0 rgba(47, 32, 70, 0.2);
    overflow: hidden;
    border-radius: 16px;
    @media screen and (max-width: 678px) {
      max-width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
    &-image {
      width: 100%;
      height: 230px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      padding: 5px 20px 20px 20px;
    }
    &-tag {
      font-weight: 800;
      font-size: 12px;
      line-height: 279%;
      color: #2c1b47;
    }
    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 153%;
      color: #000;
    }
    &-text {
      font-weight: 400;
      font-size: 13px;
      line-height: 150%;
      color: #000;
    }
    &-buttons {
      margin-top: 25px;
      flex-direction: column;
      gap: 10px;
    }
    &-button {
      width: 100%;
    }
  }
  &__add {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
