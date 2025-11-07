import { RepoListControlsContext } from './RepoListControlsContext';
import { useReposQuery } from '../queries';
import { use, useMemo } from 'react';
import { useDebounce } from 'use-debounce';

export function useRepoList() {
  const { searchParams } = use(RepoListControlsContext);
  const [debouncedSearchParams] = useDebounce(searchParams, 500);

  const { data, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useReposQuery(debouncedSearchParams);

  const repos = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data?.pages],
  );
  const totalCount = data.pages[0]?.total_count ?? 0;

  return {
    repos,
    totalCount,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
}
