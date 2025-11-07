import { useRepoList } from './useRepoList';

export function RepoItems() {
  const { repos } = useRepoList();

  return (
    <div>
      {repos?.map((repo) => (
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          key={repo.id}
        >
          <div>ID: {repo.id}</div>
          <div>Name: {repo.name}</div>
          <div>Description: {repo.description}</div>
          <div>Language: {repo.language}</div>
          <div>🌟 {repo.stargazers_count}</div>
        </a>
      ))}
    </div>
  );
}
