import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepoList } from '../RepoList';
import * as queries from '../queries';

vi.mock('../queries', async () => {
  const actual = await vi.importActual('../queries');
  return {
    ...actual,
    useReposQuery: vi.fn(),
  };
});

vi.mock('../../common/components/ErrorFallback', () => ({
  ErrorFallback: ({
    resetErrorBoundary,
  }: {
    resetErrorBoundary: () => void;
  }) => (
    <section role="alert" data-testid="error-fallback">
      <button onClick={resetErrorBoundary} data-testid="error-fallback-button">
        Try again
      </button>
    </section>
  ),
}));

vi.mock('../RepoList/RepoListControls', () => ({
  RepoListControls: () => <div data-testid="repo-list-controls">Controls</div>,
}));

vi.mock('../../common/components/LoadingPlaceholder', () => ({
  LoadingPlaceholder: () => <div data-testid="loading-placeholder" />,
}));

vi.mock('../RepoList/RepoListControlsProvider', () => ({
  RepoListControlsProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="repo-list-controls-provider">{children}</div>
  ),
}));

let repoItemsShouldThrow = false;

vi.mock('../RepoList/RepoItems', () => {
  return {
    RepoItems: () => {
      // Access the mocked useReposQuery from the module
      const { useReposQuery } = queries;
      useReposQuery({} as Parameters<typeof useReposQuery>[0]);

      if (repoItemsShouldThrow) {
        throw new Error('Test error from RepoItems');
      }

      return <div data-testid="repo-items">RepoItems</div>;
    },
  };
});

vi.mock('../RepoList/LoadMoreButton', () => ({
  LoadMoreButton: () => <div data-testid="load-more-button">LoadMore</div>,
}));

describe('RepoList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
    repoItemsShouldThrow = false;
  });

  it('should render loading placeholder when wrapped in suspense child throws a pending promise', () => {
    const pendingPromise = new Promise(() => {
      // Never resolves
    });

    // Mock useReposQuery to throw the promise (triggering Suspense)
    vi.mocked(queries.useReposQuery).mockImplementation(() => {
      throw pendingPromise;
    });

    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('loading-placeholder')).toBeInTheDocument();
  });

  it('should render error fallback when RepoItems throws an error and rerun query when resetErrorBoundary is invoked', async () => {
    const user = userEvent.setup();

    vi.mocked(queries.useReposQuery).mockReturnValue(
      {} as unknown as ReturnType<typeof queries.useReposQuery>,
    );

    repoItemsShouldThrow = true;

    render(
      <QueryClientProvider client={queryClient}>
        <RepoList />
      </QueryClientProvider>,
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();

    const initialCallCount = vi.mocked(queries.useReposQuery).mock.calls.length;

    const resetButton = screen.getByTestId('error-fallback-button');
    await user.click(resetButton);

    // After reset, RepoItems will render again
    expect(vi.mocked(queries.useReposQuery).mock.calls.length).toBeGreaterThan(
      initialCallCount,
    );
  });
});
