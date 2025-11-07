import { use, useCallback, useMemo } from 'react';
import { RepoListControlsContext } from './RepoListControlsContext';
import { RepoTextSearchControl } from './RepoListControls/TextSearchControl';
import { LANGUAGES, SORT_BY, SORT_BY_LABELS } from '../constants';
import { capitalize } from 'lodash';
import type { FetchReposParams, SortBy } from '../types';
import { SelectControl } from './RepoListControls/SelectControl';

export function RepoListControls() {
  const { searchParams, setSearchParams, resetSearchParams } = use(
    RepoListControlsContext,
  );

  const setSearchParam = useCallback(
    (param: keyof FetchReposParams, value: string) => {
      setSearchParams({ ...searchParams, [param]: value });
    },
    [searchParams, setSearchParams],
  );

  const languageOptions = useMemo(
    () =>
      Object.values(LANGUAGES).map((language) => ({
        label: capitalize(language),
        value: language,
      })),
    [],
  );

  const sortByOptions = useMemo(
    () =>
      Object.values(SORT_BY).map((sortBy: SortBy) => ({
        label: SORT_BY_LABELS[sortBy],
        value: sortBy,
      })),
    [],
  );
  return (
    <div>
      <RepoTextSearchControl
        value={searchParams.searchString}
        onChange={(value) => setSearchParam('searchString', value)}
      />
      <SelectControl
        options={languageOptions}
        name="language-select"
        label="Language"
        value={searchParams.language}
        onChange={(value) => setSearchParam('language', value)}
      />
      <SelectControl
        options={sortByOptions}
        name="sort-by-select"
        label="Sort by"
        value={searchParams.sortBy}
        onChange={(value) => setSearchParam('sortBy', value)}
      />
      <SelectControl
        options={[
          { label: 'Ascending', value: 'asc' },
          { label: 'Descending', value: 'desc' },
        ]}
        name="order-by-select"
        label="Order by"
        value={searchParams.orderBy}
        onChange={(value) => setSearchParam('orderBy', value)}
      />
      <button onClick={resetSearchParams}>Reset</button>
    </div>
  );
}
