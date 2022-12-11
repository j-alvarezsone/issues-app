import { useQuery } from '@tanstack/vue-query';
import { githubApi } from '../../api/githubApi';
import { Label } from '../interfaces/label';

const getLabels = async (): Promise<Label[]> => {
  const { data } = await githubApi.get<Label[]>('/labels?per_page=100');

  return data;
};

const useLabels = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['labels'],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isLoading,
    data,
  };
};

export default useLabels;
