// app/tours/[region]/all-locations/head.tsx
import React from "react";
import { getLocationsForRegion } from "@/lib/regionLocationsService";

type Props = { params: { region: string } };

export default async function Head({ params }: Props) {
  const region = params.region;
  const locations = await getLocationsForRegion(region);

  const title = `Locations in ${region} — ${locations.length} places`;
  const description = `Browse all tour locations in ${region}.`;
  const canonical = `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/tours/${region}/all-locations`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
    </>
  );
}
