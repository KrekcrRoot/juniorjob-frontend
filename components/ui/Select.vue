<template>
    <div class="field custom-select" @click.stop="toggleDropdown">
      <img class="custom-select__arrow" src="@/assets/images/icons/arrow-down.svg" />
      <div v-if="!selectedItem" class="custom-select__placeholder">{{ title }}</div>
      <div v-else class="custom-select__selected-option">{{ selectedItem.title }}</div>
      <div v-show="dropdownVisible" class="custom-select__options">
        <div
          class="custom-select__option"
          v-for="item in items"
          :key="item.uuid"
          @click.stop="selectItem(item)"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, defineProps, defineEmits } from "vue";
  
  const props = defineProps({
    modelValue: { type: Object, default: () => ({}) },
    items: { type: Array, default: () => [] },
    title: { type: String, default: "Выберите значение" }
  });
  const emit = defineEmits(["update:modelValue"]);
  const dropdownVisible = ref(false);
  const selectedItem = ref(null);
  
  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };
  
  const closeDropdown = (event) => {
    const isClickInside = event.target.closest(".custom-select") !== null;
    if (!isClickInside) {
      dropdownVisible.value = false;
    }
  };
  
  const selectItem = (item) => {
    selectedItem.value = item;
    emit("update:modelValue", item.uuid);
    dropdownVisible.value = false;
  };
  
  onMounted(() => {
    document.addEventListener("click", closeDropdown);
  });
  
  </script>
  
  <style scoped lang="scss">
  .custom-select {
    position: relative;
    margin-top: 20px;

&__placeholder {
  margin-top: 0;
  padding-top: 0;
  color: #aaa2d8;
  font-family: "Source Sans Pro";
  font-size: 20px;
  font-weight: 300;
}

&__selected-option {
  width: 100%;
}

&__arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
&__options {
  width: 100%;
  position: absolute;
  top: 100%;
  overflow: hidden;
  left: 0;
  z-index: 400;
  background-color: #ffffff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
  border-radius: 15px;
  max-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
&__option {
  padding: 10px;
  &:hover {
    cursor: pointer;
    background: #aaa2d8;
  }
}
  }
  </style>