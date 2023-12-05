<script setup>
    import { ref, onMounted } from 'vue';
    import { useUserStore } from '~/store/user';
    import { useRouter, useRoute } from 'vue-router';
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    onMounted(() => {
        userStore.getUserById(route.params.id)
    })
</script>

<template>
    <div>

    </div>
</template>

<style lang="scss" scoped>

</style>