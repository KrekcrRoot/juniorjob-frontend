<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/store/user';
if(process.client) {
    const loading = ref(true)
    const userStore = useUserStore();

    onMounted(() => {
    user.value = userStore.user
    loading.value = false
})
}

const user = ref({})

</script>

<template>
    <div>
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <template v-else>
            <ProfileEmployerInner />
            <!-- <ProfileApplicant /> -->
            <!-- <p style="margin: 70px; padding: 40px; font-size: 30px;color: black;font-weight: 700;">
                Добро пожаловать, {{ user.email }}
            </p> -->
        </template>

    </div>
</template>


<style lang="scss" scoped>

</style>