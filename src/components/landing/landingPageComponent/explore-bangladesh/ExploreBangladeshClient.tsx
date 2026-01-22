'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ExploreBangladeshUI = dynamic(() => import('./ExploreBangladeshUI'), { ssr: false });

export default function ExploreBangladeshClient({ destinations: initialDestinations }: { destinations: any[] }) {
  const [destinations] = useState(initialDestinations);

  return <ExploreBangladeshUI destinations={destinations} />;
}
