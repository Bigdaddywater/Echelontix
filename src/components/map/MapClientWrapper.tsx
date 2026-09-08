import dynamic from 'next/dynamic';
import React from 'react';
import type { EventLocationMapProps } from './EventLocationMap';

const EventLocationMap = dynamic(() => import('./EventLocationMap'), { ssr: false });

export default function MapClientWrapper(props: EventLocationMapProps) {
  return <EventLocationMap {...props} />;
}
