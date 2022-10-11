<template>
  <div class="translation-item">
    <div class="country-flag">
      <img
        :src="flagSource"
        alt="France flag"
      >
    </div>
    <div class="translation has-text-centered">
      {{ props.translationItem.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { TranslationItem } from '@/types/translation';

import { getLanguageDefaultCountry } from '@/util/languages';
import { getBaseUrl } from '@/util/env';

interface Props {
  translationItem: TranslationItem
}

const props = defineProps<Props>();

const flagSource = `${getBaseUrl()}/flags/${getLanguageDefaultCountry(props.translationItem.language)}.png`;

</script>

<style scoped>
div.translation-item > div {
  margin: 0 auto;
}
div.country-flag {
  width: 30px;
}
</style>
