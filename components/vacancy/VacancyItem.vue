<script setup>
const props = defineProps({
  vacancy: {
    type: Object,
    default: {},
    required: true,
  },
});
</script>

<template>
  <div class="my-5">
    <div class="vacancy">
      <div class="vacancy__icon">
        <img :src="vacancy.logo" />
      </div>
      <div class="flex flex-col">
        <p class="vacancy__title">{{ vacancy.title }}</p>
        <span class="vacancy__text">
          {{ vacancy.time }}
        </span>
        <span class="vacancy__text">
          {{ vacancy.short_text }}
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vacancy {
  display: flex;
  align-items: center;
  gap: 15px;

  &__title {
    color: #000;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 5px;
  }
  &__text {
    color: #604d9e;
    font-size: 16px;
    font-weight: 300;
  }

  &__icon {
    width: 50px;
    height: 50px;
    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>