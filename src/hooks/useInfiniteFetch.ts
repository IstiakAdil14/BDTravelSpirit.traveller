'use client';
import { useState } from 'react';

export default function useInfiniteFetch<T>() {
  const [items, setItems] = useState<T[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);

  async function fetchMore(url: string, limit = 10) {
    setLoading(true);
    const res = await fetch(`${url}?limit=${limit}&skip=${skip}`, { cache: 'no-store' });
    if (!res.ok) {
      setLoading(false);
      return null;
    }
    const json = await res.json();
    setItems((s) => s.concat(json?.reviews ?? json?.faqs ?? json?.guides ?? []));
    setSkip((s) => s + (json?.reviews?.length ?? json?.faqs?.length ?? json?.guides?.length ?? 0));
    setLoading(false);
    return json;
  }

  return { items, loading, fetchMore, setItems, setSkip };
}
