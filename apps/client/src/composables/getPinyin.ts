import { computed } from 'vue';

import { getToneNumber } from 'pinyin-utils';

export default (pinyin: string) => {
  const toneNumber = computed(() => getToneNumber(pinyin));

  return {
    toneNumber,
  };
};
