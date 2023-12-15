import { defineStore } from "pinia";
import api from "~/api";

export const useVacanciesStore = defineStore('vacancies', {
    state() {
        return {
            vacancies: []
        }
    },
    actions: {
        async getById(id: string) {
            try {
                const res = await api.vacancies.getById(id)
                return res
            } catch (error) {
                return error
            }   
        },
        async fetchVacancies() {
            try {
                const response = await api.vacancies.all()
                this.vacancies = response
            } catch(error) {
                console.log(error)
            }

        }
    },
    persist: true,
})