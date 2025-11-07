import { useRepoList } from './useRepoList';

export function LoadMoreButton() {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = useRepoList();

  if (!hasNextPage) {
    return null;
  }

  return (
    <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
      {isFetchingNextPage ? 'Loading...' : 'Load More'}
    </button>
  );
}
