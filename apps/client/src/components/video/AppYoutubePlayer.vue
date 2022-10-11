<template>
  <div class="youtube-player">
    <vue-plyr
      ref="plyr"
      @ready="onReady"
      @timeupdate="onVideoTimeUpdate"
      @seeking="onSeeking"
    >
      <div class="plyr__video-embed">
        <iframe
          :src="youtubeUrl"
          allowfullscreen
          allowtransparency
          allow="autoplay"
        />
      </div>
    </vue-plyr>
    <div
      v-if="player"
      style="display: none"
    >
      <o-button @click="play">
        Botoooooooooooon
      </o-button>
      <o-button @click="time">
        Timee
      </o-button>
    </div>
  </div>
</template>

<script lang="ts">
import Plyr from 'plyr';
import { Options, Vue } from 'vue-class-component';
import { getOnlyLettersUuid } from '@/util/uuid';

@Options({
  props: {
    videoId: String,
  },
})
export default class AppYoutubePlayer extends Vue {
  id: string = getOnlyLettersUuid();

  videoId!: string

  youtubeUrl = `https://www.youtube.com/embed/${this.videoId}?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`;

  player: Plyr | null = null;

  currentTime = 0;

  onReady(): void {
    // @ts-ignore
    this.player = new Plyr(this.$refs.plyr.player);
  }

  play(): void {
    if (this.player) {
      this.player.play();
    }
  }

  time(): void {
    if (this.player) {
      console.log(this.player.currentTime);
    }
  }

  onVideoTimeUpdate(): void {
    if (this.player) {
      this.currentTime = this.player.currentTime;
    }
  }

  onSeeking(): void {
    if (this.player) {
      this.currentTime = this.player.currentTime;
    }
  }

  created(): void {
    this.$watch('currentTime', () => {
      this.$emit('timeUpdate', this.currentTime);
    });
  }
}
</script>

<style scoped>
div.plyr {
  height: 30vw;
  width: 50vw;
  margin: 0 auto;
}
div.youtube-player {
  margin-bottom: 20px;
}
</style>
