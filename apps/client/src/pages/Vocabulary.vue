<template>
  <AppLayout>
    <div class="vocabulary">
      <AppSidebar
        v-model:selected-item="selectedCategory"
        :items="categories"
      />

      <div class="vocabulary-items">
        <AppVocabularyCard
          v-for="(vocabularyItem) in filteredVocabulary"
          :key="vocabularyItem.hanzi"
          :vocabulary-item="vocabularyItem"
        />
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import AppLayout from '@/components/layout/AppLayout.vue';
import AppVocabularyCard from '@/components/AppVocabularyCard.vue';
import AppSidebar from '@/components/ui/AppSidebar.vue';

import vocabulary from '@/vocabulary';

const selectedCategory = ref<string | null>(null);

const categories = (() => {
  const categoriesSet = new Set();
  vocabulary.forEach((vocabularyItem) => {
    categoriesSet.add(vocabularyItem.category);
  });
  return Array.from(categoriesSet).sort();
})();

const filteredVocabulary = computed(() => (selectedCategory.value ? vocabulary.filter((item) => item.category === selectedCategory.value) : vocabulary));
</script>

<style scoped>
div.vocabulary {
  display: flex;
}

div.vocabulary-items {
  display: flex;
  justify-content: space-between;
  flex-basis: fit-content;
  flex-wrap: wrap;
  flex-grow: 1;
}
</style>
