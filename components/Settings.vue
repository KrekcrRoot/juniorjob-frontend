<script setup>
import { ref, onMounted } from 'vue';
import api from '~/api';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';
import textService from '@/services/textService'
import { useVacanciesStore } from '~/store/vacancies';

const vacanciesStore = useVacanciesStore();

const router = useRouter();
const userStore = useUserStore();

const isOpen = ref(false)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
}

onMounted(async() => {

})

</script>
<template>
    <div class="xl:container mx-auto">
        <UiDropdown />
    </div>
</template>

<style lang="scss" scoped>

</style>