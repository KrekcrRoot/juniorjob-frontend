<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "~/store/user";
import api from "~/api";
const route = useRoute();

const items = ref([])

const role = ref("");

onMounted(async () => {
    const userStore = useUserStore();
    if (
      userStore.roles.current === "legal_entity" ||
      userStore.roles.current === "individual"
    ) {
      role.value = "employer"
      items.value = await api.roles.searchApplicant({
        query: route.params.query,
      });
    } else {
      role.value = "user"
      items.value = await api.vacancies.search({ query: route.params.query });
    }
});
</script>

<template>
  <div class="container mx-auto xl:mt-14 px-5" v-if="useUserStore()">
    <template v-if="role = 'employer'">
      <SearchApplicant v-for="(item, key) in items" :item="item" :key="key" />
    </template>
    <template v-else>
      <SearchVacancy v-for="(item, key) in items" :item="item" :key="key" />
    </template>
      
  </div>
</template>

<style scoped></style>