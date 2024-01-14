<script setup>
import { ref, defineProps, watch, onMounted } from "vue";

/**
 * View - дизайн плашки (text - просто текст, toaster - попап в виде плашки)
 * Position - relative (обычное расположение), top-right (в правом верхнем углу), top-left, bottom-right, bottom-left
 * Type - success, danger, info
 * Width - full (во весь экран - 100%), content (по ширине содержимого)
 * Content - текст или верстка, основной контент или сообщение
 * */

const props = defineProps({
  view: {
    type: String,
    default: "text",
    required: false,
  },
  position: {
    type: String,
    default: "relative",
    required: false,
  },
  type: {
    type: String,
    default: "info",
    required: false,
  },
  width: {
    type: String,
    default: "content",
    required: false,
  },
  show: {
    type: Boolean,
    default: false,
    required: false,
  },
  content: {
    type: String,
    required: true,
  },
});

const showMessage = ref(false);

onMounted(() => {
  watch(
    () => props.show,
    (newVal) => {
      if (newVal) {
        showMessage.value = true;

        // Устанавливаем значение show в false через 2 секунды
        setTimeout(() => {
          showMessage.value = false;
        }, 3000);
      }
    }
  );
});
</script>

<template>
  <Transition>
    <div
      v-if="showMessage"
      class="message"
      :class="`${view} ${position} ${type} ${width}`"
      v-html="content"
    />
  </Transition>
</template>

<style lang="scss" scoped>
.text {
  font-size: 16px;
  font-weight: 600;
}
.text.success {
  color: #39a12c;
}
.text.danger {
  color: #d40c0c;
}
.text.info {
  color: #604d9e;
}
.toaster {
  border-radius: 8px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 25px;
  padding-left: 25px;
  font-size: 16px;
  font-weight: 500;
}
.toaster.success {
  background-color: #39a12c;
  color: #fff;
}
.toaster.danger {
  background-color: #d40c0c;
  color: #fff;
}
.toaster.info {
  background-color: #604d9e;
  color: #fff;
}
.top-right {
  position: absolute;
  top: 20px;
  right: 20px;
}
.top-left {
  position: absolute;
  top: 20px;
  left: 20px;
}
.bottom-right {
  position: absolute;
  bottom: 20px;
  right: 20px;
}
.bottom-left {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
.full {
  width: 100vw;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
