import ApiModule from "~/api";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: ApiModule,
        }
    }
})