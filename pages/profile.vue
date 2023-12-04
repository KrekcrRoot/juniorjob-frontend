<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/store/user';
definePageMeta({
    layout: "user",
});
const user = ref({})
const current = ref('')
if(process.client) {
    const loading = ref(true)
    const userStore = useUserStore();
    current.value = userStore.roles.current

    onMounted(() => {
    user.value = userStore.user
    loading.value = false
})
}



</script>

<template>
    <div>
        <!-- Экран загрузки -->
        <template v-if="loading">
            <UiLoader />
        </template>
        <template v-else>
            <template v-if="current">
                <ProfileApplicant v-if="current === 'applicant'" />
            <ProfileEmployerInner v-else  />
            <!-- <p style="margin: 70px; padding: 40px; font-size: 30px;color: black;font-weight: 700;">
                Добро пожаловать, {{ user.email }}
            </p> -->
            </template>
            
        </template>

    </div>
</template>


<style lang="scss" scoped>

</style>