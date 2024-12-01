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

import { getMergedVideoCaptions } from '@sophire/caption-merger'

import SophireApiService from '@/services/SophireApiService'

import { getHanziPinyinCaptions } from '@sophire/hanzi-pinyin-captions';

const videoId = ref<string | null>(null)
const availableSubtitles = ref<string[] | null>(null)

const downloadMergedCaptions = async () => {
    if (!videoId.value) {
        return
    }

    const availableYoutubeCaptions = await SophireApiService.getAvailableYoutubeCaptions(videoId.value)
    if (availableYoutubeCaptions.err) {
        return
    }

    const englishCaptionsResult = await SophireApiService.getYoutubeCaptions(videoId.value, 'en')
    if (englishCaptionsResult.err) {
        return
    }
    const hanziCaptionsResult = await SophireApiService.getYoutubeCaptions(videoId.value, 'zh-Hans')
    if (hanziCaptionsResult.err) {
        return
    }
    const englishCaptions = englishCaptionsResult.val
    const hanziCaptions = hanziCaptionsResult.val

    const hanziPinyinCaptions = getHanziPinyinCaptions(hanziCaptions)
    const mergedVideoCaptions = getMergedVideoCaptions([englishCaptions, ...hanziPinyinCaptions])

    createJsonDownload(mergedVideoCaptions, `subtitles-${videoId.value}.json`)
}

const onClick = async () => {
    await downloadMergedCaptions()
}
</script>

<style scoped>

</style>
