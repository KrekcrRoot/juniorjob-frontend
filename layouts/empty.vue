<script setup>

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
