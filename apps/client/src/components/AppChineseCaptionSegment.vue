<template>
  <div
    :class="computedClass"
    @click="clickOnSegment"
  >
    {{ props.segment }}
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
// @ts-ignore
import { useProgrammatic } from '@oruga-ui/oruga-next';

const props = defineProps({
  segment: {
    type: String,
    required: true,
  },
  isHighlighted: {
    type: Boolean,
    default: false,
  },
});

const computedClass = computed(() => (props.isHighlighted ? 'caption-segment highlighted' : 'caption-segment'));

const clickOnSegment = (): void => {
  navigator.clipboard.writeText(props.segment);

  const { oruga } = useProgrammatic();
  oruga.notification.open({
    message: `'${props.segment}' - Copied to clipboard!`,
    rootClass: 'toast-notification',
    position: 'top',
  });
};
</script>

<style scoped>
div.caption-segment {
  display: inline-block;
}

div.highlighted {
  color: #39ace7;
}
</style>
