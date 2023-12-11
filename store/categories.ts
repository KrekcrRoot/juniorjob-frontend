import { defineStore } from "pinia";
import api from "~/api";

export const useCategoriesStore = defineStore('category', {
    state() {
        return {
            categories: {}
        }
    },
    actions: {
        fetchCategories() {
            const response = api.categories.all()
            response.then(
                (res) => {
                    this.categories = res
                }
            )
        }
    },
    persist: true,
})