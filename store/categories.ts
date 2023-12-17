import { defineStore } from "pinia";
import api from "~/api";

export const useCategoriesStore = defineStore('category', {
    state() {
        return {
            categories: {}
        }
    },
    actions: {
        async fetchCategories() {
            const response = await api.categories.all()
            this.categories = response
        }
    },
    persist: true,
})