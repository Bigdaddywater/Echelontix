import dynamic from 'next/dynamic';
import React from 'react';

// Catch-all route to handle subpaths (/explore, /login, etc.) through the client-side SPA router
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function CatchAll() {
  return <App />;
}

