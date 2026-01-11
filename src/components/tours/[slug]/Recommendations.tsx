// app/tours/[slug]/components/Recommendations.tsx
import React from "react";
import { Tour } from "@/types/tour";
import Link from "next/link";

export default function Recommendations({ items }: { items: Tour[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section>
      <h3>Recommended tours</h3>
      <div style={{ display: "flex", gap: 12, overflowX: "auto", padding: 8 }}>
        {items.map((t) => (
          <Link key={t._id} href={`/tours/${t.slug}`} style={{ minWidth: 220, border: "1px solid #eee", padding: 8 }}>
            <img src={t.heroImage || "/og-default.jpg"} alt={t.title} style={{ width: "100%", height: 120, objectFit: "cover" }} />
            <h4>{t.title}</h4>
            <div>From ${t.priceFrom}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
