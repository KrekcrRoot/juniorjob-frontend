<script setup>
import { ref, onMounted } from 'vue'
// import createApi from "@/api";

// const token = 'ваш-токен'; // Здесь вы можете установить токен

// const api = createApi(token);

// const fetchUserData = async () => {
//   try {
//     const usersData = await api().users().getAll();
//     console.log(usersData);
//   } catch (error) {
//     console.error('Error fetching user data:', error);
//   }
// };

// onMounted(async () => {
//   fetchUserData();
// })
</script>

<template>
        <header class="xl:container mx-auto px-4 xl:px-0">
            <div class="header-inner py-7">
                
                    <UiButtonBackWithLogo />
                      
               
            </div>
        </header>
        <div class="xl:container mx-auto">
            <slot/>
        </div>
</template>

<style lang="scss">
@import url("~/assets/css/main.css");
.logo {
    height: 51px;
    * img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}
</style>
