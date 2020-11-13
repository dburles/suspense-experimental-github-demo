import { useEffect, useReducer, useState } from 'react';
import { REJECTED, RESOLVED } from './lib/dataLoader.js';

/**
 * usePreloadedData Options
 * @kind typedef
 * @name UsePreloadedDataOptions
 * @type {object}
 * @prop {boolean} reloadOnMount Disable reloading on mount.
 */

/**
 * Access preloaded data, suspends if data is unavailable.
 * @kind function
 * @name usePreloadedData
 * @param {CacheReference} reference A cache reference.
 * @param {UsePreloadedDataOptions} options User configurable options.
 * @throws {Promise|string}
 * @returns {*} The cached value
 */
export default function usePreloadedData(reference, userOptions = {}) {
  const [options] = useState(userOptions);
  const [, forceUpdate] = useReducer((x) => {
    return x + 1;
  }, 0);

  useEffect(() => {
    return reference.onUpdate(() => {
      forceUpdate();
    });
  }, [reference]);

  useEffect(() => {
    if (reference.loadOnMount && options.reloadOnMount !== false) {
      reference.load();
    }
    return () => {
      reference.loadOnMount = true;
    };
  }, [reference, options]);

  if (reference.state === RESOLVED) {
    return reference.value;
  } else if (reference.state === REJECTED) {
    throw reference.value;
  }

  throw reference.thenable;
}
