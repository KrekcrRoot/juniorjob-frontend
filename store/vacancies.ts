import { defineStore } from "pinia";
import api from "~/api";

export const useVacanciesStore = defineStore('vacancies', {
    state() {
        return {
            vacancies: {}
        }
    },
    actions: {
        
    },
    persist: true,
})