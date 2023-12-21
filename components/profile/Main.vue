<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "~/store/user";
import { useRoute, useRouter } from "vue-router";
import api from "~/api";

const route = useRoute();
const userStore = useUserStore();

const user = ref({
  role: {
    current: ''
  }
});

onMounted(() => {
  if (route?.params?.id) {
    const response = api.users.getById(route?.params?.id);
    response.then((res) => {
      user.value = res;
      const uDataRes = api.roles.get_user_roles(user.value.uuid)
      uDataRes.then((res) => {
        user.value["userData"] = res[res.current]
      })
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