/**
 * @kind typedef
 * @name CacheKey
 * @type {string|Array<string|number>}
 */

/**
 * @kind typedef
 * @name DataCacheLoad
 * @type {function}
 * @param {CacheKey} key A cache key.
 * @param {function} asyncFn A function that returns a Promise.
 */

/**
 * @kind typedef
 * @name UseDataLoaderLoad
 * @type {function}
 * @param {function} asyncFn A function that returns a Promise.
 */

/**
 * A dataCache object.
 * @kind typedef
 * @name DataCache
 * @type {object}
 * @prop {Map} cache The cache.
 * @prop {Function} get Internal API.
 * @prop {Function} set Internal API.
 * @prop {DataCacheLoad} load Load asynchronous data.
 * @prop {Function} reset Resets the cache.
 */

/**
 * A cache reference object.
 * @ignore
 * @kind typedef
 * @name CacheReference
 * @type {object}
 * @prop {boolean} loadOnMount If this reference has mounted once before, we trigger stale-while-revalidate, unless reloadOnMount = false.
 * @prop {CacheKey} key The cache key.
 * @prop {Function} asyncFn User provided async function.
 * @prop {Function} load Calls the async function and loads data.
 * @prop {Function} onUpdate Subscribe to data events.
 */

export { default as createDataCache } from './createDataCache.js';
export { default as DataCacheContext } from './DataCacheContext.js';
export { default as useDataLoader } from './useDataLoader.js';
export { default as usePreloadedData } from './usePreloadedData.js';
