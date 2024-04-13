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
    <NuxtLink :to="`/vacancies/${vacancy.uuid}`" class="vacancy">
      <div class="flex gap-2 item-center">
        <div
          class="vacancy__preview"
          v-if="vacancy.employer.image === 'image.png'"
        >
          <img src="@/assets/images/profile/profile.svg" />
        </div>
        <div class="vacancy__icon" v-else>
          <img
            :src="`${$config.public.baseURL}/storage/users/${vacancy.employer.image}`"
          />
        </div>
        <div>
          <p class="vacancy__title">{{ vacancy.title }}</p>
          <span class="vacancy__date">
            Дата создания:
            {{ new Date(vacancy.created_at).toLocaleDateString("ru") }}
          </span>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex">
          <img src="@/assets/images/icons/gg_sand-clock.svg" alt="" />
          <span class="vacancy__text vacancy__time">
            {{ vacancy.time }}
          </span>
        </div>

        <span class="vacancy__text vacancy__descr">
          {{ vacancy.description }}
        </span>
      </div>
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.vacancy {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: 15px;
  background: #f8f6ff;
  border: 1px solid #d3d0db;
  border-radius: 8px;
  padding: 20px;

  &__title {
    font-family: "Source Sans Pro";
    color: #000;
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 5px;
    line-height: normal;
    text-align: left;
    @media (max-width: 390px) {
      font-size: 17px;
      font-weight: 500;
    }
  }
  &__text {
    color: #604d9e;
    font-size: 16px;
    font-weight: 300;
  }

  &__date {
    color: #0e0d0e;
  }

  &__time {
    color: #727272;
    font-weight: 500;
    font-size: 18px;
  }
  &__descr {
    margin-top: 20px;
  }

  &__icon {
    flex-shrink: 0;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 2px solid #604d9e;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &__preview {
    flex-shrink: 0;
    width: 55px;
    height: 55px;
    border-radius: 50%;
    overflow: hidden;
    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
