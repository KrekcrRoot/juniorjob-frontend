<script setup>
import { ref } from 'vue';
import api from '~/api';
import { useUserStore } from '~/store/user';
import { useRouter } from 'vue-router';
if(process.client) {
    const router = useRouter();
    const userStore = useUserStore();
}

</script>
<template>
    <div class="xl:container mx-auto">
        <div class="profile mt-10">
            <div class="profile__left">
                <div class="flex gap-3">
<p>sss</p>
<p>qqq</p>
                </div>
            </div>
            <div class="profile__right">
                1
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>