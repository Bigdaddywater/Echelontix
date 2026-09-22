import dynamic from 'next/dynamic';
import React from 'react';

// Custom 404 page that falls back to the main App
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function Custom404() {
  return <App />;
}

