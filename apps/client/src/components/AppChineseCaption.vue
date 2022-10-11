<template>
  <div class="chinese-captions">
    <div class="chinese-text">
      <AppChineseCaptionSegment
        v-for="(segment, index) in props.chinese"
        :key="index"
        :segment="segment"
        :is-highlighted="isIndexHighlighted(index)"
        @mouseover="onMouseOverSegment(index)"
        @mouseleave="onMouseLeaveSegment"
      />
    </div>

    <div class="pinyin-text">
      <AppChineseCaptionSegment
        v-for="(segment, index) in props.pinyin"
        :key="index"
        :segment="segment"
        :is-highlighted="isIndexHighlighted(index)"
        @mouseover="onMouseOverSegment(index)"
        @mouseleave="onMouseLeaveSegment"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

import AppChineseCaptionSegment from '@/components/AppChineseCaptionSegment.vue';

const currentIndex = ref(-1);

const props = defineProps({
  chinese: {
    type: Array as () => Array<string>,
    default: () => [''],
  },
  pinyin: {
    type: Array as () => Array<string>,
    default: () => [''],
  },
});

const isIndexHighlighted = (index: number): boolean => {
  if (currentIndex.value === -1) {
    return false;
  }

  return currentIndex.value === index;
};

const onMouseOverSegment = (index: number): void => {
  currentIndex.value = index;
};

const onMouseLeaveSegment = (): void => {
  currentIndex.value = -1;
};

</script>

<style scoped>
div.pinyin-text > div.caption-segment {
  padding: 3px;
}
</style>
