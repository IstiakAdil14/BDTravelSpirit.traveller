// app/tours/[region]/all-locations/components/LocationsGrid.tsx
"use client";
import React from "react";
import Link from "next/link";
import { LocationSummary } from "@/lib/regionLocationsService";

export default function LocationsGrid({ region, locations }: { region: string; locations: LocationSummary[] }) {
  return (
    <section>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {locations.map((loc) => (
          <article
            key={loc.location}
            style={{
              border: "1px solid #e6e6e6",
              borderRadius: 8,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <Link 
              href={`/tours/${region}/locations/${encodeURIComponent(loc.location)}`}
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
                <div
                  style={{
                    height: 140,
                    background: "#f6f6f6",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loc.sampleImage ? (
                    <img
                      src={loc.sampleImage}
                      alt={loc.location}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 18, fontWeight: 600 }}>{loc.location}</span>
                  )}
                </div>
                <div style={{ padding: 12 }}>
                  <h3 style={{ margin: "0 0 8px 0", fontSize: 16 }}>{loc.location}</h3>
                  <p style={{ color: "#666", fontSize: 14 }}>{loc.count} tour{loc.count > 1 ? "s" : ""}</p>
                </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
