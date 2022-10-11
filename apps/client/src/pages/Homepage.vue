<template>
  <AppLayout>
    <div class="quote">
      <div class="hanzi">
        <o-tooltip label="Qiān lǐ zhī xíng, shǐ yú zú xià.">
          千里之行,始于足下
        </o-tooltip>
      </div>
      <div class="translation">
        A journey of a thousand miles begins with a single step.
      </div>
      <div class="author">
        Lao Tzu
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">

import AppLayout from '@/components/layout/AppLayout.vue';
</script>

<style scoped>
div.quote {
  text-align: center;
}

div.quote > div.hanzi {
  font-size: 45pt;
  color: #d0bba3;
}

div.quote > div.translation {
  font-size: 20pt;
}

div.quote > div.author {
  font-size: 20pt;
}
</style>
