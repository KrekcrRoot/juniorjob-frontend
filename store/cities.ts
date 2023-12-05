import { defineStore } from "pinia";
import api from "~/api";

export const useCitiesStore = defineStore('cities', {
    state() {
        return {
            cities: []
        }
    },
    actions: {
        fetchCities() {
            const response = api.cities.all()
            response.then(
                (res) => {
                    this.cities = res
                }
            )
        }
    }
})