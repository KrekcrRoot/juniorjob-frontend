<script setup>
import logo from "@/assets/images/logo.svg";

</script>

<template>
    <header class="xl:container mx-auto">
        <div class="header-inner py-7">
            <div class="flex gap-5 items-center">
                <UiButton />
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
