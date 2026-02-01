'use client';

import { useState } from 'react';

export default function SeedOperators() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const seedOperators = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seed-operators', { method: 'POST' });
      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult('Error: ' + error);
    }
    setLoading(false);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Seed Tour Operators</h1>
      <button 
        onClick={seedOperators}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Seeding...' : 'Seed Operators'}
      </button>
      {result && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {result}
        </pre>
      )}
    </div>
  );
}