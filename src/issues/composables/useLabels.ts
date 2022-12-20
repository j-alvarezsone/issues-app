import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';
import { useIssuesStore } from '../../stores/issues';
import { storeToRefs } from 'pinia';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100', {
    // headers: { Authorization: null },
  });

  return data;
};

const useLabels = () => {
  const { labels: selectedLabels } = storeToRefs(useIssuesStore());
  const { toggleLabel } = useIssuesStore();

  const { isLoading, data } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
  });

  return {
    // State
    isLoading,
    data,
    selectedLabels,
    // Getters
    // Methods
    toggleLabel,
  };
};

export default useLabels;
