<script setup>
import { ref } from 'vue';
import api from '~/api';
import translationService from '~/services/translationService';
import { useUserStore } from '~/store/user';

const selectedRole = ref('corporate');
const userStore = useUserStore();

const switchRole = (value) => {
    selectedRole.value = value
}

const formCorporate = ref({
    email: '',
    password: '',
    city_uuid: '',
    role: 'legal_entity',
    userData: {
        name: '',
        inn: '',
        contact: '',
        summary: ''
    }
})

const formIndividual = ref({
    email: '',
    password: '',
    city_uuid: '',
    role: 'individual',
    userData: {
        surname: '',
        name: '',
        patronymic: '',
        summary: ''
    }
})

const formErrors = ref([])

const submit = async (form) => {
    try {
        formErrors.value = []
        const response = await api.auth.register(form);

        if(response.data.access_token) {
            userStore.access_token = response.data.access_token

            
        }
        if(response.data.refresh_token) {
            userStore.refresh_token = response.data.refresh_token
        }

        
        await userStore.setRole(form.role)
        const currentRole = userStore.payload.role;
        const updateResponse = await api.roles[currentRole](userStore.currentRoleId, form.userData)
        userStore.user.userData = updateResponse.data
        
    }
    catch (error) {
        if(error.response) {
            if(error.response.data && error.response.data.message) {
                formErrors.value = error.response.data.message;
                if(Array.isArray(formErrors.value)) {
                    formErrors.value = formErrors.value.map((error) => {
                    return translationService.translateError(error, 'ru')
                })
                }
                else {
                    formErrors.value = [translationService.translateError(formErrors.value, 'ru')]
                }
                
            }
        } else if(error.request) {
            formErrors.value = ["Ошибка отправки формы"];
        }
        else {
            formErrors.value = ["Ошибка отправки формы. Временные работы на сайте"]; 
        }
    }
}
</script>
<template>
    <div class="container-centered m-auto">
        <h1 class="user-title mb-5">Регистрация</h1>
        <div class="relative">
            <UiSwitcher :selectedValue="selectedRole" @update="switchRole" />
            <div class="textblock" v-if="selectedRole === 'corporate'">
                Оставьте заявку на регистрацию, мы рассмотрим ее в ручном режиме и поможем настроить работу индивидуально
            </div>
            <template v-if="selectedRole === 'corporate'">
                <form @submit.prevent="submit(formCorporate)" class="mt-5">
                    <FormUploadImage @change="uploadImage" />
                    <input v-model="formCorporate.userData.name" placeholder="Название" type="text" class="field mt-3">
                    <input v-model="formCorporate.userData.inn" placeholder="ИНН" type="text" class="field mt-3">
                    <textarea v-model="formCorporate.userData.contact" placeholder="Контактная информация" class="field mt-3"></textarea>
                    <input v-model="formCorporate.email" placeholder="Рабочий Email" type="email" class="field mt-3">
                    <input v-model="formCorporate.password" placeholder="Пароль" type="password" class="field mt-3">
                    <FormSelect v-model="formCorporate.city_uuid" />
                    <textarea v-model="formCorporate.userData.summary" placeholder="Какая помощь необходима" class="field mt-3"></textarea>
                    <template v-if="formErrors">
                        <div class="py-4">
                          <p class="error-message text-center" v-for="formError in formErrors">
                            {{ formError }}
                          </p>
                        </div>
                      </template>
                    <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
                </form>
            </template>
            <template v-else>
                <form @submit.prevent="submit(formIndividual)" class="mt-5">
                    <FormUploadImage @change="uploadImage" />
                    <input v-model="formIndividual.userData.surname" placeholder="Фамилия" type="text" class="field mt-3">
                    <input v-model="formIndividual.userData.name" placeholder="Имя" type="text" class="field mt-3">
                    <input v-model="formIndividual.userData.patronymic" placeholder="Отчество" type="text" class="field mt-3">
                    <input v-model="formIndividual.email" placeholder="Email" type="text" class="field mt-3">
                    <input v-model="formIndividual.password" placeholder="Пароль" type="password" class="field mt-3">
                    <FormSelect v-model="formIndividual.city_uuid" />
                    
                    <textarea v-model="formIndividual.userData.summary" placeholder="Какая помощь необходима" class="field mt-3"></textarea>
                    <template v-if="formErrors">
                        <div class="py-4">
                          <p class="error-message text-center" v-for="formError in formErrors">
                            {{ formError }}
                          </p>
                        </div>
                      </template>
                    <button type="submit" class="btn w-full mt-3">Зарегистрироваться</button>
                </form>
            </template>
            <div class="mt-3 pb-12">
                <p class="ask-text">Уже зарегистрированы? <NuxtLink to="/login" class="ask-text__link">Войти</NuxtLink>
                </p>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.container-centered {
    max-width: 313px;
    justify-content: flex-start;
}

.textblock {
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 20px;
    margin-top: 0;
    min-width: 350px;

    @media (max-width: 979px) {
        position: relative;
        min-width: 100%;
        top: unset;
        left: unset;
        margin-left: 0;
        margin-top: 20px;
    }
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
}</style>