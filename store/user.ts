import {defineStore} from "pinia";

export const useUserStore = defineStore('user', {
    state() {
        return {
            access_token: '',
            refresh_token: '',
        }
    },
    persist: true,
})