<script setup>
import vacancyLogo from "@/assets/images/profile/review-demo.png";
import vacancyLogo2 from "@/assets/images/profile/profile.svg";
import { useProfessionStore } from "~/store/professional";
const professionList = ref(null);
const loading = ref(true);
if (process.client) {
  const professionStore = useProfessionStore();

  onMounted(async () => {
    const profs = await professionStore.getWithFilter({
      row: 4,
      sortByCreatedAt: "Down",
    });
    professionList.value = profs;
    loading.value = false;
  });
}
</script>

<template>
  <div>
    <h1 class="main-title">Профессиональные пробы</h1>
    <template v-if="loading">
      <UiLoader />
    </template>
    <div v-else class="xl:mt-7 mt-3">
      <ProfessionItem
        v-for="professionItem in professionList"
        :profession="professionItem"
        :key="professionItem.icon"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
