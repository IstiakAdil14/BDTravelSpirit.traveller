'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const ExploreBangladeshUI = dynamic(() => import('./ExploreBangladeshUI'), { ssr: false });

export default function ExploreBangladeshClient() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(data => {
        setDestinations(data);
        setLoading(false);
      })
      .catch(() => {
        setDestinations([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center">Loading destinations...</div>
        </div>
      </section>
    );
  }

  return <ExploreBangladeshUI destinations={destinations} />;
}
