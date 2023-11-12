<script setup>
import { ref, onMounted } from 'vue';
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
  <!-- Формы регистрации -->
    <template v-else>
      <UserApplicantForm />
    </template>
</template>

<style lang="scss" scoped>

</style>