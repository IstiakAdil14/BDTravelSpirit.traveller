// app/tours/[slug]/components/ReviewsList.tsx
"use client";
import React from "react";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";
import { useDateFormat } from "@/hooks/useDateFormat";

export default function ReviewsList({ tourId, initial }: any) {
  const endpoint = `/api/tours/${tourId}/reviews`;
  const { items, loadMore, loading, done } = useInfiniteFetch(endpoint, initial);

  return (
    <div>
      {items.map((r: any) => (
        <article key={r._id} style={{ borderBottom: "1px solid #eee", padding: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <strong>{r.userName}</strong>
            <small>{useDateFormat(r.createdAt)}</small>
          </div>
          <div>{r.rating} ★</div>
          <p>{r.comment}</p>
        </article>
      ))}
      {!done && (
        <button onClick={() => loadMore()} disabled={loading} style={{ marginTop: 12 }}>
          {loading ? "Loading..." : "Load more reviews"}
        </button>
      )}
    </div>
  );
}
