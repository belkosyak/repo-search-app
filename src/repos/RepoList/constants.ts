import type { FetchReposParams } from '../types';
import { LANGUAGES, SORT_BY } from '../constants';

export const DEFAULT_SEARCH_PARAMS: FetchReposParams = {
  searchString: '',
  language: LANGUAGES.JAVASCRIPT,
  sortBy: SORT_BY.STARS,
  orderBy: 'desc',
};
