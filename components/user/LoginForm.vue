<script setup>
import { ref } from 'vue';
</script>
<template>
    <div class="container-centered">
        <h1 class="user-title pb-6">Вход</h1>
    
        
            <form class="mt-5">
                <input placeholder="Email" type="text" class="field mt-3">
                <input placeholder="Пароль" type="password" class="field mt-3">
                <button type="submit" class="btn w-full mt-3">Войти</button>
                <div class="mt-3">
                    <p class="ask-text">Нет аккаунта? <NuxtLink to="/register-welcome" class="ask-text__link">Зарегистрироваться</NuxtLink></p>
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