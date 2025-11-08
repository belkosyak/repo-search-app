import { useCallback, useMemo } from 'react';
import { TextSearchControl } from './RepoListControls/TextSearchControl';
import { LANGUAGES, SORT_BY, SORT_BY_LABELS } from '../constants';
import type { FetchReposParams, SortBy } from '../types';
import { SelectControl } from './RepoListControls/SelectControl';
import { useRepoListControls } from './hooks/useRepoListControls';
import { capitalize } from '../../common/utils';

export function RepoListControls() {
  const { searchParams, setSearchParams, resetSearchParams } =
    useRepoListControls();

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
    <section aria-label="Repository search and filter controls">
      <fieldset
        className={
          'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 ' +
          'lg:flex lg:flex-row lg:items-end'
        }
      >
        <TextSearchControl
          id="text-search-input"
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
        <button
          type="button"
          onClick={resetSearchParams}
          className="btn btn-outline sm:col-span-2 lg:col-span-1"
          aria-label="Reset all search filters and parameters"
        >
          Reset
        </button>
      </fieldset>
    </section>
  );
}
