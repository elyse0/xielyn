<template>
  <img
    v-lazy="props.src"
    :alt="alt"
  >
</template>

<script setup lang="ts">
const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
  },
});
</script>

<style scoped>

</style>
