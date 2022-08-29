<template>
  <AppLayout>
    <div class="caption-downloader">
      Captions downloader

      <o-input v-model="videoId" />

      {{ videoId }}
      {{ availableSubtitles }}

      <o-button @click="onClick" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { createJsonDownload } from '@/util/files'
import { ref } from 'vue'

import AppLayout from '@/components/layout/AppLayout.vue'

import { CaptionService } from '@xielyng/caption-service'
import { getMergedVideoCaptions } from '@xielyng/caption-merger'
import { HanziPinyinCaptionsService } from '@xielyng/hanzi-pinyin-captions-service'

const videoId = ref<string | null>(null)
const availableSubtitles = ref<string[] | null>(null)

// eslint-disable-next-line no-unused-vars
const downloadMergedCaptions = async () => {
  if (!videoId.value) {
    return
  }

  const availableYoutubeCaptions = await CaptionService.getAvailableYoutubeCaptions(videoId.value)
  if (availableYoutubeCaptions.err) {
    return
  }

  const englishCaptionsResult = await CaptionService.getYoutubeCaptions(videoId.value, 'en')
  if (englishCaptionsResult.err) {
    return
  }
  const hanziCaptionsResult = await CaptionService.getYoutubeCaptions(videoId.value, 'zh-Hans')
  if (hanziCaptionsResult.err) {
    return
  }
  const englishCaptions = englishCaptionsResult.val
  const hanziCaptions = hanziCaptionsResult.val

  const hanziPinyinCaptionsResult = await HanziPinyinCaptionsService.getHanziPinyinCaptions(hanziCaptions)
  if (hanziPinyinCaptionsResult.err) {
    return
  }

  const hanziPinyinCaptions = hanziPinyinCaptionsResult.val
  const mergedVideoCaptions = getMergedVideoCaptions([englishCaptions, ...hanziPinyinCaptions])

  createJsonDownload(mergedVideoCaptions, 'merged-captions.json')
}

const onClick = async () => {

  await HanziPinyinCaptionsService.getHanziPinyinCaptions({
    captions: [],
    languageId: ''
  })


  // await downloadMergedCaptions()
}
</script>

<style scoped>

</style>
