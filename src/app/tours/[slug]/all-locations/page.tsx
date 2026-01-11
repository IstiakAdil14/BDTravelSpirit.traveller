// app/tours/[slug]/all-locations/page.tsx
import React from "react";
import { getLocationsForRegion } from "@/lib/regionLocationsService";
import LocationsGrid from "@/components/tours/[region]/all-locations/LocationsGrid";

type Props = { params: { slug: string } };

export default async function Page({ params }: Props) {
    const raw = params.slug ?? "";
    const region = raw.trim();

    const locations = await getLocationsForRegion(region);

    if (!locations || locations.length === 0) {
        return (
            <main style={{ padding: 24 }}>
                <header>
                    <h1>No locations found in {region}</h1>
                    <p>There are no tours currently listed for this region.</p>
                </header>
            </main>
        );
    }

    return (
        <main style={{ padding: 24 }}>
            <header style={{ marginBottom: 20 }}>
                <h1>All locations in {region}</h1>
                <p>{locations.length} locations</p>
            </header>

            {/* JSON-LD for CollectionPage of locations */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        name: `Locations in ${region}`,
                        description: `All tour locations in ${region}`,
                        url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/tours/${encodeURIComponent(region)}/all-locations`,
                    }),
                }}
            />

            <LocationsGrid region={region} locations={locations} />
        </main>
    );
}
