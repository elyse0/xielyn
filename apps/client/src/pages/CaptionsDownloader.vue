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

import { getMergedVideoCaptions } from '@xielyng/caption-merger'

import XielyngApiService from '@/services/XielyngApiService'

const videoId = ref<string | null>(null)
const availableSubtitles = ref<string[] | null>(null)

const downloadMergedCaptions = async () => {
  if (!videoId.value) {
    return
  }

  const availableYoutubeCaptions = await XielyngApiService.getAvailableYoutubeCaptions(videoId.value)
  if (availableYoutubeCaptions.err) {
    return
  }

  const englishCaptionsResult = await XielyngApiService.getYoutubeCaptions(videoId.value, 'en')
  if (englishCaptionsResult.err) {
    return
  }
  const hanziCaptionsResult = await XielyngApiService.getYoutubeCaptions(videoId.value, 'zh-Hans')
  if (hanziCaptionsResult.err) {
    return
  }
  const englishCaptions = englishCaptionsResult.val
  const hanziCaptions = hanziCaptionsResult.val

  const hanziPinyinCaptionsResult = await XielyngApiService.getHanziPinyinCaptions(hanziCaptions)
  if (hanziPinyinCaptionsResult.err) {
    return
  }

  const hanziPinyinCaptions = hanziPinyinCaptionsResult.val
  const mergedVideoCaptions = getMergedVideoCaptions([englishCaptions, ...hanziPinyinCaptions])

  createJsonDownload(mergedVideoCaptions, 'merged-captions.json')
}

const onClick = async () => {
  await downloadMergedCaptions()
}
</script>

<style scoped>

</style>
