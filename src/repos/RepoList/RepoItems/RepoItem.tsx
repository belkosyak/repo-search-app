import type { GitHubRepository } from '../../types';

interface RepoItemProps {
  repo: GitHubRepository;
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <article
      className={
        'card bg-base-100 shadow-md border-2 border-base-300 ' +
        'hover:border-primary hover:shadow-lg transition-all duration-200 '
      }
    >
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

        <dl className="mt-4 space-y-1 text-sm">
          {repo.topics?.length && (
            <div className="flex flex-col gap-1">
              <dt className="font-medium">Topics</dt>
              <dd>
                <div className="flex flex-wrap gap-1">
                  {repo.topics.map((topic) => (
                    <span key={topic} className="badge badge-primary badge-sm">
                      {topic}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </article>
  );
}
