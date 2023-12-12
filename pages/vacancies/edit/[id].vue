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
    <div class="">
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <!-- Формы регистрации -->
        <template v-else>
            <VacancyEdit />
        </template>
    </div>
</template>

<style lang="scss" scoped></style>