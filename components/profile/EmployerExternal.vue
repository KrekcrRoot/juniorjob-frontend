<script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue';
    import { useUserStore } from '~/store/user';
    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const isScreenSmall = ref(window.innerWidth <= 490);

    const handleResize = () => {
      isScreenSmall.value = window.innerWidth <= 490;
    };

    const user = ref()

    onMounted(() => {
        window.addEventListener('resize', handleResize);
        const result = userStore.getUserById(route.params.id)
        result.then(res => {
            console.log(res)
        })
        user.value = result
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });
</script>

<template>
    <div class="xl:container mx-auto">
        <div class="profile profile-mobile-main relative mt-10">
            <!-- АВАТАР И ИМЯ СОИСКАТЕЛЯ НА МОБИЛКЕ -->
            <template v-if="isScreenSmall">
                <div class="profile-mobile-wrapper">
                    <div class="profile-mobile profile__image">
                        <img v-if="(userStore.user.image && userStore.user.image === 'image.png') || !userStore.user.image" src="@/assets/images/profile/profile.svg" alt="profile">
                        <img v-else :src="`${$config.public.baseURL}${userStore.user.image}`" alt="">
                    </div>
                    <p class="profile-mobile profile__name">
                                {{ userStore.user.userData.name }} {{ userStore.user.userData.surname }}
                            </p>
                            <button class="mt-5">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_1506_1906" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="20" height="20">
                                        <rect width="20" height="20" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_1506_1906)">
                                        <path
                                            d="M4.16667 15.8334H5.33333L12.5208 8.64591L11.3542 7.47925L4.16667 14.6667V15.8334ZM16.0833 7.43758L12.5417 3.93758L13.7083 2.77091C14.0278 2.45147 14.4201 2.29175 14.8854 2.29175C15.3507 2.29175 15.7431 2.45147 16.0625 2.77091L17.2292 3.93758C17.5486 4.25703 17.7153 4.64244 17.7292 5.09383C17.7431 5.54522 17.5903 5.93064 17.2708 6.25008L16.0833 7.43758ZM14.875 8.66675L6.04167 17.5001H2.5V13.9584L11.3333 5.12508L14.875 8.66675Z"
                                            fill="#604D9E" />
                                    </g>
                                </svg>
                            </button>
                </div>

            </template>
            <!-- АВАТАР И ИМЯ СОИСКАТЕЛЯ НА ПК -->
            <template v-else>
                <div class="profile__left">
                <div class="flex gap-3">
                    <div class="profile__image">
                        <img v-if="(userStore.user.image && userStore.user.image === 'image.png') || !userStore.user.image" src="@/assets/images/profile/profile.svg" alt="profile">
                        <img v-else :src="`${$config.public.baseURL}${userStore.user.image}`" alt="">
                    </div>
                    <div class="w-full">
                        <!-- Имя -->
                        <div class="w-full flex justify-between">
                            <p class="profile__name">
                                {{ userStore.user.userData.name }} {{ userStore.user.userData.surname }}
                            </p>
                            <a>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_1506_1906" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0"
                                        y="0" width="20" height="20">
                                        <rect width="20" height="20" fill="#D9D9D9" />
                                    </mask>
                                    <g mask="url(#mask0_1506_1906)">
                                        <path
                                            d="M4.16667 15.8334H5.33333L12.5208 8.64591L11.3542 7.47925L4.16667 14.6667V15.8334ZM16.0833 7.43758L12.5417 3.93758L13.7083 2.77091C14.0278 2.45147 14.4201 2.29175 14.8854 2.29175C15.3507 2.29175 15.7431 2.45147 16.0625 2.77091L17.2292 3.93758C17.5486 4.25703 17.7153 4.64244 17.7292 5.09383C17.7431 5.54522 17.5903 5.93064 17.2708 6.25008L16.0833 7.43758ZM14.875 8.66675L6.04167 17.5001H2.5V13.9584L11.3333 5.12508L14.875 8.66675Z"
                                            fill="#604D9E" />
                                    </g>
                                </svg>
                            </a>
                        </div>
                    
                       
                    </div>
                </div>
            </div>
            </template>

           
        </div>
    </div>
</template>

<style lang="scss" scoped>
.profile-mobile.profile__image {
    width: 150px;
    height: 150px;
    transform: translate(0, -50%);
}
.profile-mobile-wrapper {
    position: relative;
    display: flex;
    align-items: flex-start;
    max-height: 100px;
}

.profile-mobile.profile__name {
    font-size: 35px;
}

.profile-mobile-main {
    @media screen and (max-width:500px) {
        position: absolute;
        top: 0;
        margin-top: 0;
        padding-top: 0;
        gap: 10px;
    }
}
.profile-mobile-info {
    font-size: 26px;
}

.profile-about-mobile {
    @media screen and (max-width: 500px) {
        padding-left: 20px;
        padding-right: 20px;
    }
}
</style>