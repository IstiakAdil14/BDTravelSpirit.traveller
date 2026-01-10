'use client';
import { useCallback } from 'react';

export default function useDateFormat() {
  return useCallback((iso: string) => {
    try {
      return new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'short', day: 'numeric' }).format(new Date(iso));
    } catch {
      return iso;
    }
  }, []);
}
