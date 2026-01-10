// src/lib/analyticsHooks.ts
'use client';
import { useEffect } from 'react';

export function useImpression(eventName: string, payload?: Record<string, any>) {
  useEffect(() => {
    const ev = { event: 'impression', name: eventName, ...payload };
    // send to analytics provider if present; window.gtag / window.dataLayer
    if ((window as any).gtag) {
      (window as any).gtag('event', 'impression', ev);
    } else if ((window as any).dataLayer) {
      (window as any).dataLayer.push(ev);
    }
  }, [eventName]);
}

export function trackEvent(eventName: string, payload?: Record<string, any>) {
  if ((window as any).gtag) (window as any).gtag('event', eventName, payload);
  else if ((window as any).dataLayer) (window as any).dataLayer.push({ event: eventName, ...payload });
}
