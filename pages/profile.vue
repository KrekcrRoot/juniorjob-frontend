<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

const user = ref({})

const loading = ref(true)

onMounted(() => {
    user.value = userStore.user
    loading.value = false
})
</script>

<template>
    <div>
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <template v-else>
            Hello, {{ user.email }}
        </template>

    </div>
</template>


<style lang="scss" scoped>

</style>