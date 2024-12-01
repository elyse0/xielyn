<template>
  <AppLayout>
    <div class="caption-vtt-to-s">
      Subtitles To Json

      <div class="upload-file">
        Hanzi subtitles file (vtt/srt)
        <AppSingleUpload
          v-model="subtitleFiles.hanzi"
          @update:modelValue="onHanziFileUpdate"
        />
      </div>

      <div class="upload-file">
        English subtitles file (vtt/srt)
        <AppSingleUpload
          v-model="subtitleFiles.en"
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

const subtitleFiles = reactive<{ hanzi: File | null, en: File | null }>({
    en: null,
    hanzi: null,
})

const onHanziFileUpdate = (newFile: File | null) => {
    subtitleFiles.hanzi = newFile
}

const onEnglishFileUpdate = (newFile: File | null) => {
    subtitleFiles.en = newFile
}

const onClick = async () => {
    if (!subtitleFiles.hanzi || !subtitleFiles.en) {
        console.log('Files are missing')
        return
    }

    const hanziFileContents = await getContentAsString(subtitleFiles.hanzi)
    if (!hanziFileContents) {
        console.log('Could not read hanzi file contents')
        return
    }

    const hanziJsonFile = subtitlesToJson(hanziFileContents)
    if (hanziJsonFile.err) {
        console.log(hanziJsonFile.val.message)
        return
    }

    const englishFileContents = await getContentAsString(subtitleFiles.en)
    if (!englishFileContents) {
        console.log('Could not read english file contents')
        return
    }

    const englishJsonFile = subtitlesToJson(englishFileContents)
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
