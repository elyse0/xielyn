<template>
  <AppLayout>
    <div class="videos">
      <div class="youtube-videos">
        <div
          v-for="(video) in youtubeVideosArray"
          :key="video.id"
          class="video"
        >
          <router-link :to="`/videos/youtube/${video.id}`">
            <AppImage
              :src="video.thumbnailUrl"
              :alt="video.title"
            />
          </router-link>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import AppImage from '@/components/ui/AppImage.vue';
import YoutubeVideos from '@/youtube-videos';

const youtubeVideosArray = Object.keys(YoutubeVideos)
  .map((id) => ({ id, ...YoutubeVideos[id] }));
</script>

<style scoped>
div.youtube-videos {
  display: flex;
  flex-basis: fit-content;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

div.youtube-videos > div.video {

}
</style>
