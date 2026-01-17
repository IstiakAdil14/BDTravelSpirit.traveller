"use client";


import { MapPin } from "lucide-react";


export default function RegionMap({ mapUrl }: { mapUrl: string }) {
return (
<div className="rounded-2xl overflow-hidden shadow-md">
<iframe
src={mapUrl}
loading="lazy"
className="w-full h-[400px] border-0"
/>


<div className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
<MapPin className="w-4 h-4" />
<span>Showing key locations in this region</span>
</div>
</div>
);
}