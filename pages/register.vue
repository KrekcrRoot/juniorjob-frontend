<script setup>
definePageMeta({
  layout: "empty",
});
const userRegisterRole = ref(null);
const employerTypeTab = ref(0)

const setRole = (role) => {
  userRegisterRole.value = role;
};
</script>

<template>
  <!-- Экран выбора роли -->
  <template v-if="!userRegisterRole">
    <UserRegisterWelcome @setrole="setRole" />
  </template>
  <!-- Формы регистрации -->
  <template v-else>
    <template v-if="userRegisterRole === 'applicant'">
        applicant
    </template>
    <template v-if="userRegisterRole === 'employer'">
        employer
    </template>
  </template>
</template>
  
  <style scoped>
</style>