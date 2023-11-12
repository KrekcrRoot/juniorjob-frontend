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
    <div class="white-bg w-full h-full flex items-center justify-center">
      <VueSpinner size="20" color="red" />
    </div>
  </template>
  <!-- Экран выбора роли -->
  <template v-else>
    <UserRegisterWelcome />
  </template>
</template>
  
<style scoped></style>