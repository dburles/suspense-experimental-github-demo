import createSubscription from './createSubscription.js';

const PENDING = 0;
export const RESOLVED = 1;
export const REJECTED = 2;

/**
 * Looks up or creates a new cache reference.
 * @ignore
 * @kind function
 * @name dataLoader
 * @param {CacheKey} key The cache key.
 * @param {Function} asyncFn An asynchronous function that returns data.
 * @param {DataCache} dataCache A data cache.
 * @returns {CacheReference} A cache reference.
 */
export default function dataLoader(key, asyncFn, dataCache) {
  const subscription = createSubscription();

  let reference = dataCache.get(key);

  if (reference && reference.state === PENDING) {
    return reference;
  }

  reference = {
    loadOnMount: false,
    key,
    asyncFn,
    load() {
      if (reference.state === PENDING) {
        return;
      }

      const thenable = asyncFn(key);

      reference.thenable = thenable;
      reference.state = PENDING;

      thenable
        .then((response) => {
          reference.state = RESOLVED;
          reference.value = response;
        })
        .catch((error) => {
          reference.state = REJECTED;
          reference.value = error;
        })
        .then(() => {
          subscription.notify();
        });
    },
    onUpdate: subscription.subscribe,
  };

  reference.load();

  dataCache.set(key, reference);

  return reference;
}
