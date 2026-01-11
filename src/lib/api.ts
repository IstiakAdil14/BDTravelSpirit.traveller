import { Tour, Faq, Review, Guide, ApiSuccess } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_URL;

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}`);
  }

  const json = await res.json();
  if (!json.success) {
    throw new Error("API returned success=false");
  }

  return json.data as T;
}

/* ================= TOURS ================= */

export async function getTour(tourId: string) {
  return fetchJSON<{ tour: Tour; recommendedGuides: Guide[] }>(
    `${BASE_URL}/api/tours/${tourId}`
  );
}

/* ================= FAQ ================= */

export async function getFaqs(tourId: string, page = 1, limit = 10) {
  return fetchJSON<{ faqs: Faq[]; total: number; page: number }>(
    `${BASE_URL}/api/tours/${tourId}/faqs?page=${page}&limit=${limit}`
  );
}

export async function likeFaq(tourId: string, faqId: string) {
  return fetchJSON<Faq>(`${BASE_URL}/api/tours/${tourId}/faqs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ faqId, action: "like" }),
  });
}

/* ================= REVIEWS ================= */

export async function getReviews(
  tourId: string,
  cursor?: string,
  limit = 10
) {
  const query = cursor ? `?cursor=${cursor}&limit=${limit}` : `?limit=${limit}`;

  return fetchJSON<{ reviews: Review[]; nextCursor: string | null }>(
    `${BASE_URL}/api/tours/${tourId}/reviews${query}`
  );
}

/* ================= GUIDES ================= */

export async function getRecommendedGuides(tourId: string) {
  return fetchJSON<{ top10: Guide[]; rest: Guide[] }>(
    `${BASE_URL}/api/tours/${tourId}/recommendate-guides`
  );
}
