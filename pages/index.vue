<script setup>
import { onMounted } from "vue";
// import { io } from "socket.io-client";

definePageMeta({
  layout: "default",
});

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
          <div class="flex items-center gap-2">
            <input
              placeholder="Найти вакансию"
              type="text"
              class="banner__field"
            />
            <button class="banner__btn btn">Btn</button>
          </div>
          <a href="" class="banner__link">Я ищу сотрудника</a>
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
        <p class="banner__text">34534545355</p>
        <div class="vacancies-items">
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">2</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
          <div class="vacancies-items__item">1</div>
        </div>
      </div>
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
  }
  &__title--purple {
    font-weight: 600;
    font-size: 40px;
    line-height: 150%;
    color: #7152d7;
  }
  &__text {
    font-weight: 500;
    font-size: 20px;
    color: #000;
  }
  &__field {
    padding: 20px 25px;
    width: 463px;
    border-radius: 8px;
    border: 1px solid #5453882c;
    &::placeholder {
      font-weight: 500;
      font-size: 20px;
      line-height: 300%;
      color: #676767;
    }
  }
  &__btn {
    height: 57px;
  }
  &__link {
    font-weight: 600;
    font-size: 20px;
    line-height: 122%;
    text-decoration: underline;
    text-decoration-skip-ink: none;
    color: #755eff;
  }
}
.about {
  &__title {
    font-weight: 600;
    font-size: 28px;
    line-height: 28px;
    color: #2c1b47;
  }
}
.vacancies-items {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  &__item {
    width: calc(25% - 16px);

    border: 1px solid #e6e0ff;
    border-radius: 10px;
    padding: 24px 45px;
    min-width: 304px;
    height: 123px;

    box-shadow: 0 4px 20px 0 rgba(96, 77, 158, 0.08);
    background: #fff;
    display: flex;
    align-items: center;
    gap: 15px;
  }
}
</style>
