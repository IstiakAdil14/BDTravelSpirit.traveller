// src/lib/fake-tours.ts
// Deterministic faker generator for dev. Uses seed to keep reproducible output.
// Exports generateTour, generateTours, generateFAQs, generateReviews, generateGuides, paginate, topFAQs, faqPage.
import { faker } from '@faker-js/faker';
import { encodeTourId } from '../utils/encodeTourId';
import type { TourFull, TourSummary, FAQ, Review, Guide, Media } from '../types/tour';

export type GenOptions = {
  seed?: number;
  imageHost?: string; // base host for generated images (picsum by default)
};

const DEFAULTS: Required<GenOptions> = { seed: 12345, imageHost: 'https://picsum.photos' };

function ensureSeed(seed?: number) {
  const s = seed ?? DEFAULTS.seed;
  faker.seed(s);
  return s;
}

function mediaUrl(host: string, id: string, i = 0, w = 1200, h = 800) {
  return `${host}/seed/${encodeURIComponent(id)}-${i}/${w}/${h}`;
}

function makeMedia(id: string, i = 0, opts: Required<GenOptions>): Media {
  return {
    url: mediaUrl(opts.imageHost, id, i),
    type: 'image',
    alt: `Photo ${i + 1} for tour ${id}`,
    width: 1200,
    height: 800,
  };
}

export function generateTour(id: string, opts: GenOptions = {}): TourFull {
  const settings = { ...DEFAULTS, ...opts };
  ensureSeed(settings.seed);

  const title = `${faker.location.city()} Explorer`;
  const heroMedia = makeMedia(id, 0, settings);
  const created = faker.date.past({ years: 2 });
  const updated = faker.date.recent({ days: 10 });

  const gallery = Array.from({ length: 6 }).map((_, i) => makeMedia(id, i, settings));
  const itinerary = Array.from({ length: faker.number.int({ min: 2, max: 7 }) }).map((_, idx) => ({
    day: idx + 1,
    title: faker.company.buzzPhrase(),
    description: faker.lorem.paragraph(),
  }));

  const summary: TourSummary = {
    id,
    encodedId: encodeTourId(id),
    title,
    shortDescription: faker.company.catchPhrase(),
    heroImage: heroMedia.url,
    priceFrom: faker.number.int({ min: 50, max: 1000 }),
    rating: Number(faker.number.float({ min: 3, max: 5, fractionDigits: 1 }).toFixed(1)),
    reviews: faker.number.int({ min: 10, max: 500 }),
    duration: (itinerary.length || 1).toString(),
    groupSize: faker.number.int({ min: 2, max: 20 }).toString(),
  };

  const tour: TourFull = {
    ...summary,
    slug: title.toLowerCase().replace(/\s+/g, '-'),
    gallery,
    short: faker.lorem.sentence(),
    description: faker.lorem.paragraphs({ min: 2, max: 5 }),
    highlights: Array.from({ length: 5 }).map(() => faker.hacker.phrase()),
    itinerary,
    inclusions: ['Breakfast', 'Local guide', 'Transfers'].slice(0, faker.number.int({ min: 1, max: 3 })),
    exclusions: ['Flights', 'Travel insurance'],
    durationDays: itinerary.length || 1,
    location: {
      country: faker.location.country(),
      region: faker.location.state(),
      coords: { lat: Number(faker.location.latitude()), lng: Number(faker.location.longitude()) },
    },
    hostGuideId: faker.string.uuid(),
    stats: {
      totalReviews: 0,
      averageRating: summary.rating,
      participants: faker.number.int({ min: 10, max: 500 }),
    },
    createdAt: created.toISOString(),
    updatedAt: updated.toISOString(),
  };

  return tour;
}

export function generateTours(count: number, opts: GenOptions = {}): TourSummary[] {
  ensureSeed(opts.seed);
  const n = Math.max(0, Math.min(1000, count));
  return Array.from({ length: n }).map((_, i) => {
    const id = `tour-${i + 1}`;
    const t = generateTour(id, opts);
    const {
      slug,
      gallery,
      short,
      description,
      highlights,
      itinerary,
      inclusions,
      exclusions,
      durationDays,
      location,
      hostGuideId,
      stats,
      createdAt,
      updatedAt,
      ...summary
    } = t as any;
    return summary as TourSummary;
  });
}

export function generateFAQs(tourId: string, count: number, opts: GenOptions = {}): FAQ[] {
  ensureSeed(opts.seed);
  const clamped = Math.max(0, Math.min(200, count));
  return Array.from({ length: clamped }).map((_, i) => ({
    id: `${tourId}-faq-${i + 1}`,
    tourId,
    question: faker.lorem.sentence(),
    answer: faker.lorem.paragraph(),
    likes: faker.number.int({ min: 0, max: 120 }),
    createdAt: faker.date.recent({ days: 365 }).toISOString(),
  }));
}

// Return top K FAQs sorted by likes descending (useful for initial SSR top 10)
export function topFAQs(faqs: FAQ[], top = 10): FAQ[] {
  return [...faqs].sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0)).slice(0, top);
}

// Simple paginated FAQ response shape: { total, faqs }
export function faqPage(faqs: FAQ[], skip = 0, limit = 10) {
  const total = faqs.length;
  const page = faqs.slice(skip, skip + limit);
  return { total, faqs: page, skip, limit };
}

export function generateReviews(tourId: string, count: number, opts: GenOptions = {}): Review[] {
  ensureSeed(opts.seed);
  const clamped = Math.max(0, Math.min(1000, count));
  return Array.from({ length: clamped }).map((_, i) => {
    const date = faker.date.past({ years: 2 });
    const avatarIndex = ((hashString(tourId) + i) % 70) + 1;
    return {
      id: `${tourId}-rev-${i + 1}`,
      tourId,
      author: { id: faker.string.uuid(), name: faker.person.fullName(), avatar: `https://i.pravatar.cc/150?img=${avatarIndex}` },
      rating: faker.number.int({ min: 1, max: 5 }),
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraphs({ min: 1, max: 2 }),
      createdAt: date.toISOString(),
    } as Review;
  });
}

export function generateGuides(count: number, opts: GenOptions = {}): Guide[] {
  ensureSeed(opts.seed);
  const clamped = Math.max(0, Math.min(50, count));
  return Array.from({ length: clamped }).map((_, i) => ({
    id: `guide-${i + 1}`,
    name: faker.person.fullName(),
    rating: Number(faker.number.float({ min: 3, max: 5, fractionDigits: 1 }).toFixed(1)),
    experienceYears: faker.number.int({ min: 1, max: 25 }),
    languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'Bengali', 'Hindi', 'Arabic', 'Chinese'], faker.number.int({ min: 1, max: 3 })),
    profileImage: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  }));
}

function hashString(s: string) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

export function paginate<T>(items: T[], skip = 0, limit = 10) {
  const total = items.length;
  const page = items.slice(skip, skip + limit);
  return { total, items: page, skip, limit };
}

export default {
  generateTour,
  generateTours,
  generateFAQs,
  generateReviews,
  generateGuides,
  paginate,
  topFAQs,
  faqPage,
};
