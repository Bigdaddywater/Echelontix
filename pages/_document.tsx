import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
  return (
    <Html lang="en" className="dark scroll-smooth">
      <Head>
        <meta name="description" content="Echelontix - The premier ticketing and event discovery ecosystem for Nigeria and beyond. Experience concerts, tech summits, nightlife, campus festivals, and curated VIP gatherings." />
        <meta property="og:title" content="Echelontix | Elevate Your Experience" />
        <meta property="og:description" content="Discover, buy, and organize world-class live experiences in Lagos, Abuja, Port Harcourt, and major campuses." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='gold' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%23F5D061'/%3E%3Cstop offset='50%25' stop-color='%23E5A93C'/%3E%3Cstop offset='100%25' stop-color='%239E7019'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='24' fill='%230A0A0C'/%3E%3Cpath d='M50 16L78 34L50 52L22 34Z' fill='url(%23gold)' opacity='0.9'/%3E%3Cpath d='M50 38L78 56L50 74L22 56Z' fill='url(%23gold)' opacity='0.75'/%3E%3Cpath d='M50 60L78 78L50 96L22 78Z' fill='url(%23gold)' opacity='0.55'/%3E%3C/svg%3E" />
      </Head>
      <body className="bg-[#070709] text-zinc-100 antialiased selection:bg-[#E5A93C] selection:text-black min-h-screen overflow-x-hidden font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

