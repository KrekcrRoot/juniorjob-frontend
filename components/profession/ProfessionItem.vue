<script setup>
import api from "~/api";
import formatDateService from "~/services/formatDateService";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";
const props = defineProps({
  profession: {
    type: Object,
    default: {},
    required: true,
  },
});
const profs = ref([]);
const myProfs = ref([]);
const isOpen = ref(false);
const isOpen2 = ref(false);
const isOpen3 = ref(false);
function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
function closeModal2() {
  isOpen2.value = false;
}
async function openModal2(uuid) {
  const res = await api.profession.respond(uuid);
  isOpen2.value = true;
  myProfs.value = await api.profession.my();
}
function closeModal3() {
  isOpen3.value = false;
}
function isRegistered(uuid) {
  return myProfs.value.some((prof) => prof.uuid === uuid);
}
async function unregister(uuid) {
  isOpen3.value = true;
  // Здесь должен быть вызов API для удаления записи на мастер-класс
  // Например, это может выглядеть так:
  await api.profession.unregister({ professional_trial_uuid: uuid });
  // Обновите список моих мастер-классов после отписки
  myProfs.value = await api.profession.my();
}
onMounted(async () => {
  if (process.client) {
    profs.value = await api.profession.all();
    myProfs.value = await api.profession.my();
  }
});
</script>

<template>
  <div class="my-5">
    <div class="profession">
      <div class="profession__icon">
        <img
          :src="`${$config.public.baseURL}/storage/professionalTrial/${profession.image}`"
        />
      </div>
      <div class="flex flex-col">
        <p class="profession__title">{{ profession.title }}</p>
        <span class="profession__text">
          {{ profession.short_text }}
        </span>
        <div class="flex items-center gap-2 mt-3">
          <button
            @click="openModal"
            class="btn-outline professional__item-button"
          >
            Подробнее
          </button>

          <template v-if="isRegistered(profession.uuid)">
            <button
              @click="unregister(profession.uuid)"
              class="btn professional__item-button professional__item-button-danger"
            >
              Отменить запись
            </button>
          </template>
          <template v-else>
            <button
              @click="openModal2(profession.uuid)"
              class="btn professional__item-button"
            >
              Записаться
            </button>
          </template>
        </div>
      </div>
    </div>
    <TransitionRoot appear :show="isOpen3" as="template">
      <Dialog as="div" @close="closeModal3" class="modal relative z-10">
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
                  Отмена записи
                </DialogTitle>
                <div class="mt-2">
                  <h1>Запись отменена</h1>
                </div>

                <div class="mt-4 flex gap-1">
                  <div
                    type="button"
                    class="flex-auto cursor-pointer modal__button inline-flex justify-center bg-purple-300 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    @click="closeModal3"
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
                  <h1>{{ profession.title }}</h1>
                  <p class="modal__text text-sm text-black">
                    <b>Адрес: </b>{{ profession?.place }} <br />
                    <b>Время: </b>{{ profession?.time }} <br />
                    <b>Дата: </b
                    >{{ formatDateService.formatDate(profession?.date) }}
                    <br />
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
  </div>
</template>

<style lang="scss" scoped>
.profession {
  display: flex;
  align-items: flex-start;
  gap: 15px;

  &__title {
    font-family: "Source Sans Pro";
    color: #000;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 5px;
    line-height: normal;
    @media (max-width: 390px) {
      font-size: 17px;
      font-weight: 500;
    }
  }
  &__text {
    color: #604d9e;
    font-size: 16px;
    font-weight: 300;
  }

  &__icon {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #a658ff;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
.professional__item-button {
  padding: 6px 8px;
  font-size: 14px;
  border-radius: 5px;
  &-danger {
    background: rgb(255, 56, 56);

    &:hover {
      background: rgb(255, 56, 56);
    }
  }
}
</style>
