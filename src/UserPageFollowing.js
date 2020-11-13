import React from 'react';
import { Link } from './router';
import { usePreloadedData } from './suspense-data-loader';

export default function UserPageFollowing({ following }) {
  const json = usePreloadedData(following);
  return (
    <div>
      <h2>Following</h2>
      {json.length === 0 && <p>Not following anyone!</p>}
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
