import { useRepoList } from './hooks/useRepoList';
import { RepoItem } from './RepoItems/RepoItem';

export function RepoItems() {
  const { repos } = useRepoList();

  if (!repos || repos.length === 0) {
    return (
      <section
        className="flex flex-col items-center justify-center py-12"
        aria-live="polite"
      >
        <p className="text-lg text-base-content opacity-70">
          No repositories found
        </p>
        <p className="text-sm text-base-content opacity-50 mt-2">
          Try adjusting your search criteria
        </p>
      </section>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {repos.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
