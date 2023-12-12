<script setup>
import { ref, onMounted, defineProps, defineEmits } from "vue";
import { useCitiesStore } from "~/store/cities";

if (process.client) {
  const { modelValue } = defineProps(["modelValue"]);
  const emit = defineEmits([["modelValue"]]);
  const citiesStore = useCitiesStore();
  const dropdownVisible = ref(false);
  const selectedCity = ref(null);

  const toggleDropdown = () => {
    dropdownVisible.value = !dropdownVisible.value;
  };

  const closeDropdown = (event) => {
    // Проверяем, был ли клик внутри кастомного селекта
    const isClickInside = event.target.closest(".custom-select") !== null;

    // Закрываем выпадающий список, если клик был вне его
    if (!isClickInside) {
      dropdownVisible.value = false;
    }
  };

  const selectCity = (city) => {
    selectedCity.value = city;
    emit("update:modelValue", city.uuid);
    dropdownVisible.value = false;
  };

  onMounted(() => {
    citiesStore.fetchCities();
    document.addEventListener("click", closeDropdown);
  });
}
</script>
<template>
  <div class="field custom-field mt-6" @click.stop="toggleDropdown">
    <img
      class="custom-field__arrow"
      src="@/assets/images/icons/arrow-down.svg"
    />
    <div v-if="selectedCity === null" class="custom-field__placeholder">
      Город
    </div>
    <div v-else class="custom-field__selected-option">
      {{ selectedCity.title }}
    </div>
    <div v-show="dropdownVisible" class="custom-field__options">
      <div
        class="custom-field__option"
        v-for="city in citiesStore.cities"
        :key="city.uuid"
        @click.stop="selectCity(city)"
      >
        {{ city.title }}
      </div>
    </div>
  </div>
</template>

  
  <style lang="scss" scoped>
.custom-field {
  position: relative;

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
  