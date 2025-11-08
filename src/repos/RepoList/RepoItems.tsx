import { useRepoList } from './useRepoList';

export function RepoItems() {
  const { repos } = useRepoList();

  return (
    <div>
      {repos?.map((repo) => (
        <article key={repo.id}>
          <h2>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${repo.name} - opens in new tab`}
            >
              {repo.name}
            </a>
          </h2>
          {repo.description && <p>{repo.description}</p>}
          <dl>
            <dt>ID</dt>
            <dd>{repo.id}</dd>
            {repo.language && (
              <>
                <dt>Language</dt>
                <dd>{repo.language}</dd>
              </>
            )}
            <dt>Stars</dt>
            <dd>🌟 {repo.stargazers_count}</dd>
          </dl>
        </article>
      ))}
    </div>
  );
}
