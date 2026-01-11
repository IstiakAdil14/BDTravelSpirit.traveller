// app/tours/[slug]/components/MediaCarousel.tsx
"use client";
import { Media } from "@/types/tour";

export default function MediaCarousel({ items }: { items: Media[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: 12 }}>
      {items.map((m) => (
        <div key={m._id} style={{ minWidth: 300 }}>
          {m.type === "image" ? (
            <img src={m.url} alt="" style={{ width: "100%", height: 200, objectFit: "cover" }} />
          ) : (
            <video src={m.url} controls style={{ width: "100%", height: 200 }} />
          )}
        </div>
      ))}
    </div>
  );
}
