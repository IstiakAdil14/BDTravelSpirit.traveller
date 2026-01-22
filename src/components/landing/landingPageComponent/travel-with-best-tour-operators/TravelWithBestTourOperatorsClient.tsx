'use client';

import React, { useEffect, useState } from 'react';
import TravelWithBestTourOperatorsUI from './TravelWithBestTourOperatorsUI';

export default function TravelWithBestTourOperatorsClient({ initialOperators }: { initialOperators: any[] }) {
  const [operators] = useState(initialOperators);


  return (
    <TravelWithBestTourOperatorsUI operators={operators} />
  );
}
