import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';

interface Args {
  title: string;
  labels?: string[];
  body?: string;
}

const addIssue = async ({
  title,
  labels = [],
  body = '',
}: Args): Promise<Issue> => {
  const newIssueData = {
    title,
    labels,
    body,
  };

  const { data } = await githubApi.post<Issue>('/issues', newIssueData);

  return data;
};

const useIssueMutation = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, mutate, isSuccess, reset } = useMutation(addIssue, {
    onSuccess: (issue) => {
      // When is successful, we can do something here
      queryClient.invalidateQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.refetchQueries({
        queryKey: ['issues'],
        exact: false,
      });

      queryClient.setQueryData(['issue', issue.number], issue);
    },
    onSettled: () => {
      // When finish with success or error, we can do something here
    },
  });
  return {
    //  State
    data,
    isLoading,
    isSuccess,
    // Getters
    // Actions
    mutate,
    reset,
  };
};

export default useIssueMutation;
