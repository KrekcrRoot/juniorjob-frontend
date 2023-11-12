<script setup>
import { ref, onMounted } from 'vue';
import { VueSpinner } from 'vue3-spinners';
definePageMeta({
  layout: "empty",
});

const employerTypeTab = ref(0)
const loading = ref(true)

onMounted(() => {
loading.value = false
})

</script>
<template>
    <!-- Экран загрузки -->
  <template v-if="loading">
    <div class="w-full h-full flex items-center justify-center">
      <VueSpinner size="20" color="red" />
    </div>
  </template>

  <!-- Формы регистрации -->
  <template v-else>
      <UserEmployerForm />
  </template>
</template>

<style lang="scss" scoped>

</style>