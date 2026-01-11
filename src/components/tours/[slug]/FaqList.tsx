// app/tours/[slug]/components/FaqList.tsx
"use client";
import React from "react";
import { useInfiniteFetch } from "@/hooks/useInfiniteFetch";

export default function FaqList({ tourId, initial }: any) {
  const endpoint = `/api/tours/${tourId}/faqs`;
  const { items, loadMore, loading, done } = useInfiniteFetch(endpoint, initial);

  return (
    <div>
      {items.map((f: any) => (
        <details key={f._id} style={{ marginBottom: 8 }}>
          <summary style={{ fontWeight: 600 }}>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
      {!done && (
        <button onClick={() => loadMore()} disabled={loading}>
          {loading ? "Loading..." : "Load more FAQs"}
        </button>
      )}
    </div>
  );
}
