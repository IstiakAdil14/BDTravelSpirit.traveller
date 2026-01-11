// app/tours/[slug]/components/GuideCards.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Guide } from "@/types/tour";

type Props = {
  tourId: string;
  initialGuides?: Guide[];
};

export default function GuideCards({ tourId, initialGuides = [] }: Props) {
  const [guides, setGuides] = useState<Guide[]>(initialGuides);
  const [offset, setOffset] = useState(initialGuides.length);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const limit = 6;

  useEffect(() => {
    setGuides(initialGuides);
    setOffset(initialGuides.length);
  }, [initialGuides]);

  const loadMore = async () => {
    if (loading) return;
    setLoading(true);
    const res = await fetch(`/api/tours/${tourId}/guides?offset=${offset}&limit=${limit}`);
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const json = await res.json();
    setGuides((g) => [...g, ...json.data]);
    setOffset((o) => o + json.data.length);
    setTotal(json.total);
    setLoading(false);
  };

  return (
    <section>
      <h3>Top Guides</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 12 }}>
        {guides.map((g) => (
          <div key={g._id} style={{ border: "1px solid #eee", padding: 12 }}>
            <img src={g.avatar || "/avatar-placeholder.png"} alt={g.name} style={{ width: "100%", height: 120, objectFit: "cover" }} />
            <h4>{g.name}</h4>
            <div>{g.rating ?? "—"} ★</div>
          </div>
        ))}
      </div>

      {total === null || offset < (total ?? Infinity) ? (
        <button onClick={loadMore} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Loading..." : "Load more guides"}
        </button>
      ) : null}
    </section>
  );
}
