<template>
    <div class="switcher">
        <input type="radio" class="switcher__radio" name="role" id="role1" value="corporate" v-model="selectedRole"
            @change="update" />
        <label for="role1" class="switcher__item">
            <p>Юр.лицо</p>
        </label>
        <input type="radio" class="switcher__radio" name="role" id="role2" value="individual" v-model="selectedRole"
            @change="update" />
        <label for="role2" class="switcher__item">
            <p>Физ.лицо</p>
        </label>
        <div class="switcher__toggle">
        </div>
    </div>
</template>
  
<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';

const selectedRole = ref('corporate');

const emit = defineEmits(['update'])

const props = defineProps({
    selectedValue: {
        type: String,
    }
})
const update = () => {
    emit('update', selectedRole.value)
}
watch(props.selectedValue, (newValue) => {
    selectedRole.value = newValue
})
</script>
  
<style lang="scss" scoped>
.switcher {
    position: relative;
    width: 311px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #AAA2D8;
    border-radius: 18px;

    &__item {
        z-index: 5;
        position: relative;
        flex: 1 0 auto;
        padding: 12px;
        color: aliceblue;
        display: flex;
        justify-content: center;
        align-items: center;
        user-select: none;
        cursor: pointer;
    }

    &__toggle {
        position: absolute;
        width: calc(50% - 4px);
        height: calc(100% - 8px);
        background-color: #fff;
        margin-left: 4px;
        margin-right: 4px;
        border-radius: 15px;
        transition: 0.5s;
    }

    &__radio {
        position: absolute;
        width: 1px;
        height: 1px;
        appearance: none;
        opacity: 0;

        &:checked+label.switcher__item {
            color: #AAA2D8;
        }

        &:checked+label.switcher__item+.switcher__toggle {
            transform: translate(100%, 0);
        }
    }
}
</style>