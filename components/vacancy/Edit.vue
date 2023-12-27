<template>
    <div class="container-centered">
        <h1 class="user-title">Обновление вакансии</h1>
        <form @submit.prevent="submit" class="mt-5">
            <input v-model="formData.title" placeholder="Название" type="text" class="field mt-3">
            <FormSelectCategory v-model="formData.category_uuid" />
            <input v-model="formData.time" placeholder="Время (например, каждый вторник с 10:00 по 12:00)" type="text" class="field mt-3">
            <input v-model="formData.place" placeholder="Место" type="text" class="field mt-3">
            <textarea v-model="formData.description" placeholder="Описание" type="text" class="field mt-3">

            </textarea>
            <label class="flex items-center checkbox-item mt-3 gap-3">
                <input class="checkbox-item__input" type="checkbox" v-model="formData.required_experience">
                <span class="checkbox-item__check">

                </span>
                <span class="checkbox-item__text">Необходим опыт работы</span>
            </label>
            <label class="flex items-center checkbox-item mt-3 gap-3 mb-3">
                <input class="checkbox-item__input" type="checkbox" v-model="formData.several_applicants">
                <span class="checkbox-item__check">

                </span>
                <span class="checkbox-item__text">Несколько исполнителей</span>
            </label>
            <button type="submit" class="btn w-full mt-3">Изменить</button>
            <template v-if="formErrors">
              <div class="py-4">
                <p class="error-message" v-for="formError in formErrors">
                  {{ formError }}
                </p>
              </div>
            </template>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from "~/api"
import translationService from "~/services/translationService"
import { useRouter, useRoute } from "vue-router";
import { useVacanciesStore } from '~/store/vacancies';

const router = useRouter()
const route = useRoute()

const vacanciesStore = useVacanciesStore()

const formErrors = ref([])
const formData = ref({
    category_uuid: '',
    title: '',
    time: '',
    place: '',
    description: '',
    required_experience: false,
    several_applicants: false
})

const submit = async () => {
    try {
        const res = await api.vacancies.edit(formData.value)
        router.push('/profile')
    } catch(error) {
        if(error.response && error.response.status === 401) {
            submit()
        }
        else if(error.response && error.response.data && error.response.data.message) {
            formErrors.value = error.response.data.message;
            if(Array.isArray(formErrors.value)) {
                const allErrors = formErrors.value.map((error) => {
                    return translationService.translateError(error, 'ru')
                })
                const uniqueErrors = new Set(allErrors)
                formErrors.value = Array.from(uniqueErrors)
            } else {
                formErrors.value = [translationService.translateError(formErrors.value, 'ru')]
            }
            
        } else {
            formErrors.value = ["Ошибка при создании вакансии"];
            console.error('Ошибка при выполнении запроса:', error);
        }
        
    }
    
}

onMounted(() => {
    const response = vacanciesStore.getById(route.params.id)
    response.then((res) => {
        console.log(res)
        formData.value = {
            uuid: res.uuid,
    category_uuid: res.category.uuid,
    title: res.title,
    time: res.time,
    place: res.place,
    description: res.description,
    required_experience: res.required_experience,
    several_applicants: res.several_applicants
}

    })
})

</script>

<style lang="scss" scoped>
.checkbox-item {
    position: relative;
    &__input {
        position: absolute;
        width: 1px;
        height: 1px;
        appearance: none;
        opacity: 0;
    }
    &__check {
        border: 3px solid #545388;
        border-radius: 2px;
        width: 24px;
        height: 24px;
    }
    &__input:checked + &__check {
        background: #545388;
    }
    &__input:checked + &__check::before {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16px;
        height: 19px;
        background-image: url('@/assets/images/icons/check-white.svg');
        background-position: center;
        background-size: cover;
    }
    &__text {
        color: #AAA2D8;
        font-family: 'Source Sans Pro';
        font-size: 25px;
        font-style: normal;
        font-weight: 300;
        line-height: normal;
        user-select: none;
    }
}
</style>