<template>
  <AppLayout>
    <div class="verbs">
      <div
        v-for="(verb, index) in verbs"
        :key="index"
      >
        <AppVocabularyCard :vocabulary-item="verb" />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import AppLayout from '@/components/layout/AppLayout.vue';
import verbs from '@/vocabulary/verbs';

import AppVocabularyCard from '@/components/AppVocabularyCard.vue';
</script>

<style scoped>
div.verbs {
  display: flex;
  justify-content: space-evenly;
  flex-basis: fit-content;
  flex-wrap: wrap;
}
</style>
