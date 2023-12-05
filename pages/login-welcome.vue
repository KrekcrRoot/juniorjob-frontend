<script setup>
import { ref, onMounted } from 'vue';
import { VueSpinner } from 'vue3-spinners';
definePageMeta({
  layout: "empty",
});
const loading = ref(true)

onMounted(() => {
loading.value = false
})
</script>

<template>
  <!-- Экран загрузки -->
  <template v-if="loading">
    <UiLoader />
  </template>
  <!-- Экран выбора роли -->
  <template v-else>
    <UserLoginWelcome />
  </template>
</template>
  
<style scoped></style>