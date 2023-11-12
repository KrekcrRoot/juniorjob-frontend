
import type { RouterLink } from 'vue-router';
<script setup>
const props = defineProps({
  article: {
    type: Object,
    default: {},
    required: true,
  },
});
</script>

<template>
  <div class="mb-6">
    <RouterLink to="/" class="article">
     <div class="article__image">
        <img :src="article.photo" alt="">
     </div>
     <p class="article__title">{{ article.title }}</p>
    </RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.article {
    &__image {
        aspect-ratio: 16/6;
        width: 100%;
        max-height: 250px;
        border-radius: 20px;
        overflow: hidden;
        margin-bottom: 10px;
        @media (max-width: 420px) {
        }
        & img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: top;
        }
    }
    &__title {
        color: #604D9E;
        font-size: 23px;
        font-weight: 400;
        line-height: 20px;
        @media (max-width: 420px) {
          font-size: 16px;
        }
    }
}
</style>