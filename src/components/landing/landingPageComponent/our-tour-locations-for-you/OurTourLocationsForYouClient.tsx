import React from 'react';
import OurTourLocationsForYouUI from './OurTourLocationsForYouUI';
import { ourTourLocations } from '@/constants/ourTourLocations';

export default function OurTourLocationsForYouClient() {
  const stats = {
    destinations: '50+',
    travelers: '10k+',
    rating: '4.8',
    successRate: '98%'
  };

  return (
    <OurTourLocationsForYouUI
      tourLocations={ourTourLocations}
      stats={stats}
    />
  );
}
