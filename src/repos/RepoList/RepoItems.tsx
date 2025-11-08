import { useRepoList } from './useRepoList';
import { RepoItem } from './RepoItems/RepoItem';

export function RepoItems() {
  const { repos } = useRepoList();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 py-8">
      {repos?.map((repo) => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
}
