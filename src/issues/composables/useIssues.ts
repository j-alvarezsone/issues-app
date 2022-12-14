import { useQuery } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

const getIssues = async (): Promise<Issue[]> => {
  const params = new URLSearchParams();

  params.append('per_page', '10');

  const { data } = await githubApi.get<Issue[]>('/issues', {
    params,
  });

  return data;
};

const useIssues = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['issues'],
    queryFn: getIssues,
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
