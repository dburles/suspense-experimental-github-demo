import React, { Suspense } from 'react';
import { Router } from './router';
import ErrorBoundary from './ErrorBoundary';
import Spinner from './Spinner';
import { DataCacheContext } from './suspense-data-loader';
import dataCache from './dataCache';

function App() {
  return (
    <Layout>
      <Router />
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <div className="App">
      <header className="App-header">
        <DataCacheContext.Provider value={dataCache}>
          <ErrorBoundary fallback={<h1>Oops! Check the console.</h1>}>
            <Suspense fallback={<Spinner isBig={true} />}>{children}</Suspense>
          </ErrorBoundary>
        </DataCacheContext.Provider>
      </header>
    </div>
  );
}

export default App;
