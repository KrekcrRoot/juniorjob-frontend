<script setup>
import { ref, onMounted } from 'vue';
import api from '~/api';
import { useUserStore } from '~/store/user';
import { useCitiesStore } from '~/store/cities';

const userStore = useUserStore();
const citiesStore = useCitiesStore();
const dropdownVisible = ref(false);
const selectedCity = ref(null);

const form = ref({
    email: '',
    password: '',
    city_uuid: ''
})

const formErrors = ref([])

const submit = async () => {
    const response = await api.auth.register(form.value)
    if(response.data.access_token) {
        userStore.access_token = response.data.access_token
    }
    if(response.data.refresh_token) {
        userStore.refresh_token = response.data.refresh_token
    }
    userStore.fetchUser()
    // response.then(
    //     (res) => {
    //        if(res.data.access_token) {
    //         userStore.access_token = res.data.access_token
    //        } 
    //        if(res.data.refresh_token) {
    //         userStore.refresh_token = res.data.refresh_token
    //        }
           
    //     }
    // )
}

const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
};

const closeDropdown = (event) => {
  // Проверяем, был ли клик внутри кастомного селекта
  const isClickInside = event.target.closest('.custom-select') !== null;

  // Закрываем выпадающий список, если клик был вне его
  if (!isClickInside) {
    dropdownVisible.value = false;
  }
};

const selectCity = (city) => {
    selectedCity.value = city;
    form.value.city_uuid = city.uuid
    dropdownVisible.value = false;
    
};

onMounted(() => {
    citiesStore.fetchCities()
    document.addEventListener('click', closeDropdown);
})
</script>
<template>
    <div class="container-centered">
        <h1 class="user-title">Регистрация</h1>
        <form @submit.prevent="submit" class="user-form mt-5">
            <FormUploadImage @change="uploadImage" />
            <input placeholder="Фамилия" type="text" class="field mt-3">
            <input placeholder="Имя" type="text" class="field mt-3">
            <input placeholder="Отчество" type="text" class="field mt-3">
            <input v-model="form.email" placeholder="Email" type="text" class="field mt-3">
            <input v-model="form.password" placeholder="Пароль" type="password" class="field mt-3">
            <input placeholder="Дата рождения" type="date" class="field mt-3">
            <div class="field custom-field mt-6" @click.stop="toggleDropdown">
                <img class="custom-field__arrow" src="@/assets/images/icons/arrow-down.svg">
                <div v-if="selectedCity === null" class="custom-field__placeholder">
                    Город
                </div>
                <div v-else class="custom-field__selected-option">
                    {{ selectedCity.title }}
                </div>
                <div v-show="dropdownVisible" class="custom-field__options">
                    <div class="custom-field__option" v-for="city in citiesStore.cities" :key="city.uuid" @click.stop="selectCity(city)">
                        {{ city.title }}
                    </div>
                </div>
            </div>
           
            <input placeholder="ИНН" type="text" class="field mt-3">
            <FormMultiSelect class="mt-3" />
            <textarea placeholder="Обо мне" class="field mt-3"></textarea>
            <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
        </form>
        <div class="mt-3 pb-12">
            <p class="ask-text">Уже зарегистрированы? <NuxtLink to="/login" class="ask-text__link">Войти</NuxtLink>
            </p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.user-form {
    max-width: 313px;
}

.container-centered {
    justify-content: flex-start;
}

.ask-text {
    color: #604D9E;
    text-align: center;
    font-family: 'Source Sans Pro';
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    &__link {
        color: #2C1B47;
        font-family: 'Source Sans Pro';
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-decoration-line: underline;
        cursor: pointer;
    }
}

.custom-field {
    position: relative;

    &__placeholder {
        margin-top: 0;
        padding-top: 0;
        color: #AAA2D8;
        font-family: 'Source Sans Pro';
        font-size: 20px;
        font-weight: 300;
    }

    &__selected-option {
        width: 100%;
    }

    &__arrow {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
    }
    &__options {
        width: 100%;
        position: absolute;
        top: 100%;
        overflow: hidden;
        left: 0;
        z-index: 100;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        border-radius: 15px;
        max-height: 200px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }
    &__option {
        padding: 10px;
        &:hover {
            cursor: pointer;
            background: #AAA2D8;
        }
    }
}</style>