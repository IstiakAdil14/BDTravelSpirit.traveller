// app/tours/[slug]/components/TourHero.tsx
import { Tour } from "@/types/tour";

export default function TourHero({ tour }: { tour: Tour }) {
  return (
    <header style={{ padding: 24 }}>
      <h1>{tour.title}</h1>
      <p>{tour.location} • {tour.durationDays} days</p>
      <div>
        <strong>From ${tour.priceFrom ?? "Contact"}</strong>
      </div>
      {tour.heroImage && <img src={tour.heroImage} alt={tour.title} style={{ width: "100%", maxHeight: 420, objectFit: "cover" }} />}
    </header>
  );
}
