export default function RegionHeader({ region }: { region: string }) {
return (
<div className="text-center max-w-3xl mx-auto space-y-3">
<h1 className="text-4xl font-bold capitalize">Explore {region}</h1>
<p className="text-muted-foreground">
Discover the best tour destinations, hand-picked for this region.
</p>
</div>
);
}