import { defineStore } from "pinia";
import api from "~/api";

export const useProfessionStore = defineStore("professionals", {
  state() {
    return {
      professionalsCategories: {},
    };
  },
  actions: {
    async fetchCategories() {
      const response = await api.profession.allCategories();
      this.professionalsCategories = response.data;
    },
    async categoriesList() {
      await this.fetchCategories();
      return this.professionalsCategories;
    },
    async getWithFilter(data: any) {
      try {
        const res = await api.profession.all(data);
        return res;
      } catch (error) {
        return error;
      }
    },
  },
  persist: true,
});
