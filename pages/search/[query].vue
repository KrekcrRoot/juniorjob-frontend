<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/store/user";
import api from "~/api";
const route = useRoute();

onMounted(async () => {
  if (process.client) {
    const userStore = useUserStore();
    if (
      userStore.roles.current === "legal_entity" ||
      userStore.roles.current === "individual"
    ) {
      const res = await api.roles.searchApplicant({
        query: route.params.query,
      });
    } else {
      const res = await api.vacancies.search({ query: route.params.query });
    }
  }
});
</script>

<template>
  <div class="container mx-auto xl:mt-14 px-5">{{ route.params.query }}</div>
</template>

<style scoped></style>
