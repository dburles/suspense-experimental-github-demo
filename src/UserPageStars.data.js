import { fetchUserStars } from './api';
import dataCache from './dataCache';

// This file is to show that we can have nested screens with their own
// data dependencies which are composed into dependencies of parents.
// Note that these dependencies don't *block* rendering of parent content.
// For example, we can show UserPage without waiting for these to load.

export default function prepareUserPageStars([, userId]) {
  return {
    stars: dataCache.preload(['fetchUserStars', userId], fetchUserStars)
  };
}
