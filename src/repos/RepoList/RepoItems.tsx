import { useRepoList } from './useRepoList';

export function RepoItems() {
  const { repos } = useRepoList();

  return (
    <div>
      {repos?.map((repo) => (
        <div key={repo.id}>
          <div>ID: {repo.id}</div>
          <div>Name: {repo.name}</div>
        </div>
      ))}
    </div>
  );
}
