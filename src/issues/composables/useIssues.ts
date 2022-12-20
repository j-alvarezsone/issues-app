import { useQuery } from '@tanstack/vue-query';
import { Issue, State } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

import useStore from './useStore';

const getIssues = async (labels: string[], state: State): Promise<Issue[]> => {
  const params = new URLSearchParams();

  params.append('per_page', '10');

  if (state) params.append('state', state);
  if (labels.length) {
    const labelsString = labels.join(',');
    params.append('labels', labelsString);
  }

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params,
  });

  return data;
};

const useIssues = () => {
  const { labels, state } = useStore();

  const { isLoading, data } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ['issues', { labels, state }],
    queryFn: () => getIssues(labels.value, state.value),
  });
  return {
    //  State
    data,
    isLoading,
    // Getters
    // Actions
  };
};

export default useIssues;
