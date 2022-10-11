<template>
  <AppLayout>
    <div class="youtube-video-viewer">
      <AppYoutubePlayer
        v-if="videoId.length"
        :video-id="videoId"
        @timeUpdate="onTimeUpdate"
      />

      <div v-if="youtubeVideo">
        <div class="caption-viewer">
          <div
            v-if="currentSubtitle.captions"
            class="caption-chinese"
          >
            <AppChineseCaption
              :chinese="currentSubtitle.captions['zh-Hans']"
              :pinyin="currentSubtitle.captions.pinyin"
            />
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import AppLayout from '@/components/layout/AppLayout.vue';
import AppYoutubePlayer from '@/components/video/AppYoutubePlayer.vue';
import AppChineseCaption from '@/components/AppChineseCaption.vue';

import YoutubeVideos from '@/youtube-videos';

const videoId = ref('');

const youtubeVideo = ref(YoutubeVideos[videoId.value]);

const currentTime = ref(0);

const currentSubtitle = computed(() => {
  const currentTimeMs = currentTime.value * 1000;
  const subtitle = youtubeVideo.value.captions.filter((caption) => currentTimeMs > caption.start && currentTimeMs < caption.end);

  return subtitle.length ? subtitle[0] : {};
});

const onTimeUpdate = (timeUpdate: number): void => {
  currentTime.value = timeUpdate;
};

onMounted(() => {
  const route = useRoute();
  const id = route.params.videoId;
  console.log(`ID: ${id}`);
  if (typeof id === 'string') {
    videoId.value = id;
    youtubeVideo.value = YoutubeVideos[id];
  }
});
</script>

<style scoped>
div.caption-viewer {
  font-size: 30px;
  text-align: center;
}
</style>
