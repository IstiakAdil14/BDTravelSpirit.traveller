import { useState, useEffect } from 'react';

export function useRegions() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/regions')
      .then(res => res.json())
      .then(data => {
        setRegions(data);
        setLoading(false);
      });
  }, []);

  return { regions, loading };
}