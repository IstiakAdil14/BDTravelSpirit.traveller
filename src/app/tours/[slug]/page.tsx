// app/tours/[slug]/page.tsx
import React from "react";
import { notFound } from "next/navigation";
import TourHero from "@/components/tours/[slug]/TourHero";
import MediaCarousel from "@/components/tours/[slug]/MediaCarousel";
import TabsReviewsFaqs from "@/components/tours/[slug]/TabsReviewsFaqs";
import GuideCards from "@/components/tours/[slug]/GuideCards";
import Recommendations from "@/components/tours/[slug]/Recommendations";
import RecentViews from "@/components/tours/[slug]/RecentViews";
import { Tour } from "@/types/tour";
import { getFullTourBySlug } from "@/lib/tourService";

type Props = { params: Promise<{ slug: string }> };

export default async function Page(props: Props) {
  const params = await props.params;
  const payload = await getFullTourBySlug(params.slug);
  if (!payload) notFound();

  const { tour, gallery, reviews, faqs, guides, recommendations } = payload as {
    tour: Tour;
    gallery: any[];
    reviews: any[];
    faqs: any[];
    guides: any[];
    recommendations: Tour[];
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    image: tour.heroImage,
    url: `${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/tours/${tour.slug}`,
    offers: {
      "@type": "Offer",
      price: tour.priceFrom ?? undefined,
      priceCurrency: "USD",
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <TourHero tour={tour} />
      <MediaCarousel items={gallery} />
      <section>
        <h2>About this tour</h2>
        <p>{tour.description}</p>
      </section>

      <TabsReviewsFaqs tourId={tour._id} initialReviews={reviews} initialFaqs={faqs} />

      <GuideCards initialGuides={guides} tourId={tour._id} />

      <Recommendations items={recommendations} />

      <RecentViews />
    </main>
  );
}
