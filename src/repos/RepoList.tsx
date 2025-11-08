import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorFallback } from '../common/components/ErrorFallback';
import { RepoListControls } from './RepoList/RepoListControls';
import { LoadingPlaceholder } from '../common/components/LoadingPlaceholder';
import { RepoListControlsProvider } from './RepoList/RepoListControlsProvider';
import { RepoItems } from './RepoList/RepoItems';
import { LoadMoreButton } from './RepoList/LoadMoreButton';

export function RepoList() {
  return (
    <RepoListControlsProvider>
      <main
        className={
          'mx-auto max-w-7xl px-4 pt-16 pb-4 ' +
          'sm:px-6 sm:pt-16 sm:pb-6 lg:px-8 lg:pt-16 lg:pb-8'
        }
      >
        <RepoListControls />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
              <Suspense fallback={<LoadingPlaceholder />}>
                <RepoItems />
                <LoadMoreButton />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </main>
    </RepoListControlsProvider>
  );
}
