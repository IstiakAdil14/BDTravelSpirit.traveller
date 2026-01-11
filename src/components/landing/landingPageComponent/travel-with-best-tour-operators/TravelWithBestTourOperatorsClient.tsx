'use client';

import React, { useEffect, useState } from 'react';
import TravelWithBestTourOperatorsUI from './TravelWithBestTourOperatorsUI';

export default function TravelWithBestTourOperatorsClient() {
  const [operators, setOperators] = useState([]);

  useEffect(() => {
    fetch('/api/tour-operators')
      .then(res => res.json())
      .then(data => setOperators(data.data || []));
  }, []);

  return (
    <TravelWithBestTourOperatorsUI operators={operators} />
  );
}
