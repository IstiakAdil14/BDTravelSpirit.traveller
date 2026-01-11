export interface Tour {
  _id: string;
  title: string;
  slug: string;
  description: string;
  heroImage: string;
  gallery: string[];
  video?: string | null;
  price: number;
  rating: number;
  location: string;
  categories: string[];
  itinerary?: unknown;
}

export interface Faq {
  _id: string;
  tourId: string;
  question: string;
  answer: string;
  likes: number;
}

export interface Review {
  _id: string;
  tourId: string;
  userId?: string;
  author?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Guide {
  _id: string;
  name: string;
  avatar?: string;
  reviewScore: number;
  completedTours: number;
}

export interface ApiSuccess<T> {
  success: true;
  data: T;
  meta?: unknown;
}

export interface ApiError {
  success: false;
  message: string;
}
