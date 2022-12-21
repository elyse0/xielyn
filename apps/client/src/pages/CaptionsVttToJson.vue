<template>
  <AppLayout>
    <div class="caption-vtt-to-s">
      Caption Vtt To Json

      <div class="upload-file">
        Upload file
        <AppSingleUpload
          v-model="vttFile"
          @update:modelValue="onVttFileUpdate"
        />
      </div>

      <o-button @click="onClick" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { vttToJson } from '@xielyng/vtt-to-json'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppSingleUpload from '@/components/ui/AppSingleUpload.vue'

import { createJsonDownload, getContentAsString } from '@/util/files'

const vttFile = ref<File | null>(null)

const onVttFileUpdate = (newFile: File | null) => {
  vttFile.value = newFile
}

const onClick = async () => {
  if (!vttFile.value) {
    console.log('There is no file')
    return
  }

  const vttFileContents = await getContentAsString(vttFile.value)
  if (!vttFileContents) {
    console.log('Could not read file contents')
    return
  }

  const jsonFile = vttToJson(vttFileContents)
  if (jsonFile.err) {
    console.log(jsonFile.val.message)
    return
  }

  createJsonDownload(jsonFile.val, 'captions.json')
}

</script>

<style scoped>

</style>
