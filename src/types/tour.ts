// src/types/tour.ts
export type ID = string;

export interface Tour {
  _id: ID;
  slug: string;
  title: string;
  description: string;
  heroImage?: string;
  priceFrom?: number;
  durationDays?: number;
  location?: string;
  rating?: number;
  stats?: { travelers: number; reviews: number };
  createdAt?: string;
  updatedAt?: string;
}

export interface Review {
  _id: ID;
  tourId: ID;
  userName: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Faq {
  _id: ID;
  tourId: ID;
  question: string;
  answer: string;
  createdAt: string;
}

export interface Guide {
  _id: ID;
  tourId: ID;
  name: string;
  avatar?: string;
  rating?: number;
  createdAt?: string;
}

export interface Media {
  _id: ID;
  tourId: ID;
  url: string;
  type: "image" | "video";
  order?: number;
}
