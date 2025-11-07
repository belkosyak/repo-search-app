import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorFallback } from '../common/components/ErrorFallback';
import { RepoListControls } from './RepoList/RepoListControls';
import { LoadingPlaceholder } from '../common/components/LoadingPlaceholder';
import { RepoListControlsProvider } from './RepoList/RepoListControlsProvider';
import { RepoItems } from './RepoList/RepoItems';

export function RepoList() {
  // TODO: revise for semantic HTML
  return (
    <RepoListControlsProvider>
      <div>
        <RepoListControls />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary fallbackRender={ErrorFallback} onReset={reset}>
              <Suspense fallback={<LoadingPlaceholder />}>
                <RepoItems />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </RepoListControlsProvider>
  );
}
