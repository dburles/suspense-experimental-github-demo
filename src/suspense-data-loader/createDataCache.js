import dataLoader from './lib/dataLoader.js';
import serializeKey from './lib/serializeKey.js';

const defaultOptions = { maxEntries: 10000 };

/**
 * Creates a data cache.
 * @kind function
 * @name createDataCache
 * @param {object} userOptions User configurable options.
 * @prop {number} maxEntries The maximum allowed cache entries before old entries are dropped.
 * @returns {DataCache} A dataCache object.
 */
export default function createDataCache(userOptions = defaultOptions) {
  const options = {
    ...defaultOptions,
    ...userOptions,
  };

  const dataCache = {
    cache: new Map(),

    get(key) {
      return dataCache.cache.get(serializeKey(key));
    },

    set(key, reference) {
      dataCache.cache.set(serializeKey(key), reference);
      if (dataCache.cache.size > options.maxEntries) {
        for (const [key] of dataCache.cache) {
          dataCache.cache.delete(key);
          break;
        }
      }
    },

    load(key, asyncFn) {
      return dataLoader(key, asyncFn, dataCache);
    },

    reset() {
      dataCache.cache = new Map();
    },
  };

  return dataCache;
}
