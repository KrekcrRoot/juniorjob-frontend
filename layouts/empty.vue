<script setup>
import logo from "@/assets/images/logo.svg";

</script>

<template>
    <header class="xl:container mx-auto">
        <div class="header-inner py-7">
            <div class="flex gap-5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="20" viewBox="0 0 10 20" fill="none">
                    <path d="M8.34235 20L0.459473 10L8.34235 0L9.74157 1.775L3.2579 10L9.74157 18.225L8.34235 20Z" fill="#AAA2D8"/>
                  </svg>
                  <div class="logo">
                    <img :src="logo" alt="">
                  </div>
            </div>
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
