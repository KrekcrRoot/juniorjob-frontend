import { defineStore } from "pinia";
import api from "~/api";

export const useVacanciesStore = defineStore('vacancies', {
    state() {
        return {
            vacancies: {}
        }
    },
    actions: {
        getById(id: string) {
            try {
                const res = api.vacancies.getById(id)
                return res
            } catch (error) {
                return error
            }
            
        }
    },
    persist: true,
})