<template>
  <div class="pinyin-translation">
    <AppTranslationItem
      v-for="(translationItem) in props.translations"
      :key="translationItem.language"
      :translation-item="translationItem"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { TranslationItem } from '@/types/translation';

import AppTranslationItem from '@/components/AppTranslationItem.vue';

interface Props {
  translations: TranslationItem[]
}

const props = defineProps<Props>();

</script>

<style scoped>
div.pinyin-translation {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
}
div.pinyin-translation > div {
  flex: 1;
}
</style>
