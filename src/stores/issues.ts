import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useIssuesStore = defineStore('issues', () => {
  const state = ref<string>('');
  const labels = ref<string[]>([]);

  return {
    //  State
    state,
    labels,
    // Getters

    // Actions
    toggleLabel(labelName: string) {
      throw new Error('Not implemented');
    },
  };
});
