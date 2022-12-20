import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

const getIssue = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue> => {
  const { data } = await githubApi.get<Issue>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

interface Options {
  autoLoad: boolean;
}

const useIssue = (issueNumber: number, options?: Options) => {
  const { autoLoad = true } = options || {};
  const queryClient = useQueryClient();

  const { isLoading: issueIsLoading, data: issue } = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
    enabled: autoLoad,
  });

  const { isLoading: issueCommentsIsLoading, data: issueComments } = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    // queryFn: () => getIssueComments(issue.value?.number || 0),
    queryFn: () => getIssueComments(issueNumber),
    staleTime: 1000 * 15,
    enabled: autoLoad,
    // If this useQuery is depend on the IssueQuery we can do by this way
    // enabled: computed(() => !!issue.value),
  });

  const preFetchIssue = (issueNumber: number) => {
    queryClient.prefetchQuery(
      ['issue', issueNumber],
      () => getIssue(issueNumber),
      { staleTime: 1000 * 60 }
    );

    queryClient.prefetchQuery(
      ['issue', issueNumber, 'comments'],
      () => getIssueComments(issueNumber),
      { staleTime: 1000 * 15 }
    );
  };

  return {
    //  State
    issue,
    issueIsLoading,
    issueComments,
    issueCommentsIsLoading,
    // Getters
    // Actions
    preFetchIssue,
  };
};

export default useIssue;
