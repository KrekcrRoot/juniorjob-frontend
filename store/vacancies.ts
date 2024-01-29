import { defineStore } from "pinia";
import api from "~/api";

export const useVacanciesStore = defineStore("vacancies", {
  state() {
    return {
      vacancies: {},
      vacanciesUser: {},
      vacanciesResponses: {},
    };
  },
  actions: {
    async getById(id: string) {
      try {
        const res = await api.vacancies.getById(id);
        return res;
      } catch (error) {
        return error;
      }
    },
    async fetchVacancies() {
      try {
        const response = await api.vacancies.all();
        this.vacancies = response;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchApplicantResponses(id: string) {
      try {
        const response = await api.vacancies.getResponsesApplicant(id);
        this.vacanciesResponses = response;
      } catch (error) {
        console.log(error);
      }
    },
    async delete(data: any) {
      try {
        await api.vacancies.delete(data);
        this.getMyVacancies();
        this.fetchVacancies();
      } catch (error) {
        console.log(error);
      }
    },
    async getMyVacancies() {
      const response = await api.vacancies.my();
      this.vacanciesUser = response;
    },
    async getWithFilter(data: any) {
      try {
        const res = await api.vacancies.all(data);
        return res;
      } catch (error) {
        return error;
      }
    },
    async search(data: any) {
      try {
        const res = await api.vacancies.search(data);
        return res;
      } catch (error) {
        return error;
      }
    },
  },
  persist: true,
});
