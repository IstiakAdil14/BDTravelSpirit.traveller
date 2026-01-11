// app/tours/[slug]/components/TabsReviewsFaqs.tsx
"use client";
import React from "react";
import ReviewsList from "@/components/tours/[slug]/ReviewsList";
import FaqList from "@/components/tours/[slug]/FaqList";

export default function TabsReviewsFaqs({ tourId, initialReviews, initialFaqs }: any) {
  return (
    <section>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 24 }}>
        <div>
          <h2>Reviews</h2>
          <ReviewsList tourId={tourId} initial={initialReviews} />
          <h2>FAQs</h2>
          <FaqList tourId={tourId} initial={initialFaqs} />
        </div>
        <aside>
          <div style={{ border: "1px solid #eee", padding: 12 }}>Booking widget</div>
        </aside>
      </div>
    </section>
  );
}
