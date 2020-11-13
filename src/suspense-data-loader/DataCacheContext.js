import { createContext } from 'react';

/**
 * A React context.
 * @kind constant
 * @name DataCacheContext
 * @type {object}
 * @prop {Function} Provider [React context provider component](https://reactjs.org/docs/context#contextprovider).
 * @prop {Function} Consumer [React context consumer component](https://reactjs.org/docs/context#contextconsumer).
 */
const DataCacheContext = createContext();

export default DataCacheContext;
