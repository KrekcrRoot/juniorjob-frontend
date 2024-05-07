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

  <NuxtLink :to="`/vacancies/${vacancy.uuid}`" class="vacancies-items__item">
    <div class="flex items-center gap-4">
      <div class="vacancy__preview" v-if="vacancy.employer.image === 'image.png'">
        <img src="@/assets/images/profile/profile.svg" />
      </div>
      <div class="vacancies-items__image" v-else>
        <img :src="`${$config.public.baseURL}/storage/users/${vacancy.employer.image}`" />
      </div>
      <div>
        <p class="vacancy__title">{{ vacancy.title }}</p>
        <span class="vacancy__date">
          Дата создания:
          {{ new Date(vacancy.created_at).toLocaleDateString("ru") }}
        </span>
      </div>
    </div>
    <div class="flex mt-2">
      <img width="24" height="24" src="@/assets/images/icons/gg_sand-clock.svg" alt="" />
      <span class="vacancy__text vacancy__time">
        {{ vacancy.time }}
      </span>
    </div>
  </NuxtLink>

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
    margin-bottom: 0px;
    line-height: normal;
    text-align: left;

    @media (max-width: 390px) {
      font-size: 17px;
      font-weight: 500;
    }
  }

  &__text {
    color: #604d9e;
    font-size: 12px;
    font-weight: 300;
  }

  &__date {
    color: #604d9e;
    font-weight: 700;
    font-size: 12px;
  }

  &__time {
    color: #604d9e;
    font-weight: 700;
    font-size: 16px;
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

.vacancies-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;

  &__item {
    width: calc(25% - 8px);
flex-direction: column;
    border: 1px solid #e6e0ff;
    border-radius: 10px;
    padding: 15px;
    max-width: 304px;
    width: 100%;
    box-shadow: 0 4px 20px 0 rgba(96, 77, 158, 0.08);
    background: #fff;
    display: flex;
    gap: 15px;
  }

  &__image {
    width: 55px;
    height: 55px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 122%;
    color: #000;
  }
}
</style>
