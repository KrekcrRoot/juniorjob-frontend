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
    title: "Профессиональные пробы",
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

const isMobile = ref(false);
const isBurgerMenuVisible = ref(false);

const checkScreenWidth = () => {
  if (typeof window !== "undefined") {
    isMobile.value = 1 < 979;
  }
};

onMounted(() => {
  if (typeof window !== "undefined") {
    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);
  }
});
</script>

<template>
  <div class="relative">
    <header>
      <div class="header-wrapper xl:container mx-auto px-5">
        <div class="header">
          <button
            @click="isBurgerMenuVisible = true"
            class="burger-menu mobile-show"
          >
            <img src="@/assets/images/icons/menu.svg" alt="" />
          </button>
          <NuxtLink to="/" class="logo">
            <img
              v-if="isMobile"
              src="@/assets/images/logo.svg"
              alt="JuniorJob"
            />
            <img v-else src="@/assets/images/logo-white.svg" alt="JuniorJob" />
          </NuxtLink>
          <div class="mobile-hide flex items-center gap-5">
            <div class="header__icon">
              <img src="@/assets/images/icons/chat_bubble.svg" alt="Чат" />
            </div>
            <div class="header__icon">
              <img
                src="@/assets/images/icons/notifications.svg"
                alt="Уведомления"
              />
            </div>
            <NuxtLink to="/login" class="header__icon">
              <img
                src="@/assets/images/icons/account_circle.svg"
                alt="Профиль"
              />
            </NuxtLink>
          </div>
        </div>

        <div class="mobile-hide main-menu flex justify-between my-4">
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
        <div
          class="header-search-wrapper grid xl:grid-cols-12 md:grid-cols-1 gap-4"
        >
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
    </div>
    <!-- main content -->
    <div class="main-wrapper">
      <slot />
    </div>
    
      <div class="relative">
        <div class="sidebar-backdrop" @click="isBurgerMenuVisible = false" v-if="isBurgerMenuVisible">1</div>
        <transition name="slide">
                <div v-if="isBurgerMenuVisible" @click.stop class="sidebar-panel burger-menu-content">
          <div class="flex-col">
            <div class="flex items-center gap-3">
              <div class="burger-menu-content__icon">
                <img
                  src="@/assets/images/icons/account_circle.svg"
                  alt="Профиль"
                />
              </div>
              <div>
                <NuxtLink to="/register-welcome" class="block bolder-title mb-2">Регистрация</NuxtLink>
                <NuxtLink to="/login" class="block bolder-title">Вход</NuxtLink>
              </div>
            </div>
            <div class="mt-6">
              <RouterLink
                v-for="(menuItem, index) in menu"
                :to="menuItem.link"
                :key="index"
                class="main-menu__link my-3"
              >
                <span class="main-menu__link--icon">
                  <img :src="menuItem.icon" />
                </span>
                {{ menuItem.title }}
              </RouterLink>
            </div>
            <div class="welcome-card mt-4">
              Добро пожаловать в Junior Job! Нужна помощь по использованию или
              разберетесь сами?
              <button class="btn mt-4">Помогите!</button>
            </div>
          </div>
        </div>
        </transition>
  </div>
</template>

<style lang="scss">
@import url("~/assets/css/main.css");

.header-wrapper {
  position: relative;
}
.header-search-wrapper {
  @media (max-width: 979px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: absolute;
    left: 0;
    bottom: calc(-50% + 15px);
    padding-left: 20px;
    padding-right: 20px;
    z-index: 1200;
  }
}
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

  @media (max-width: 979px) {
    padding-top: 40px;
    padding-bottom: 60px;
  }
}

.filter-btn {
  border-radius: 30px;
  background: #d9d9d9;
  padding: 12px 20px;
  color: #2c1b47;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-shrink: 0;
  @media (max-width: 979px) {
    flex: 1 0 auto;
  }

  &__icon {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
}

.burger-menu {
  width: 32px;
  height: 32px;
  -webkit-tap-highlight-color: transparent;

  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &-content {
    position: fixed;
    height: 100%;
    background: #fff;
    width: 300px;
    top: 0;
    left: 0px;
    z-index: 3100;
    box-shadow: 3px 0 10px 3px rgba(0, 0, 0, 0.4);
    padding: 32px;
    &__icon {
      width: 32px;
      height: 32px;
      & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  &-wrapper {
    position: fixed;
    top: 0;
    left: 0px;
    width: 100%;
    height: 100%;
    background: #160d2569;
    z-index: 3000;
    opacity: 1;
    transition: all 0.3s ease-in-out;
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
  @media screen and (max-width: 979px) {
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

.main-wrapper {
  @media (max-width: 979px) {
    position: relative;
    margin-top: -25px;
    padding-top: 100px;
    background: #fff;
    border-top-right-radius: 30px;
    border-top-left-radius: 30px;
    box-shadow: 0px -10px 15px 0px rgba(44, 27, 71, 0.08);
    z-index: 1000;
  }
}

.welcome-card {
  padding: 12px;
  border-radius: 20px;
  border: 2px solid #aaa2d8;
  color: #604d9e;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 110%;
}
/*.slide-enter-from {
  opacity: 0;
  transition: opacity .25s;
}
.slide-enter-active {
  transition: opacity .25s;
}
  .slide-leave-active {
    transition: opacity .25s;
}

.slide-enter, .slide-leave-to {
    transition: opacity .25s;

}
.slide-leave-to {
 opacity: 0;
}*/
.slide-enter-active {
  animation: bounce-in 0.5s;
}
.slide-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: translateX(-300px);
  }
  100% {
    transform: translateX(0);
  }
}

    .sidebar-backdrop {
        background-color: rgba(0,0,0,.5);
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        opacity: 1;
        transition: opacity 0.1s;
        cursor: pointer;
        z-index: 4999;
    }

    .sidebar-panel {
      overflow-y: auto;
      position: fixed;
      left: 0px; /* Изначально сдвигаем меню за пределы экрана */
      top: 0;
      height: 100vh;
      z-index: 5000;
      padding: 3rem 20px 2rem 20px;
      width: 300px;
      transition: .25s; /* Добавляем анимацию сдвига меню */
  }
</style>
