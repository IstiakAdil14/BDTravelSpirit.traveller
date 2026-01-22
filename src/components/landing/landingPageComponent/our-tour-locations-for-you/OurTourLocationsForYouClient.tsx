'use client';

import OurTourLocationsForYouUI from './OurTourLocationsForYouUI';
import { useEffect, useState } from 'react';

export default function OurTourLocationsForYouClient({ tourLocations: initialTourLocations }: { tourLocations: any[] }) {
  const [tourLocations] = useState(initialTourLocations);


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


