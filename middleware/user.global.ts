import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to) => {
    if(process.client) {
        const userStore = useUserStore()

        if(to?.name === 'user-employer-id' || to?.name === 'user-id') {
            if (userStore.user.uuid && userStore.user.uuid !== "" && userStore.user.uuid === to?.params?.id) {
            abortNavigation();
            return navigateTo('/profile');
            }
        }

    }
})