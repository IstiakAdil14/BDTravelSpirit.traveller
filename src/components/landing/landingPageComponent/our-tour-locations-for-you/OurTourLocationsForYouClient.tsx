'use client';

import OurTourLocationsForYouUI from './OurTourLocationsForYouUI';
import { useEffect, useState } from 'react';

export default function OurTourLocationsForYouClient({ tourLocations: initialTourLocations }: { tourLocations: any[] }) {
  const [tourLocations] = useState(initialTourLocations);


  const stats = {
    destinations: '40+',
    travelers: '10+',
    rating: '4.8',
    successRate: '50%'
  };

  return (
    <OurTourLocationsForYouUI
      tourLocations={tourLocations}
      stats={stats}
    />
  );
}


