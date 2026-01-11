'use client';

import OurTourLocationsForYouUI from './OurTourLocationsForYouUI';
import { useEffect, useState } from 'react';

export default function OurTourLocationsForYouClient() {
  const [tourLocations, setTourLocations] = useState([]);
  
  useEffect(() => {
    fetch('/api/tour-locations')
      .then(res => res.json())
      .then(data => setTourLocations(data.data || []));
  }, []);

  const stats = {
    destinations: '50+',
    travelers: '10k+',
    rating: '4.8',
    successRate: '98%'
  };

  return (
    <OurTourLocationsForYouUI
      tourLocations={tourLocations}
      stats={stats}
    />
  );
}


