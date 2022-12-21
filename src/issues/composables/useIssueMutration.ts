import { useMutation } from '@tanstack/vue-query';
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
  const { data, isLoading, mutate } = useMutation(addIssue, {
    onSuccess: () => {
      // When is successful, we can do something here
    },
    onSettled: () => {
      // When finish with success or error, we can do something here
    },
  });
  return {
    //  State
    data,
    isLoading,
    // Getters
    // Actions
    mutate,
  };
};

export default useIssueMutation;
