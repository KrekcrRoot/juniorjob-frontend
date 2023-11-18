import ApiModule from "~/api/ApiModule";

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: ApiModule,
        }
    }
})