<template>
    <div class="container-centered">
        <h1 class="user-title">Создание вакансии</h1>
        <form @submit.prevent="submit" class="mt-5">
            <input v-model="formData.title" placeholder="Название" type="text" class="field mt-3">
            <select v-model="formData.category" class="field mt-3">
                <option :value="'1'">Category1</option>
                <option :value="'2'">Category2</option>
                <option :value="'3'">Category3</option>
                <option :value="'4'">Category4</option>
            </select>
            <input v-model="formData.time" placeholder="Время" type="text" class="field mt-3">
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
            <button type="submit" class="btn w-full mt-3">Создать</button>
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

const formErrors = ref([])
const formData = ref({
    category: {},
    title: '',
    time: '',
    place: '',
    description: '',
    required_experience: false,
    several_applicants: false
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