"use client";


import { motion } from "framer-motion";


export default function RegionHero({ region, image }: { region: string; image?: string }) {
return (
<motion.div
initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}
className="relative h-[60vh] rounded-3xl overflow-hidden"
>
<img
src={image || `/regions/${region}.jpg`}
alt={region}
className="absolute inset-0 h-full w-full object-cover"
/>


<div className="absolute inset-0 bg-black/50" />


<div className="relative z-10 flex h-full items-center justify-center text-center text-white px-6">
<div className="space-y-4">
<h1 className="text-5xl font-bold capitalize">{region}</h1>
<p className="max-w-xl mx-auto text-lg text-white/90">
Handpicked destinations, premium tours, unforgettable memories.
</p>
</div>
</div>
</motion.div>
);
}