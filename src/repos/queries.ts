import { useSuspenseQuery } from '@tanstack/react-query';
import { type GitHubSearchResponse, type FetchReposParams } from './types';

const SEARCH_BASE_URL = 'https://api.github.com/search';
const REPOS_ENDPOINT = `${SEARCH_BASE_URL}/repositories`;

const fetchRepos = async ({
  searchString,
  language,
  sortBy,
  orderBy,
}: FetchReposParams): Promise<GitHubSearchResponse> => {
  const params = new URLSearchParams({
    q: `${searchString} language:${language}`,
    sort: sortBy,
    order: orderBy,
    per_page: '10',
    page: '1',
  });
  const response = await fetch(`${REPOS_ENDPOINT}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  return response.json() as Promise<GitHubSearchResponse>;
};

// TODO: use useSuspenseInfiniteQuery and add load more button
export const useReposQuery = (params: FetchReposParams) =>
  useSuspenseQuery({
    queryKey: ['repos', params],
    queryFn: () => fetchRepos(params),
  });
