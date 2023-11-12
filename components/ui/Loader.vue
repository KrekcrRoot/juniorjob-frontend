<script setup>
    import { VueSpinner } from 'vue3-spinners';
</script>

<template>
    <div class="loader">
        <VueSpinner size="45" color="#AAA2D8" />
    </div>
</template>

<style lang="scss" scoped>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>