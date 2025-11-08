import { useRepoList } from './useRepoList';
import { Button } from '@i4o/catalystui';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function LoadMoreButton() {
  const { hasNextPage, isFetchingNextPage, fetchNextPage } = useRepoList();

  if (!hasNextPage) {
    return null;
  }

  return (
    <div aria-live="polite" aria-busy={isFetchingNextPage}>
      <Button
        onClick={() => fetchNextPage()}
        disabled={isFetchingNextPage}
        loading={isFetchingNextPage}
        loadingText="Loading..."
        aria-busy={isFetchingNextPage}
        ariaLabel={
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
      </Button>
    </div>
  );
}
