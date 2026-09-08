import dynamic from 'next/dynamic';
import React from 'react';

// Load the existing SPA entry client-side to avoid SSR issues with browser APIs
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function Home() {
  return <App />;
}
