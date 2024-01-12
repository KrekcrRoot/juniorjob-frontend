<template>
    <div>
        <!-- Экран загрузки (user) -->
        <template v-if="loading && route.name === 'user-id'">
            <UiLoader />
        </template>
        <template v-else>
            <Settings />
        </template>

    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, onMounted,  onBeforeUnmount } from 'vue';
definePageMeta({
    layout: "user",
});
const loading = ref(true)
const route = useRoute();
const router = useRouter();

watch(() => router.currentRoute, (to, from) => {
  // Сбросить состояние загрузки при обновлении маршрута
  loading.value = false;
});

onMounted(() => {
    loading.value = false
})

onBeforeUnmount(() => {
  // Сбросить состояние загрузки при обновлении маршрута
  loading.value = false;
  
});



</script>

<style lang="scss" scoped>

</style>