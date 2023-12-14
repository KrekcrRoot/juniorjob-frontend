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
        fetchVacancies() {
            const response = api.vacancies.all()
            response.then(
                (res) => {
                    this.vacancies = res
                }
            )
        }
    },
    persist: true,
})