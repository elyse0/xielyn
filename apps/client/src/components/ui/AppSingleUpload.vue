<template>
  <div class="app-single-upload">
    <button class="upload-button">
      Hello there
    </button>
    <input
      type="file"
      @change="onFileChange"
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Object as () => File | null,
    default: null,
    required: false
  }
})

let fileUpload: File | null = null

const onFileChange = (event: InputEvent) => {
  if (!event.target) {
    return
  }
  const inputEvent = event.target as HTMLInputElement
  if (!inputEvent.files) {
    return
  }

  fileUpload = inputEvent.files[0]
  console.log(fileUpload)
  emit('update:modelValue', fileUpload)
}

onMounted(() => {
  fileUpload = props.modelValue;
})
</script>

<style scoped>
button.upload-button {
  background-color: #00c4a7;
  border-color: #00c4a7;
  border-width: 1px;
  color: white;
}
</style>
