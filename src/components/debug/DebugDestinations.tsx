'use client';

import { useEffect } from 'react';

interface DebugDestinationsProps {
    destinations: any[];
}

export default function DebugDestinations({ destinations }: DebugDestinationsProps) {
    useEffect(() => {
        console.log('Destinations data:', destinations);
        destinations.forEach((dest, index) => {
            console.log(`Destination ${index + 1}:`, {
                name: dest.name,
                image: dest.image,
                tourPlaces: dest.tourPlaces,
                _id: dest._id
            });
        });
    }, [destinations]);

    return (
        <div className="fixed top-4 right-4 bg-black text-white p-4 rounded-lg z-50 max-w-md text-xs">
            <h3 className="font-bold mb-2">Debug: Destinations ({destinations.length})</h3>
            {destinations.slice(0, 3).map((dest, index) => (
                <div key={dest._id} className="mb-2 border-b border-gray-600 pb-2">
                    <div><strong>Name:</strong> {dest.name}</div>
                    <div><strong>Image:</strong> {dest.image ? 'Yes' : 'No'}</div>
                    <div><strong>Tours:</strong> {dest.tourPlaces || 'N/A'}</div>
                </div>
            ))}
            {destinations.length > 3 && <div>... and {destinations.length - 3} more</div>}
        </div>
    );
}