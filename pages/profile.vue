<script setup>
import { ref, onMounted } from 'vue';
import { useUserStore } from '~/store/user';
if(process.client) {
    const loading = ref(true)
    const userStore = useUserStore();

    onMounted(async () => {
  user.value = userStore.$state.user;
  loading.value = false;
});
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
            <template v-if="user.role">
                <template v-if="user.role.current === 'applicant'">
                    <ProfileApplicant :user="user"  />
                </template>
                <template v-else>
                    <ProfileEmployerInner :user="user"  />
                </template>
            </template>
            

            <!-- <p style="margin: 70px; padding: 40px; font-size: 30px;color: black;font-weight: 700;">
                Добро пожаловать, {{ user.email }}
            </p> -->
        </template>

    </div>
</template>


<style lang="scss" scoped>

</style>