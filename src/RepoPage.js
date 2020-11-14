import React, { useLayoutEffect } from 'react';
import { Link } from './router';
import { usePreloadedData } from './suspense-data-loader';

export default function RepoPage({ repo, contribs }) {
  useLayoutEffect(() => {
    // A proper router would help you with this
    window.scrollTo(0, 0);
  }, [repo]);
  return (
    <div>
      <RepoDetails repo={repo} />
      <hr />
      <RepoContributors contribs={contribs} />
    </div>
  );
}

function RepoDetails({ repo }) {
  const json = usePreloadedData(repo, { reloadOnMount: false });
  return <h1>{json.name}</h1>;
}

function RepoContributors({ contribs }) {
  const json = usePreloadedData(contribs, { reloadOnMount: false });
  return (
    <div>
      <h2>Contributors</h2>
      {json.length === 0 && <p>No contributors!</p>}
      <ul>
        {json.map(({ login, id }) => (
          <li key={id}>
            <Link url={`/users/${login}`}>{login}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
