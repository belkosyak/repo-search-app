import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { type GitHubSearchResponse, type FetchReposParams } from './types';

const SEARCH_BASE_URL = 'https://api.github.com/search';
const REPOS_ENDPOINT = `${SEARCH_BASE_URL}/repositories`;

const fetchRepos = async ({
  searchString,
  language,
  sortBy,
  orderBy,
  pageParam = 1,
}: FetchReposParams & {
  pageParam?: number;
}): Promise<GitHubSearchResponse> => {
  const params = new URLSearchParams({
    q: `${searchString} language:${language}`,
    sort: sortBy,
    order: orderBy,
    per_page: '10',
    page: pageParam.toString(),
  });
  const response = await fetch(`${REPOS_ENDPOINT}?${params.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  return response.json() as Promise<GitHubSearchResponse>;
};

export const useReposQuery = (params: FetchReposParams) =>
  useSuspenseInfiniteQuery({
    queryKey: ['repos', params],
    queryFn: ({ pageParam }) => fetchRepos({ ...params, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce(
        (sum, page) => sum + page.items.length,
        0,
      );
      if (totalFetched < lastPage.total_count) {
        return allPages.length + 1;
      }
      return undefined;
    },
  });
