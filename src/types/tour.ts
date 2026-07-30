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
  bio?: string;
  phone?: string;
  social?: any[];
  address?: any;
  status?: string;
}

export interface Media {
  _id: ID;
  tourId: ID;
  url: string;
  type: "image" | "video";
  order?: number;
}

export interface TourDeparture {
  date: string | Date;
  seatsTotal: number;
  seatsBooked: number;
  meetingPoint?: string;
}

export interface TourOperatingWindow {
  startDate: string | Date;
  endDate: string | Date;
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface UnitProps {
  value: number;
  label: string;
}

export interface TourCountdownProps {
  /** ISO string or Date for the single scheduled departure */
  departure?: TourDeparture;
  /** Operating window when a departure date is not set */
  operatingWindow?: TourOperatingWindow;
  /** Duration in days (used to infer end date if operatingWindow is absent) */
  durationDays?: number;
}
