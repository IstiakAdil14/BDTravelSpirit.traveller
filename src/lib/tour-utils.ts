// URL and slug utilities for tours
export const REGIONS = {
  'dhaka': 'Dhaka',
  'chittagong': 'Chittagong', 
  'sylhet': 'Sylhet',
  'barishal': 'Barishal',
  'khulna': 'Khulna',
  'mymensingh': 'Mymensingh',
  'rajshahi': 'Rajshahi',
  'rangpur': 'Rangpur'
} as const;

export const CATEGORIES = {
  'adventure': 'Adventure',
  'cultural': 'Cultural',
  'nature': 'Nature', 
  'historical': 'Historical',
  'beach': 'Beach',
  'hill-station': 'Hill Station'
} as const;

export const PRICE_RANGES = {
  'budget': 'Budget',
  'mid-range': 'Mid Range',
  'luxury': 'Luxury'
} as const;

export const DURATIONS = {
  'day-trip': 'Day Trip',
  'weekend': 'Weekend',
  'week-long': 'Week Long'
} as const;

// Convert display name to slug
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Convert slug to display name
export function fromSlug(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Build tour URL with query parameters
export function buildTourUrl(params: {
  region?: string;
  location?: string;
  category?: string;
  price?: string;
  duration?: string;
}): string {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  
  const queryString = searchParams.toString();
  return `/tours${queryString ? `?${queryString}` : ''}`;
}

// Parse current URL parameters
export function parseTourParams(searchParams: URLSearchParams) {
  return {
    region: searchParams.get('region'),
    location: searchParams.get('location'),
    category: searchParams.get('category'),
    price: searchParams.get('price'),
    duration: searchParams.get('duration')
  };
}