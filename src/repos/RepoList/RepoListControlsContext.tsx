import { createContext } from 'react';
import type { FetchReposParams } from '../types';
import { DEFAULT_SEARCH_PARAMS } from './constants';

export const RepoListControlsContext = createContext<{
  searchParams: FetchReposParams;
  setSearchParams: (searchParams: FetchReposParams) => void;
  resetSearchParams: () => void;
}>({
  searchParams: DEFAULT_SEARCH_PARAMS,
  setSearchParams: () => {},
  resetSearchParams: () => {},
});
