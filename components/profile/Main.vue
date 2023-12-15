<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "~/store/user";
import { useRoute, useRouter } from "vue-router";
import api from "~/api";

const route = useRoute();
const userStore = useUserStore();

const user = ref({});

onMounted(() => {
  if (route?.params?.id) {
    const response = api.users.getById(route?.params?.id);
    response.then((res) => {
      user.value = res;
    });
  }
});
</script>

<template>
  <ProfileApplicantExternal :user="user" v-if="user.role.current === 'applicant'" />
  <ProfileEmployerExternal :user="user" v-else />
</template>

<style lang="scss" scoped>
</style>