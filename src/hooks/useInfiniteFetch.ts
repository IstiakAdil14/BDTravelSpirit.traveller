// src/hooks/useInfiniteFetch.ts
import { useState, useCallback } from "react";

export function useInfiniteFetch<T>(endpoint: string, initialData: T[] = []) {
  const [items, setItems] = useState<T[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const loadMore = useCallback(async () => {
    if (loading || done) return;
    setLoading(true);
    const url = new URL(endpoint, window.location.origin);
    if (nextCursor) url.searchParams.set("cursor", nextCursor);
    const res = await fetch(url.toString());
    if (!res.ok) {
      setLoading(false);
      return;
    }
    const json = await res.json();
    const data: T[] = json.data;
    setItems((s) => [...s, ...data]);
    setNextCursor(json.nextCursor ?? null);
    if (!json.nextCursor) setDone(true);
    setLoading(false);
  }, [endpoint, loading, nextCursor, done]);

  return { items, loadMore, loading, nextCursor, done, setItems };
}
