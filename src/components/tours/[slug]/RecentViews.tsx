// app/tours/[slug]/components/RecentViews.tsx
"use client";
import React from "react";
import { useRecentViews, RecentViewItem } from "@/stores/recentViews";
import Link from "next/link";

export default function RecentViews() {
  const { items, clear } = useRecentViews();

  if (!items || items.length === 0) return null;

  return (
    <aside style={{ marginTop: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h4>Recently viewed</h4>
        <button onClick={clear}>Clear</button>
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((i: RecentViewItem) => (
          <Link key={i.id} href={`/tours/${i.slug}`} style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <img src={i.image || "/og-default.jpg"} alt={i.title} style={{ width: 64, height: 48, objectFit: "cover" }} />
            <div>
              <div>{i.title}</div>
              <small>${i.price}</small>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}
