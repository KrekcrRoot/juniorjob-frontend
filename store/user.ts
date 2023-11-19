import {defineStore} from "pinia";
import api from "~/api";

export const useUserStore = defineStore('user', {
    state() {
        return {
            user: {},
            access_token: '',
            refresh_token: '',
        }
    },
    actions: {
        async fetchUser() {
            const response = await api.users.my()
            console.log(response)

        }
    },
    persist: true,
})