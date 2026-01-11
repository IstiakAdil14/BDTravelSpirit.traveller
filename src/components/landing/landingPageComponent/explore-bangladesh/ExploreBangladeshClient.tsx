'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ExploreBangladeshUI = dynamic(() => import('./ExploreBangladeshUI'), { ssr: false });

export default function ExploreBangladeshClient() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    fetch('/api/bangladesh-destinations')
      .then(res => res.json())
      .then(data => setDestinations(data.data || []));
  }, []);

  return <ExploreBangladeshUI destinations={destinations} />;
}
