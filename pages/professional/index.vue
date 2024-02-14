<template>
  <div class="professional container mx-auto">
    <h1 class="professional__title">Профессиональные пробы</h1>
    <div class="professional__list">
      <div class="professional__item">
        <div class="professional__item-image">
          <img src="@/assets/images/professional/demo1.jpeg" alt="" />
        </div>
        <div class="professional__item-content">
          <span class="professional__item-tag">IT-Технологии</span>
          <p class="professional__item-title">
            Мастер-класс по программированию
          </p>
          <div class="flex flex-col mt-2">
            <div class="flex items-center gap-2">
              Смоленск, ул. 25 Сентября, 28А
            </div>
            <div class="flex items-center gap-2">12 марта 2024 12:00</div>
          </div>
          <div class="flex flex-col professional__item-buttons">
            <button class="btn-outline professional__item-button">Подробнее</button>
            <button class="btn professional__item-button">Записаться</button>
          </div>
        </div>
      </div>
      <div class="professional__item">
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
            <button class="btn-outline professional__item-button">Подробнее</button>
            <button class="btn professional__item-button">Записаться</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.professional {
  padding-top: 60px;
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
    max-width: calc(33% - 10px);
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
}
</style>
