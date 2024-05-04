<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "default",
});

const textSearch = ref(null);
const searchQuery = ref("");
const router = useRouter();
const search = () => {
  router.push(`/search/${searchQuery.value}`);
};
// const socket = io("wss://socket.junior-job.ru", {
//   query: {
//     user_uuid: "78dce235-cc1a-48ca-89d7-0faf47e7d867",
//   },
//   extraHeaders: {
//     authorization:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjNjMDI5YjktZTFiMy00OWFiLWFhZGEtOTM1NWQwZjU2NzdjIiwiZW1haWwiOiJtb2RlckBiay5ydSIsInJvbGUiOiJtb2RlcmF0b3IiLCJpYXQiOjE3MTExMjYzODUsImV4cCI6MTcxMTEyNzI4NX0.PjruxXvzJqLl6rpmUKOyLLhLKtejTM-b986Sj9tlqnU",
//   },
//   transports: ["websocket"],
// });

// socket.on("connect", () => {
//   console.log("Connected to server");
// });

// socket.on("disconnect", (reason) => {
//   console.log(`Disconnected: ${reason}`);
// });

// socket.on("error", (error) => {
//   console.error(`Connection error: ${error}`);
// });

// const onClick = () => {
//   socket.emit(
//     "message",
//     JSON.stringify({
//       body: "message",
//     })
//   );
// };
</script>

<template>
  <div class="container mx-auto xl:mt-14 px-5">
    <!-- <div class="grid xl:grid-cols-2 sm:grid-cols-1 xl:gap-20">
      <div>
        <div class="xl:mt-12 mt-4">
          <VacancyList />
        </div>
        <div class="xl:mt-12 mt-4">
          <ProfessionList />
        </div>
      </div>
      <div>
        <div class="xl:mt-12">
          <ArticlesList />
        </div>
      </div>
    </div> -->
    <div class="flex flex-col">
      <!-- <VacancyList class="block" />
      <ProfessionTrialsView class="block" />
      <ArticlesList class="block" /> -->
      <div class="banner">
        <div>
          <h1 class="banner__title">
            Хотите работать, но не знаете, куда устроиться?
          </h1>
          <h2 class="banner__title--purple">Мы поможем!</h2>
          <p class="banner__text">
            Наш сайт предлагает молодым людям и подросткам уникальную
            возможность найти работу своей мечты
          </p>
          <div class="search-main flex items-center gap-2 mt-3">
            <input
              placeholder="Найти вакансию или исполнителя"
              type="text"
              class="banner__field"
              v-model="searchQuery"
            />
            <button @click="search" class="banner__btn btn">Найти</button>
          </div>
         
        </div>
        <div>
          <img src="@/assets/images/banner.png" alt="" />
        </div>
      </div>
      <div class="about">
        <h3 class="about__title">
          Мы предлагаем вакансии в различных сферах деятельности: от работы в
          кафе и ресторанах до фриланса и удаленной работы
        </h3>
        <p class="banner__text">Вы можете выбрать удобный график и условия работы, которые подойдут именно вам</p>
        <CategoryList />
      </div>
      <h1 class="title-main">
        Как найти работу на нашем сайте
      </h1>
      <div class="steps">
        <div class="steps__item">
          <img width="50" height="50" src="@/assets/images/1.svg" alt="">
          <p class="steps__item-title">Зарегистрируйтесь</p>
          <img src="@/assets/images/find-job1.png" alt="">
          <p class="text-center">Зарегистрируйтесь и войдите в личный кабинет</p>
        </div>
        <div class="steps__item">
          <img width="50" height="50" src="@/assets/images/2.svg" alt="">
          <p class="steps__item-title">Найдите вакансию</p>
          <img src="@/assets/images/find-job2.png" alt="">
          <p class="text-center">Нажмите на категорию и выберите подходящую вакансию</p>
        </div>
        <div class="steps__item">
          <img width="50" height="50" src="@/assets/images/3.svg" alt="">
          <p class="steps__item-title">Нажмите “Откликнуться”</p>
          <img src="@/assets/images/find-job3.png" alt="">
          <p class="text-center">Откройте вакансию, нажмите “Откликнуться” и напишите немного о ваших навыках</p>
        </div>
      </div>
      <h1 class="title-main">
        Новые вакансии
      </h1>
      <VacancyList class="block" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.block {
  margin-top: 25px;
  margin-bottom: 25px !important;
}
.banner {
  display: flex;
  position: relative;
  width: 100%;
  padding-bottom: 50px;
  padding-top: 50px;
  @media screen and (max-width:500px) {
    flex-direction: column;
  }
  &__decor {
    position: absolute;
    top: 20px;
    left: 10px;
  }
  &__title {
    font-weight: 600;
    font-size: 40px;
    color: #2c1b47;
    line-height: 40px;
    margin-bottom: 25px;
    @media screen and (max-width:500px) {
      font-size: 28px;
      font-weight: 600;
      line-height: 30px;
    }
  }
  &__title--purple {
    font-weight: 600;
    font-size: 40px;
    line-height: 150%;
    color: #7152d7;
    @media screen and (max-width: 500px) {
      font-size: 28px;
    }
  }
  &__text {
    font-weight: 500;
    font-size: 20px;
    max-width: 518px;
    color: #000;
    line-height: normal;
    @media screen and (max-width:500px) {
      font-size: 14px;
    }
  }
  &__field {
    padding: 10px 25px;
    width: 463px;
    border-radius: 8px;
    border: 1px solid #5453882c;
    &::placeholder {
      font-weight: 500;
      font-size: 15px;
      line-height: 300%;
      color: #676767;
    }
    @media screen and (max-width:500px) {
      width: auto;
    }
  }
  &__btn {
    padding: 8px 20px;
    border-radius: 10px;
  }
  &__link {
    font-weight: 600;
    font-size: 16px;
    line-height: 122%;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: #755eff;
    margin-top: 10px;
  }
}
.about {
  &__title {
    max-width: 588px;
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    margin-bottom: 20px;
    color: #2c1b47;
    @media screen and (max-width:500px) {
      font-size: 16px;
      line-height: 16px;
    }
  }
}

.title-main {
  font-weight: 600;
  font-size: 40px;
  color: #000;
  margin-top: 80px;
  @media screen and (max-width:500px) {
    font-size: 20px;
    margin-top: 20px;
  }
}
.steps {
  margin-top: 60px;
  display: flex;
  
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
  @media screen and (max-width: 500px) {
    margin-top: 20px;
    flex-direction: column;
  }
}
.steps__item {
  width: calc(33% - 16px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  &-title {
    font-weight: 600;
    text-align: center;
    font-size: 24px;
    color: #000;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
}
.search-main {
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
}
</style>
