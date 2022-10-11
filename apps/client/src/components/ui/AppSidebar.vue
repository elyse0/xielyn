<template>
  <div class="app-sidebar">
    <o-button
      v-for="(item, index) in props.items"
      :key="index"
      :label="item"
      expanded
      :variant="getVariant(item)"
      @click="onClick(item)"
    />
  </div>
</template>

<script setup lang="ts">
import {
  defineProps, defineEmits, ref,
} from 'vue';

const emit = defineEmits(['update:selectedItem']);

const selectedItem = ref<string | null>(null);

const props = defineProps({
  items: {
    type: Array as () => string[],
    required: true,
  },
  selectedItem: {
    type: String,
    default: null,
  },
});

const getVariant = ref((item: string) => (item === selectedItem.value ? 'primary' : ''));

const onClick = (item: string) => {
  selectedItem.value = item;
  emit('update:selectedItem', item);
};
</script>

<style scoped>
div.app-sidebar {
  max-width: 150px;
  margin: 0 10px 0 0;
}

div.app-sidebar > button {
  margin: 0 0 5px 0;
}
</style>
