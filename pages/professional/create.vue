<template>
  <div>
    <div class="container-centered m-auto">
      <h1 class="user-title mb-5">Создать проф пробу</h1>
      <div class="relative">
        <form @submit.prevent="submit" class="user-form mt-5">
          <FormUploadImage @change="uploadImage" />
          <input
            v-model="form.title"
            placeholder="Название"
            type="text"
            class="field mt-3"
          />
          <UiSelect
            v-model="form.category_uuid"
            title="Категория"
            :items="categories"
          />
          <input
            v-model="form.date"
            placeholder="Дата проведения"
            type="date"
            class="field mt-3"
          />

          <input
            v-model="form.time"
            placeholder="Время"
            type="text"
            class="field mt-3"
          />
          <input
            v-model="form.place"
            placeholder="Адрес"
            type="text"
            class="field mt-3"
          />
          <button type="submit" class="btn w-full mt-3">Создать</button>
        </form>
      </div>
    </div>

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
                  Проф. проба создана
                </DialogTitle>
                <div class="mt-2">
                  <p class="modal__text text-sm text-gray-500">
                    Ее смогут увидеть пользователи в разделе Профессиональные
                    пробы
                  </p>
                </div>

                <div class="mt-4 flex gap-1">
                  <NuxtLink
                    type="button"
                    class="flex-auto cursor-pointer modal__button inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    to="/professional"
                  >
                    Назад к списку
                  </NuxtLink>
                  <NuxtLink
                    type="button"
                    class="flex-auto cursor-pointer modal__button inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    to="/"
                  >
                    На главную
                  </NuxtLink>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script lang="ts" setup>
import api from "~/api";
import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/vue";

const isOpen = ref(false);

definePageMeta({
  layout: "empty",
});

const formData = new FormData();
const avatar = ref(null);

const form = ref({
  title: "",
  date: "",
  time: "",
  place: "",
  category_uuid: "",
});
const submit = async () => {
  const res2 = await api.profession.create(form.value);
  form.value.title = "";
  form.value.date = "";
  form.value.time = "";
  form.value.place = "";
  form.value.category_uuid = "";
  if (avatar.value) {
    const formData = new FormData();
    formData.append("professional_trial_uuid", res2.uuid);
    formData.append("image", avatar.value);
    const res = await api.profession.uploadImage(formData);
  }
  openModal();
};
const uploadImage = (e) => {
  avatar.value = e.target.files[0];
};

const handleImageUpload = () => {
  console.log("Файл был загружен успешно");
};
const categories = ref([]);
onMounted(async () => {
  const res = await api.profession.allCategories();
  categories.value = res;
});

function closeModal() {
  isOpen.value = false;
}
function openModal() {
  isOpen.value = true;
}
</script>

<style scoped lang="scss">
.modal {
  &__title {
    font-size: 24px;
    text-align: center;
    color: #aaa2d8;
    font-weight: 600;
  }
  &__text {
    font-size: 18px;
    color: #100d20;
    margin-top: 20px;
    text-align: center;
  }
  &__button {
    border-radius: 5px;
    background-color: #ddd9f3;
    color: #2e19a5;
    padding: 10px 25px;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
