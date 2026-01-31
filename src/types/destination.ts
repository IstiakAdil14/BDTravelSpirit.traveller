export interface Destination {
  _id: string;
  name: string;
  description: string;
  location: string;
  region?: string;
  category: string;
  image?: string;
  images?: string[];
  featured?: boolean;
  rating?: number;
  reviewCount?: number;
  price?: number;
  duration?: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  activities?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface DestinationFilters {
  category?: string;
  region?: string;
  sortBy?: 'name' | 'rating' | 'price' | 'createdAt';
  limit?: number;
  offset?: number;
  featured?: boolean;
}

export interface DestinationResponse {
  success: boolean;
  data: Destination[];
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface AnalyticsEvent {
  event: string;
  variant: string;
  destinationId: string;
  index: number;
  timestamp: number;
}