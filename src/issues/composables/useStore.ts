import { storeToRefs } from 'pinia';
import { useIssuesStore } from '../../stores/issues';

const useStore = () => {
  const { labels, state } = storeToRefs(useIssuesStore());
  return {
    //  State
    labels,
    state,
    // Getters
    // Actions
  };
};

export default useStore;
