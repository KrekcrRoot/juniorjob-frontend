<script setup>
  import { ref, defineEmits } from 'vue';
  
  const options = [
    { label: 'Публичные выступления', value: '1' },
    { label: 'Python', value: '2' },
    { label: 'Видеосъемка', value: '3' },
    { label: 'Общение с животными', value: '4' },
  ];
  
  const emit = defineEmits([['modelValue']]);
  const selectedItems = ref([]);
  const isOpen = ref(false);
  
  const toggleOption = (option) => {
    if (isSelected(option)) {
      removeTag(option);
    } else {
      selectedItems.value.push(option);
    }
    emit('update:modelValue', JSON.stringify(selectedItems.value));
  };
  
  const isSelected = (option) => selectedItems.value.some((item) => item.value === option.value);
  
  const removeTag = (tag) => {
    selectedItems.value = selectedItems.value.filter((item) => item.value !== tag.value);
  };
  
  const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
  };
  
  // Закрывать выпадающий список при клике вне компонента
  document.addEventListener('click', (event) => {
    const targetElement = event.target;
    const isInside = targetElement.closest('.custom-multi-select');
    if (!isInside) {
      isOpen.value = false;
    }
  });
  </script>
<template>
    <div class="relative">
        <div @click.prevent.stop="toggleDropdown" class="field field--multi-select custom-milti-select-top relative flex items-center justify-between">
            <p>Компетенции</p>
            <img src="@/assets/images/icons/arrow-down.svg">
        </div>
        <div class="custom-multi-select">
            <div class="select-container">
                <div v-if="isOpen" class="options">
                  <div
                  class="options__item"
                    v-for="option in options"
                    :key="option.value"
                    @click="toggleOption(option)"
                    :class="{ 'selected': isSelected(option) }"
                  >
                    {{ option.label }}
                  </div>
                </div>
              </div>
          <div class="selected-tags">
            <div v-for="item in selectedItems" :key="item.value" class="tag">
              {{ item.label }}
              <span @click="removeTag(item)" class="tag-remove">×</span>
            </div>
          </div>
        </div>
    </div>

  </template>

  
  <style lang="scss" scoped>
  .custom-milti-select-top {
    position: relative;
    z-index: 100;
    margin-bottom: 8px;
  }
  .custom-multi-select {
    width: 100%;
    z-index: 99;
    display: block;
  
    .selected-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
    }
  
    .tag {
      background-color: #604D9E;
      color: #ffffff;
      padding: 4px 8px;
      margin: 4px;
      border-radius: 15px;
      display: flex;
      align-items: center;
  
      .tag-remove {
        margin-left: 4px;
        cursor: pointer;
      }
    }
  
    .select-container {
      position: relative;
      cursor: pointer;
  
      .options {
        overflow: hidden;
        width: 100%;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 100;
        background-color: #ffffff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        border: 1px solid #ddd;
        border-radius: 15px;
        max-height: 200px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 4px;
  
        .selected {
          font-weight: bold;
          color: #604D9E;
          &::after {
            content: '';
            width: 24px;
            height: 24px;
            position: absolute;
            top: 50%;
            right: 20px;
            transform: translateY(-50%);
            display: block;
            opacity: 1;
            background-image: url(@/assets/images/icons/check-dark-purple.svg);
            background-position: center;
            background-size: contain;
            transition: 0.5s;
        }
        }

        &__item {
            position: relative;
            padding: 8px 10px;

            transition: 0.5s;
            &::after {
                content: '';
                width: 24px;
                height: 24px;
                position: absolute;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                display: block;
                opacity: 0;
                background-image: url(@/assets/images/icons/check.svg);
                background-position: center;
                background-size: contain;
                transition: 0.5s;
            }
            &:hover {
                background-color: #d2cafeaa;
                &::after {
                    opacity: 1;
                }
            }
        }
      }
    }
  }
  </style>
  