import { useCallback, useState } from 'react';
// context needs to be in separate file to enable HMR for this component
import { RepoListControlsContext } from './RepoListControlsContext';
import { DEFAULT_SEARCH_PARAMS } from './constants';
import type { FetchReposParams } from '../types';
export function RepoListControlsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchParams, setSearchParams] = useState<FetchReposParams>(
    DEFAULT_SEARCH_PARAMS,
  );
  const resetSearchParams = useCallback(() => {
    setSearchParams(DEFAULT_SEARCH_PARAMS);
  }, []);

  return (
    <RepoListControlsContext
      value={{
        searchParams,
        setSearchParams,
        resetSearchParams,
      }}
    >
      {children}
    </RepoListControlsContext>
  );
}
