<template>
    <div>
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <template v-else>
            <ProfileMain />
        </template>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
definePageMeta({
    layout: "user",
});
const loading = ref(true)
onMounted(() => {
    loading.value = false
})

</script>

<style lang="scss" scoped>

</style>