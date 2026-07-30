// =============== LocationCard Types ===============
export interface LocationCardData {
  _id?: string;
  name: string;
  slug: string;
  region: string;
  shortDescription: string;
  duration: string;
  rating: number;
  price: number;
  image?: string;
  seo?: {
    ogImage?: string;
  };
}

// =============== TourRelatedTours Types ===============
export interface RelatedTourData {
  _id: string;
  title: string;
  slug: string;
  division?: string;
  region?: string;
  location?: string;
  district?: string;
  heroImage?: {
    publicUrl?: string;
  };
  ratings?: {
    average?: number;
  };
  rating?: number;
  durationDays?: number;
  duration?: {
    days?: number;
  };
  basePrice?: {
    currency?: string;
    amount?: number;
  };
  priceFrom?: number;
}

export interface TourWithRecommendations {
  _id: string;
  recommendations?: RelatedTourData[];
}

// =============== Popular Tours API Types ===============
export interface PopularTourResponse {
  _id: string;
  title: string;
  slug: string;
  destination: string;
  region: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  heroImage: string;
  duration: number;
}