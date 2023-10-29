<script setup>
import workIcon from "@/assets/images/icons/work.svg";
import badgeIcon from "@/assets/images/icons/badge.svg";
import cardIcon from "@/assets/images/icons/add_card.svg";
import starIcon from "@/assets/images/icons/star.svg";
import noteIcon from "@/assets/images/icons/note.svg";
import settingIcon from "@/assets/images/icons/settings.svg";

const menu = [
  {
    title: "Вакансии",
    icon: workIcon,
    link: "/",
  },
  {
    title: "Профессиональные пборы",
    icon: badgeIcon,
    link: "/",
  },
  {
    title: "Кошелек",
    icon: cardIcon,
    link: "/",
  },
  {
    title: "Избранное",
    icon: starIcon,
    link: "/",
  },
  {
    title: "Статьи",
    icon: noteIcon,
    link: "/",
  },
  {
    title: "Настройки",
    icon: settingIcon,
    link: "/",
  },
];
</script>

<template>
  <div>
    <header>
      <div class="xl:container mx-auto px-5">
        <div class="header">
          <NuxtLink to="/" class="logo">
            <img src="@/assets/images/logo.svg" alt="JuniorJob" />
          </NuxtLink>
          <div class="flex items-center gap-5">
            <div class="header__icon">
              <img src="@/assets/images/icons/chat_bubble.svg" alt="Чат" />
            </div>
            <div class="header__icon">
              <img
                src="@/assets/images/icons/notifications.svg"
                alt="Уведомления"
              />
            </div>
            <div class="header__icon">
              <img
                src="@/assets/images/icons/account_circle.svg"
                alt="Профиль"
              />
            </div>
          </div>
        </div>

        <div class="main-menu flex justify-between my-4">
          <RouterLink
            v-for="(menuItem, index) in menu"
            :to="menuItem.link"
            :key="index"
            class="main-menu__link"
          >
            <span class="main-menu__link--icon">
              <img :src="menuItem.icon" />
            </span>
            {{ menuItem.title }}
          </RouterLink>
        </div>
        <div class="grid xl:grid-cols-12 md:grid-cols-1 gap-4">
          <input
            type="text"
            class="header__search col-start-1 col-span-8"
            placeholder="Поиск вакансий"
          />
          <div class="flex items-center gap-4 col-span-2">
            <button class="filter-btn">
              <img src="@/assets/images/icons/filter_alt.svg" alt="" />
              <span> Фильтры </span>
            </button>
            <button class="filter-btn">
              <img src="@/assets/images/icons/sync_alt.svg" alt="" />
              <span> Сортировка </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- main content -->
    <div>
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
@import url("~/assets/css/main.css");

.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 10px;

  &__icon {
    cursor: pointer;
    width: 30px;
    height: 30px;

    & img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__search {
    outline: none;
    width: 100%;
    display: block;
    border-radius: 30px;
    border: 2px solid #604d9e;
    background: #f5f5fb;
    padding-top: 7px;
    padding-bottom: 7px;
    padding-left: 22px;
    &::placeholder {
      color: #aaa2d8;
      font-size: 14px;
      font-weight: 300;
    }
  }
}

.filter-btn {
  border-radius: 20px;
  background: #d9d9d9;
  padding: 12px 20px;
  color: #2c1b47;
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  &__icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
}

.main-menu {
  flex-direction: row;
  &__link {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 18px;
    color: #604d9e;

    &--icon {
      width: 20px;
      height: 20px;
      object-fit: contain;
    }
  }
  @media screen and (max-width: 479px) {
    flex-direction: column;
    align-items: center;
  }
}

.logo {
  height: 50px;
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
