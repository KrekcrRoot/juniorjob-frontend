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

onMounted(async () => {
  if (route?.params?.id) {
    const response = await api.users.getById(route?.params?.id);
    user.value = response;
    const uDataRes = await api.roles.get_user_roles(user.value.uuid)
    user.value["userData"] = uDataRes[uDataRes.current]
    // response.then(async(res) => {
    //   user.value = res;
    //   const uDataRes = await api.roles.get_user_roles(user.value.uuid)
    //   console.log(uDataRes)
    //   uDataRes.then((res) => {
    //     user.value["userData"] = res[res.current]
    //   })
    // });
  }
});
</script>

<template>
    <div>
        {{ user.id }}
    </div>
</template>

<style lang="scss" scoped>
</style>