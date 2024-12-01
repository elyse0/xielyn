<template>
  <AppLayout>
    <div class="caption-vtt-to-s">
      Caption Vtt To Json

      <div class="upload-file">
        Upload hanzi vtt
        <AppSingleUpload
          v-model="vttFiles.hanzi"
          @update:modelValue="onHanziFileUpdate"
        />
      </div>

      <div class="upload-file">
        Upload english vtt
        <AppSingleUpload
          v-model="vttFiles.en"
          @update:modelValue="onEnglishFileUpdate"
        />
      </div>

      <o-button @click="onClick" />
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { getMergedVideoCaptions } from '@sophire/caption-merger'
import { reactive } from 'vue'

import { subtitlesToJson } from '@sophire/subtitles-to-json'
import { getHanziPinyinCaptions } from '@sophire/hanzi-pinyin-captions'

import AppLayout from '@/components/layout/AppLayout.vue'
import AppSingleUpload from '@/components/ui/AppSingleUpload.vue'

import { createJsonDownload, getContentAsString } from '@/util/files'

const vttFiles = reactive<{ hanzi: File | null, en: File | null }>({
    en: null,
    hanzi: null,
})

const onHanziFileUpdate = (newFile: File | null) => {
    vttFiles.hanzi = newFile
}

const onEnglishFileUpdate = (newFile: File | null) => {
    vttFiles.en = newFile
}

const onClick = async () => {
    if (!vttFiles.hanzi || !vttFiles.en) {
        console.log('Files are missing')
        return
    }

    const vttHanziFileContents = await getContentAsString(vttFiles.hanzi)
    if (!vttHanziFileContents) {
        console.log('Could not read hanzi file contents')
        return
    }

    const hanziJsonFile = subtitlesToJson(vttHanziFileContents)
    if (hanziJsonFile.err) {
        console.log(hanziJsonFile.val.message)
        return
    }

    const vttEnglishFileContents = await getContentAsString(vttFiles.en)
    if (!vttEnglishFileContents) {
        console.log('Could not read english file contents')
        return
    }

    const englishJsonFile = subtitlesToJson(vttEnglishFileContents)
    if (englishJsonFile.err) {
        console.log(englishJsonFile.val.message)
        return
    }

    const hanziPinyinCaptions = getHanziPinyinCaptions({
        languageId: 'hanzi',
        captions: hanziJsonFile.val,
    })

    const mergedVideoCaptions = getMergedVideoCaptions([
        {languageId: 'en', captions: englishJsonFile.val}, ...hanziPinyinCaptions])

    createJsonDownload(mergedVideoCaptions, `subtitles.json`)
}

</script>

<style scoped>

</style>
