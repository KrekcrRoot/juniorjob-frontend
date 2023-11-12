<script setup>
import { ref } from 'vue';
</script>
<template>
    <div class="container-centered white-bg">
        <h1 class="user-title pb-6">Регистрация</h1>
    
        
            <form class="mt-5">
                <FormUploadImage @change="uploadImage" />
                <input placeholder="Фамилия" type="text" class="field mt-3">
                <input placeholder="Имя" type="text" class="field mt-3">
                <input placeholder="Email" type="text" class="field mt-3">
                <input placeholder="Пароль" type="password" class="field mt-3">
                <input placeholder="Дата рождения" type="date" class="field mt-3">
                <input placeholder="Город" type="text" class="field mt-6">
                <input placeholder="Место учебы" type="text" class="field mt-3">
                <input placeholder="ИНН" type="text" class="field mt-3">
                <input placeholder="Компетенции" type="text" class="field mt-3">
                <textarea placeholder="Обо мне" class="field mt-3"></textarea>
                <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
                <div class="mt-3 mb-12">
                    <p class="ask-text">Уже зарегистрированы? <NuxtLink to="/login" class="ask-text__link">Войти</NuxtLink></p>
                </div>
            </form>
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