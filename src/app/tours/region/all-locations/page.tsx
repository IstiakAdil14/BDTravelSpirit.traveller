// app/tours/region/all-locations/page.tsx
import React from "react";
import { getLocationsForRegion } from "@/lib/regionLocationsService";
import LocationsGrid from "@/components/tours/[region]/all-locations/LocationsGrid";

type Props = { searchParams: { region?: string } };

export default async function Page({ searchParams }: Props) {
  const { region } = await searchParams;
  const regionName = region || 'dhaka';
  const locations = await getLocationsForRegion(regionName);

  if (!locations || locations.length === 0) {
    return (
      <main style={{ padding: 24 }}>
        <h1>No locations found in {regionName}</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 24 }}>
      <h1>All locations in {regionName}</h1>
      <p>{locations.length} locations</p>

      <LocationsGrid region={regionName} locations={locations} />
    </main>
  );
}
