'use client';

import React, { useEffect, useState } from 'react';
import TravelWithBestTourOperatorsUI from './TravelWithBestTourOperatorsUI';

export default function TravelWithBestTourOperatorsClient() {
  const [operators, setOperators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/tour-operators')
      .then(res => res.json())
      .then(data => {
        console.log('Tour operators API response:', data);
        setOperators(data.data || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching tour operators:', error);
        setLoading(false);
      });
  }, []);

  return (
    <TravelWithBestTourOperatorsUI operators={operators} />
  );
}
