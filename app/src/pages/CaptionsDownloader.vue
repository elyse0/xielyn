<template>
  <AppLayout>
    <div class="caption-downloader">
      Caption downloader

      <div class="hanzi">
        English
        <AppSingleUpload
          v-model="jsonFiles.en"
          @update:modelValue="onEnglishJsonFileUpdate"
        />
      </div>

      <div class="hanzi">
        Hanzi
        <AppSingleUpload
          v-model="jsonFiles.hanzi"
          @update:modelValue="onHanziJsonFileUpdate"
        />
      </div>

      <div class="pinyin-file">
        Pinyin
        <AppSingleUpload
          v-model="jsonFiles.pinyin"
          @update:modelValue="onPinyinJsonFileUpdate"
        />
      </div>

      <o-button @click="onClick" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppSingleUpload from '@/components/ui/AppSingleUpload.vue'

import { getMergedVideoCaptions } from '@xielyng/caption-merger'

import { createJsonDownload, getContentAsString } from '@/util/files'

const jsonFiles = reactive<{ en: File | null, hanzi: File | null, pinyin: File | null }>({
  en: null,
  hanzi: null,
  pinyin: null
})

const onEnglishJsonFileUpdate = (newFile: File | null) => {
  jsonFiles.en = newFile
}

const onHanziJsonFileUpdate = (newFile: File | null) => {
  jsonFiles.hanzi = newFile
}

const onPinyinJsonFileUpdate = (newFile: File | null) => {
  jsonFiles.pinyin = newFile
}

const onClick = async () => {
  if (!jsonFiles.en || !jsonFiles.hanzi || !jsonFiles.pinyin) {
    console.log('There is no file')
    return
  }

  const englishJsonFile = await getContentAsString(jsonFiles.en)
  const hanziJsonFile = await getContentAsString(jsonFiles.hanzi)
  const pinyinJsonFile = await getContentAsString(jsonFiles.pinyin)
  if (!englishJsonFile || !hanziJsonFile || !pinyinJsonFile) {
    return
  }

  createJsonDownload(getMergedVideoCaptions([
    JSON.parse(englishJsonFile),
    JSON.parse(hanziJsonFile),
    JSON.parse(pinyinJsonFile)
  ]), 'captions.json')
}

</script>

<style scoped>

</style>
