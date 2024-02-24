<template>
  <div>
    <button @click="openModal">Open Modal</button>
    <UiModal
      :is-open="modalOpen"
      @close="modalOpen = false"
      title="Custom Modal Title"
    >
      <p>Here goes your custom content!</p>
      <button @click="customAction">Custom Action</button>
    </UiModal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalOpen: false,
    };
  },
  methods: {
    openModal() {
      this.modalOpen = true;
    },
    customAction() {
      console.log("Performing custom action...");
    },
  },
};
</script>
