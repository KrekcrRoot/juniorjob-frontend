<script setup>
import { ref } from 'vue';
const selectedRole = ref('corporate');

const switchRole = (value) => {
    selectedRole.value = value
}
</script>
<template>
    <div class="container-centered">
        <h1 class="user-title pb-6">Регистрация</h1>
        <UiSwitcher :selectedValue="selectedRole" @update="switchRole" />
        <template v-if="selectedRole === 'corporate'">
            <form class="mt-5">
                <FormUploadImage @change="uploadImage" />
                <input placeholder="Название" type="text" class="field mt-3">
                <input placeholder="ИНН" type="text" class="field mt-3">
                <textarea placeholder="Контактная информация" class="field mt-3"></textarea>
                <input placeholder="Рабочий Email" type="email" class="field mt-3">
                <input placeholder="Пароль" type="password" class="field mt-3">
                <input placeholder="Город" type="text" class="field mt-3">
                <textarea placeholder="Какая помощь необходима" class="field mt-3"></textarea>
                <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
            </form>
        </template>
        <template v-else>
            <form class="mt-5">
                <FormUploadImage @change="uploadImage" />
                <input placeholder="Фамилия" type="text" class="field mt-3">
                <input placeholder="Имя" type="text" class="field mt-3">
                <input placeholder="Email" type="text" class="field mt-3">
                <input placeholder="Пароль" type="password" class="field mt-3">
                <input placeholder="Город" type="text" class="field mt-6">
                <input placeholder="Место учебы" type="text" class="field mt-3">
                <textarea placeholder="Какая помощь необходима" class="field mt-3"></textarea>
                <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
            </form>
        </template>

            <div class="mt-3 mb-12">
                <p class="ask-text">Уже зарегистрированы? <NuxtLink to="/login" class="ask-text__link">Войти</NuxtLink></p>
            </div>
    </div>
</template>

<style lang="scss" scoped>
.container-centered {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
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
</style>