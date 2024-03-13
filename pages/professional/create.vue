<template>
  <div>
    <div class="container-centered m-auto">
      <h1 class="user-title mb-5">Создать проф пробу</h1>
      {{}}
      <div class="relative">
        <form @submit.prevent="submit" class="user-form mt-5">
          <FormUploadImage @change="uploadImage" />
          <input
            v-model="form.title"
            placeholder="Название"
            type="text"
            class="field mt-3"
          />
          <input
            v-model="form.category_uuid"
            placeholder="Категория"
            type="text"
            class="field mt-3"
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
  </div>
</template>

<script lang="ts" setup>
import api from "~/api";

definePageMeta({
  layout: "empty",
});
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
  console.log(res2);
  if (avatar.value) {
    const formData = new FormData();
    formData.append("image", avatar.value);
    formData.append("professional_trial_uuid", res2.uuid);
    const res = await api.profession.uploadImage(formData);
  }
};
const uploadImage = (e) => {
  avatar.value = e.target.files[0];
};
const categories = ref([]);
onMounted(async () => {
  // await api.profession.createCategory({ title: "Программирование" });
  // await api.profession.allCategories();

  const res = await api.profession.allCategories();
  categories.value = res;
});
</script>

<style scoped lang="scss"></style>
