import { storeToRefs } from "pinia";
import { useUserStore } from "~/store/user";

export default defineNuxtRouteMiddleware((to) => {
    if(process.client) {
        const { access_token } = storeToRefs(useUserStore());

        const isRegisterPage = to.path.startsWith('/register/');

        if(!access_token.value && to?.name === 'profile') {
            abortNavigation();
            return navigateTo('/login');
        }

        if(access_token.value && (isRegisterPage || to?.name === 'register-welcome' || to?.name === 'login')) {
            abortNavigation();
            return navigateTo('/profile')
        }

    }
})