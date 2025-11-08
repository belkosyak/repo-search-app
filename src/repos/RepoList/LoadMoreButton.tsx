import { useRepoList } from './hooks/useRepoList';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function LoadMoreButton() {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = useRepoList();

  if (!hasNextPage) {
    return null;
  }

  return (
    <div
      aria-live="polite"
      aria-busy={isFetchingNextPage}
      className="flex justify-center mt-4"
    >
      <button
        type="button"
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        className={`btn btn-primary w-full sm:w-64 lg:w-80 ${
          isFetchingNextPage ? 'btn-loading' : ''
        }`}
        aria-busy={isFetchingNextPage}
        aria-label={
          isFetchingNextPage
            ? 'Loading more repositories'
            : 'Load more repositories'
        }
      >
        {isFetchingNextPage ? (
          <>
            <ArrowPathIcon
              className="h-4 w-4 animate-spin"
              aria-hidden="true"
            />
            <span>Loading...</span>
          </>
        ) : (
          'Load More'
        )}
      </button>
    </div>
  );
}
