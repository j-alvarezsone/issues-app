import { Issue } from '../interfaces/issue';
import { githubApi } from '../../api/githubApi';
import { useQuery } from '@tanstack/vue-query';

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

const useIssue = (issueNumber: number) => {
  const { isLoading: issueIsLoading, data: issue } = useQuery({
    queryKey: ['issue', issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60,
  });

  const { isLoading: issueCommentsIsLoading, data: issueComments } = useQuery({
    queryKey: ['issue', issueNumber, 'comments'],
    // queryFn: () => getIssueComments(issue.value?.number || 0),
    queryFn: () => getIssueComments(issueNumber),
    staleTime: 1000 * 15,
    // If this useQuery is depend on the IssueQuery we can do by this way
    // enabled: computed(() => !!issue.value),
  });

  return {
    //  State
    issue,
    issueIsLoading,
    issueComments,
    issueCommentsIsLoading,
    // Getters
    // Actions
  };
};

export default useIssue;
