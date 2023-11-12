<script setup>
import { ref } from 'vue';
import photoIcon from "@/assets/images/icons/photo.svg";
const preview = ref(photoIcon);

const selectedFile = ref(null);

const handleFileChange = (event) => {
  selectedFile.value = event.target.value 
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      preview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};
</script>
<template>
    <label class="image-upload">
      <div v-if="preview" class="image-upload__avatar w-16 h-16 rounded-full overflow-hidden mr-4">
        <img :src="preview" alt="Avatar Preview" class="w-full h-full object-cover" />
      </div>
        <span class="image-upload__caption">Сделайте фото или добавьте его из галереи</span>
      <input @input="handleFileChange"  type="file" accept="image/*" class="hidden" ref="fileInput" />
    </label>
  </template>
  
  <style lang="scss" scoped>
  .image-upload {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &__caption {
        max-width: 190px;
        color: #AAA2D8;
        font-family: 'Source Sans Pro';
        font-size: 20px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
    }
  }
  </style>
  