<template>
  <div class="professional container mx-auto">
    <template v-if="userStore.roles && userStore.roles.current === 'moderator'">
      <div class="professional__add">
        <NuxtLink class="btn" to="/professional/create"> Добавить </NuxtLink>
      </div>
    </template>
    <h1 class="professional__title">Профессиональные пробы</h1>

    <div class="professional__list">
      <div v-for="prof in profs" :key="prof.uuid" class="professional__item">
        <div class="professional__item-image">
          <img
            :src="`${$config.public.baseURL}/storage/professionalTrial/${prof.image}`"
          />
        </div>
        <div class="professional__item-content">
          <span class="professional__item-tag">{{ prof.category.title }}</span>
          <p class="professional__item-title">
            {{ prof.title }}
          </p>
          <div class="flex flex-col mt-2">
            <div class="flex items-center gap-2">
              {{ prof.place }}
            </div>
            <div class="flex items-center gap-2">
              {{ formatDateService.formatDate(prof.date) }} &nbsp;&nbsp;
              {{ prof.time }}
            </div>
          </div>
          <template
            v-if="userStore.roles && userStore.roles.current === 'moderator'"
          >
            <div class="flex flex-row gap-1 items-center">
              <button class="btn-outline professional__item-button">
                Подробнее
              </button>
              <div class="professional__delete" @click="deleteProf(prof.uuid)">
                <img src="@/assets/images/icons/trash.svg" />
              </div>
            </div>
          </template>
          <template v-else>
            <div class="flex flex-col professional__item-buttons">
              <button class="btn-outline professional__item-button">
                Подробнее
              </button>
              <button class="btn professional__item-button">Записаться</button>
            </div>
          </template>
        </div>
      </div>
      <!-- <div class="professional__item">
        <div class="professional__item-image">
          <img src="@/assets/images/professional/demo2.jpeg" alt="" />
        </div>
        <div class="professional__item-content">
          <span class="professional__item-tag">Творчество</span>
          <p class="professional__item-title">
            Открытый урок по творческим профессиям
          </p>
          <div class="flex flex-col mt-2">
            <div class="flex items-center gap-2">
              Смоленск, ул. Румянцева, 8
            </div>
            <div class="flex items-center gap-2">23 марта 2024 в 16:00</div>
          </div>
          <div class="flex flex-col professional__item-buttons">
            <button class="btn-outline professional__item-button">
              Подробнее
            </button>
            <button class="btn professional__item-button">Записаться</button>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import api from "~/api";
import formatDateService from "~/services/formatDateService";
import { useUserStore } from "~/store/user";
const profs = ref([]);
let userStore = ref({
  roles: {
    current: "guest",
  },
});
const deleteProf = async (uuid: string) => {
  await api.profession.delete({
    professional_trial_uuid: uuid,
  });
  profs.value = await api.profession.all();
};
onMounted(async () => {
  if (process.client) {
    userStore.value = useUserStore();
    profs.value = await api.profession.all();
  }
});
</script>

<style scoped lang="scss">
.professional {
  padding-top: 60px;
  padding-bottom: 140px;
  &__title {
    font-weight: 600;
    font-size: 30px;
    line-height: 67%;
    color: #2c1b47;
    margin-bottom: 28px;
    @media screen and (max-width: 678px) {
      font-size: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
  &__delete {
    width: 51px;
    height: 51px;
  }
  &__list {
    margin-top: 40px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    @media screen and (max-width: 678px) {
      flex-direction: column;
    }
  }
  &__item {
    min-width: 300px;
    background: #f9f9ff;
    box-shadow: 0 4px 21px 0 rgba(47, 32, 70, 0.2);
    overflow: hidden;
    border-radius: 16px;
    @media screen and (max-width: 678px) {
      max-width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
    &-image {
      width: 100%;
      height: 230px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
    &-content {
      display: flex;
      flex-direction: column;
      padding: 5px 20px 20px 20px;
    }
    &-tag {
      font-weight: 800;
      font-size: 12px;
      line-height: 279%;
      color: #2c1b47;
    }
    &-title {
      font-weight: 700;
      font-size: 16px;
      line-height: 153%;
      color: #000;
    }
    &-text {
      font-weight: 400;
      font-size: 13px;
      line-height: 150%;
      color: #000;
    }
    &-buttons {
      margin-top: 25px;
      flex-direction: column;
      gap: 10px;
    }
    &-button {
      width: 100%;
    }
  }
  &__add {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
  }
}
</style>
