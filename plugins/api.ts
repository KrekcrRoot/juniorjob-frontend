export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            api: {test: 'test'},
        }
    }
})