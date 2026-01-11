// app/tours/[slug]/head.tsx
import React from "react";
import { getFullTourBySlug } from "@/lib/tourService";

type Props = { params: Promise<{ slug: string }> };

export default async function Head(props: Props) {
  const params = await props.params;
  const payload = await getFullTourBySlug(params.slug);
  if (!payload) {
    return (
      <>
        <title>Tour</title>
      </>
    );
  }

  const { tour } = payload;
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";

  const title = `${tour.title} — Book Now | ${tour.location ?? ""}`;
  const description = (tour.description || "").slice(0, 160);
  const canonical = `${base}/tours/${tour.slug}`;
  const image = tour.heroImage || `${base}/og-default.jpg`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    image,
    url: canonical,
    offers: {
      "@type": "Offer",
      price: tour.priceFrom ?? undefined,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: tour.rating
      ? {
        "@type": "AggregateRating",
        ratingValue: tour.rating,
        reviewCount: tour.stats?.reviews ?? 0,
      }
      : undefined,
  };

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
