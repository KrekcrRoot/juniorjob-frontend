import { defineStore } from "pinia";
import api from "~/api";

export const useVacanciesStore = defineStore('vacancies', {
    state() {
        return {
            vacancies: {},
            vacanciesUser: {}
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

        },

        async delete(data: any) {
            try {
                await api.vacancies.delete(data)
                this.getMyVacancies()
                this.fetchVacancies()
                
            } catch(error) {
                console.log(error)
            }
        },
        async getMyVacancies() {
            const response = await api.vacancies.my()
            this.vacanciesUser = response
    
        },
        async getWithFilter(data: any) {
            try {
                const res = await api.vacancies.all(data)
                return res
            } catch (error) {
                return error
            }   
        }
    },
    persist: true,
})