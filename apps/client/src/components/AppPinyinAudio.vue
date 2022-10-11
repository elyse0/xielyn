<template>
  <div class="pinyin-audio">
    <vue-plyr>
      <audio
        controls
        playsinline
      >
        <source
          :src="props.url"
          type="audio/mp3"
        >
      </audio>
    </vue-plyr>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  url: string
}

const props = defineProps<Props>();
</script>

<style scoped>
div.pinyin-audio {
  width: 300px;
}
</style>
