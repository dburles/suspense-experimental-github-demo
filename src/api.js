export function fetchRepo([, repoId]) {
  return getFromGitHub(`/repos/${repoId}`);
}

export function fetchRepoContribs([, repoId]) {
  return getFromGitHub(`/repos/${repoId}/contributors`);
}

export function fetchUser([, userId]) {
  return getFromGitHub(`/users/${userId}`);
}

export function fetchUserStars([, userId]) {
  return getFromGitHub(`/users/${userId}/starred`);
}

export function fetchUserFollowing([, userId]) {
  return getFromGitHub(`/users/${userId}/following`);
}

async function getFromGitHub(url) {
  const response = await fetch('https://api.github.com' + url);
  console.log('fetch', url);

  if (response.status !== 200) {
    throw new Error('GitHub API returned Error ' + response.status);
  }
  return response.json();
}
