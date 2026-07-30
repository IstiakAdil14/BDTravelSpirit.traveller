'use client';

import { useEffect, useRef } from 'react';
import { FiMapPin, FiNavigation, FiFlag } from 'react-icons/fi';

interface TourLocationMapProps {
  tour: any;
}

interface MapPoint {
  lat: number;
  lng: number;
  label: string;
  type: 'main' | 'departure' | 'destination';
}

function collectPoints(tour: any): MapPoint[] {
  const points: MapPoint[] = [];

  if (tour?.mainLocation?.coordinates?.lat) {
    points.push({
      lat: tour.mainLocation.coordinates.lat,
      lng: tour.mainLocation.coordinates.lng,
      label: tour.mainLocation.name || 'Main Location',
      type: 'main',
    });
  }

  if (tour?.departure?.meetingCoordinates?.lat) {
    points.push({
      lat: tour.departure.meetingCoordinates.lat,
      lng: tour.departure.meetingCoordinates.lng,
      label: tour.departure.meetingPoint || 'Meeting Point',
      type: 'departure',
    });
  }

  (tour?.destinations || []).forEach((dest: any, i: number) => {
    if (dest?.coordinates?.lat) {
      points.push({
        lat: dest.coordinates.lat,
        lng: dest.coordinates.lng,
        label: dest.city || dest.country || `Destination ${i + 1}`,
        type: 'destination',
      });
    }
  });

  return points;
}

const COLORS: Record<MapPoint['type'], string> = {
  main: '#3b82f6',
  departure: '#f59e0b',
  destination: '#10b981',
};

export default function TourLocationMap({ tour }: TourLocationMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const points = collectPoints(tour);

  useEffect(() => {
    if (!mapContainer.current || points.length === 0) return;

    let cancelled = false;
    let map: any;

    import('leaflet').then((L) => {
      if (cancelled || !mapContainer.current) return;

      // Remove stale Leaflet instance if container was already initialized
      if ((mapContainer.current as any)._leaflet_id) {
        delete (mapContainer.current as any)._leaflet_id;
      }
      // Fix default icon paths broken by webpack
      delete (L.default.Icon.Default.prototype as any)._getIconUrl;
      L.default.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      });

      const center = points[0];
      map = L.default.map(mapContainer.current!, { zoomControl: true });
      mapRef.current = map;

      L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      points.forEach((point) => {
        const color = COLORS[point.type];
        const typeLabel =
          point.type === 'main' ? 'Main Location'
          : point.type === 'departure' ? 'Departure Point'
          : 'Destination';

        const icon = L.default.divIcon({
          className: '',
          html: `<div style="
            width:28px; height:28px; border-radius:50% 50% 50% 0;
            background:${color}; border:3px solid white;
            box-shadow:0 2px 8px rgba(0,0,0,0.35);
            transform:rotate(-45deg);
          "></div>`,
          iconSize: [28, 28],
          iconAnchor: [14, 28],
          popupAnchor: [0, -30],
        });

        L.default.marker([point.lat, point.lng], { icon })
          .addTo(map)
          .bindPopup(`
            <div style="font-family:sans-serif; min-width:130px; padding:2px">
              <div style="font-weight:700; color:#1e293b; font-size:13px">${point.label}</div>
              <div style="font-size:11px; color:#64748b; margin-top:3px">${typeLabel}</div>
            </div>
          `);
      });

      if (points.length === 1) {
        map.setView([center.lat, center.lng], 11);
      } else {
        const bounds = L.default.latLngBounds(points.map((p) => [p.lat, p.lng]));
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    });

    return () => {
      cancelled = true;
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  if (points.length === 0) return null;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        crossOrigin=""
      />
      <div className="bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <FiMapPin className="text-red-500" size={20} />
          <h3 className="font-bold text-gray-800 text-lg">Tour Location</h3>
          <div className="ml-auto flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> Main
            </span>
            {points.some((p) => p.type === 'departure') && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> Departure
              </span>
            )}
            {points.some((p) => p.type === 'destination') && (
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Destinations
              </span>
            )}
          </div>
        </div>

        {/* Map */}
        <div ref={mapContainer} className="w-full h-[420px]" />

        {/* Points list */}
        {points.length > 1 && (
          <div className="px-6 py-3 border-t border-gray-100 flex flex-wrap gap-4">
            {points.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs text-gray-600">
                {p.type === 'main' && <FiMapPin className="text-blue-500" size={13} />}
                {p.type === 'departure' && <FiNavigation className="text-amber-500" size={13} />}
                {p.type === 'destination' && <FiFlag className="text-emerald-500" size={13} />}
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
