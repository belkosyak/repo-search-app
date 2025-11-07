import { RepoListControlsContext } from './RepoListControlsContext';
import { useReposQuery } from '../queries';
import { use } from 'react';
import { useDebounce } from 'use-debounce';

export function useRepoList() {
  const { searchParams } = use(RepoListControlsContext);
  const [debouncedSearchParams] = useDebounce(searchParams, 500);

  const {
    data: { total_count: totalCount, items: repos },
  } = useReposQuery(debouncedSearchParams);

  return {
    repos,
    totalCount,
  };
}
