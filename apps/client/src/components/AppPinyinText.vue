<template>
  <div class="pinyin-text">
    <o-tooltip
      :label="toneNumber.toString()"
      position="bottom"
    >
      {{ props.pinyin }}
    </o-tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

import getPinyin from '@/composables/getPinyin';

interface Props {
  pinyin: string;
}

const props = defineProps<Props>();

const { toneNumber } = getPinyin(props.pinyin);
</script>

<style scoped>
</style>
