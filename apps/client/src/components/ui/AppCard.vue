<template>
  <div class="card has-background">
    <div class="card-content">
      <div class="media">
        <div class="media-left">
          <slot name="media-left" />
        </div>
        <div class="media-content">
          <slot name="media-content" />
        </div>
      </div>

      <div class="content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class AppCard extends Vue {
}
</script>

<style scoped>
div.card.has-background {
  width: fit-content;
  height: fit-content;
  float: left;
}

div.card .media:not(:last-child) {
  margin-bottom: 0;
}

div.media {
  display: flex;
  align-items: center;
}
</style>
