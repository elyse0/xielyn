<template>
  <AppCard style="height: 360px; margin: 5px">
    <template
      v-if="props.vocabularyItem.imageUrl"
      #media-left
    >
      <AppImage
        :src="props.vocabularyItem.imageUrl"
        alt="image"
      />
    </template>

    <template #media-content>
      <AppPinyinText
        class="has-text-centered"
        :pinyin="props.vocabularyItem.pinyin"
      />

      <AppHanziView :hanzi="props.vocabularyItem.hanzi" />

      <AppPinyinTranslation :translations="props.vocabularyItem.translations" />

      <AppPinyinAudio
        v-if="props.vocabularyItem.audioUrl"
        :url="props.vocabularyItem.audioUrl"
      />
    </template>
  </AppCard>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import { VocabularyItem } from '@/types/vocabulary';

import AppCard from '@/components/ui/AppCard.vue';
import AppImage from '@/components/ui/AppImage.vue';
import AppHanziView from '@/components/AppHanziView.vue';
import AppPinyinText from '@/components/AppPinyinText.vue';
import AppPinyinAudio from '@/components/AppPinyinAudio.vue';
import AppPinyinTranslation from '@/components/AppPinyinTranslation.vue';

interface Props {
  vocabularyItem: VocabularyItem;
}

const props = defineProps<Props>();
</script>

<style scoped>
div.media-left > img {
  max-height: 300px;
  max-width: 220px;
  min-height: 220px;
  min-width: 220px;
}
</style>
