import React from 'react';
import { Link } from './router';
import { usePreloadedData } from './suspense-data-loader';

export default function UserPageStars({ stars }) {
  const json = usePreloadedData(stars);
  return (
    <div>
      <h2>Starred Repos</h2>
      {json.length === 0 && <p>No stars!</p>}
      <ul>
        {json.map(({ name, full_name, stargazers_count }) => (
          <li key={full_name}>
            <Link url={`/repos/${full_name}`}>{name}</Link> ({stargazers_count}{' '}
            stars)
          </li>
        ))}
      </ul>
    </div>
  );
}
