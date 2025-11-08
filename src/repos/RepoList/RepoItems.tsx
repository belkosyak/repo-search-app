import { useRepoList } from './useRepoList';

export function RepoItems() {
  const { repos } = useRepoList();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {repos?.map((repo) => (
        <article key={repo.id} className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h2 className="card-title">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${repo.name} - opens in new tab`}
                className={
                  'link link-primary focus:outline-none focus:ring-2 ' +
                  'focus:ring-primary focus:ring-offset-2 rounded'
                }
              >
                {repo.name}
              </a>
            </h2>
            {repo.description && (
              <p className="text-base-content opacity-70">{repo.description}</p>
            )}
            <dl className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="font-medium">ID</dt>
                <dd>{repo.id}</dd>
              </div>
              {repo.language && (
                <div className="flex justify-between">
                  <dt className="font-medium">Language</dt>
                  <dd>{repo.language}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="font-medium">Stars</dt>
                <dd>🌟 {repo.stargazers_count}</dd>
              </div>
            </dl>
          </div>
        </article>
      ))}
    </div>
  );
}
