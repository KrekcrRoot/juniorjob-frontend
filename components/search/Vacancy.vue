<template>
        <div class="vacancies-list__item">
<div class="flex items-center gap-2">

  <div class="vacancies-list__avatar">
    <img alt="" />
  </div>
  <div>
    <NuxtLink class="vacancies-list__title">
      {{ item.title }}
    </NuxtLink>
    <p class="vacancies-list__text">
      {{ item.place }}
    </p>
    <p class="vacancies-list__text">
      {{ item.time }}
    </p>
  </div>
</div>


</div>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {},
    required: true,
  },
});
</script>
<style lang="scss" scoped>
.vacancies-list {
  &__btn {
    min-width: 270px;

    @media screen and (max-width: 734px) {
      display: none;
    }
  }

  &__item {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;

    &:hover {
      background: #f6f4ff;
    }

    &-review {
      margin-top: 25px;
      margin-bottom: 20px;
      width: 100%;


      &--field {
        min-width: 50%;
        min-height: 70px;
        margin-top: 15px;
      }
    }
  }

  &__avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__title {
    cursor: pointer;
    color: #000;
    font-family: "Marmelad";
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  &__text {
    color: #604d9e;
    font-family: "Source Sans Pro";
    font-size: 20px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
  }
}
</style>