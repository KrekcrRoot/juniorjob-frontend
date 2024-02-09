<script setup>
import useRoute from "vue-router";

const route = useRoute();

const items = ref([]);

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div>{{ route.params.query }}</div>
</template>

<style scoped></style>
