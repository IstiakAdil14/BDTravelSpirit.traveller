import { Map, FileText, MapPin, Flag, Navigation, Heart, Compass, Search } from 'lucide-react';
import { LoaderMetadata } from './types';

// Default metadata for unknown routes
export const defaultMetadata: LoaderMetadata = {
  title: 'Discover Bangladesh',
  subtitle: 'Preparing your next adventure',
  location: 'Bangladesh',
  tags: ['Travel', 'Explore', 'Adventure'],
  image: 'https://images.unsplash.com/photo-1627896157734-44b4eb2b535d?auto=format&fit=crop&w=1200&q=80',
  insightTitle: 'Travel Insight',
  insightText: 'Bangladesh is home to the world\'s longest natural sea beach and the largest mangrove forest.',
  insightImage: null,
  steps: [
    { id: 1, title: 'Bangladesh', subtitle: 'Starting Point', icon: Map },
    { id: 2, title: 'Destinations', subtitle: 'Exploring Options', icon: MapPin },
    { id: 3, title: 'Gathering Info', subtitle: 'Preparing Experience', icon: Search },
    { id: 4, title: 'Adventure Awaits', subtitle: 'Almost There', icon: Flag },
  ],
  checklistItems: [
    { id: 1, title: 'Connecting to servers...', subtitle: 'Establishing route' },
    { id: 2, title: 'Fetching travel data...', subtitle: 'Gathering information' },
    { id: 3, title: 'Loading stunning visuals...', subtitle: 'Preparing gallery' },
    { id: 4, title: 'Finalizing layout...', subtitle: 'Just a moment' },
  ]
};

export function getLoaderMetadata(route: string | null): LoaderMetadata {
  if (!route) return defaultMetadata;

  const url = new URL(route, 'http://localhost'); // Dummy base to parse
  const pathname = url.pathname;
  const searchParams = url.searchParams;

  // 1. Specific Tour Details Routing
  if (pathname.includes('/tours') && searchParams.has('tour')) {
    return {
      ...defaultMetadata,
      title: 'Loading Tour...',
      subtitle: 'Preparing your itinerary',
      location: 'Tour Experience',
      tags: ['Itinerary', 'Adventure', 'Booking'],
      steps: [
        { id: 1, title: 'Destination', subtitle: 'Selected', icon: MapPin },
        { id: 2, title: 'Itinerary', subtitle: 'Building schedule', icon: FileText },
        { id: 3, title: 'Availability', checking: true, subtitle: 'Checking dates', icon: Search },
        { id: 4, title: 'Ready', subtitle: 'All set', icon: Flag },
      ] as any,
      checklistItems: [
        { id: 1, title: 'Loading tour itinerary...', subtitle: 'Schedule is ready' },
        { id: 2, title: 'Fetching pricing details...', subtitle: 'Calculating costs' },
        { id: 3, title: 'Gathering operator info...', subtitle: 'Contact ready' },
        { id: 4, title: 'Finalizing details...', subtitle: 'Just a moment' },
      ]
    };
  }

  // 2. Division / Region Routing
  if (pathname.includes('/tours') && searchParams.has('region')) {
    return {
      ...defaultMetadata,
      title: 'Loading Region...',
      subtitle: 'Discovering hidden gems',
      location: 'Region Map',
      tags: ['Explore', 'Nature', 'Culture'],
      image: defaultMetadata.image,
      insightText: defaultMetadata.insightText,
      steps: [
        { id: 1, title: 'Bangladesh', subtitle: 'Starting Point', icon: Map },
        { id: 2, title: 'Region Selection', subtitle: 'Scanning map', icon: MapPin },
        { id: 3, title: 'Finding Tours', subtitle: 'Analyzing options', icon: Compass },
        { id: 4, title: 'Ready to Go', subtitle: 'Almost There', icon: Flag },
      ],
      checklistItems: [
        { id: 1, title: 'Locating region data...', subtitle: 'Map is ready' },
        { id: 2, title: 'Finding local operators...', subtitle: 'Guides available' },
        { id: 3, title: 'Loading regional tours...', subtitle: 'Experiences found' },
        { id: 4, title: 'Preparing your journey...', subtitle: 'Just a moment' },
      ]
    };
  }

  // 3. Wishlist Routing
  if (pathname.includes('/wishlist') || searchParams.get('page') === 'wishlist') {
    return {
      ...defaultMetadata,
      title: 'Your Saved Adventures',
      subtitle: 'Planning your next trip',
      location: 'Personal Wishlist',
      tags: ['Favorites', 'Planning', 'Dreams'],
      image: 'https://images.unsplash.com/photo-1522881113591-b541527f54c9?auto=format&fit=crop&w=1200&q=80',
      steps: [
        { id: 1, title: 'Profile', subtitle: 'Authenticated', icon: FileText },
        { id: 2, title: 'Favorites', subtitle: 'Loading saved tours', icon: Heart },
        { id: 3, title: 'Recommendations', subtitle: 'Based on likes', icon: Compass },
        { id: 4, title: 'Ready', subtitle: 'View wishlist', icon: Flag },
      ] as any,
      checklistItems: [
        { id: 1, title: 'Accessing your profile...', subtitle: 'Secure connection' },
        { id: 2, title: 'Retrieving saved tours...', subtitle: 'Loading favorites' },
        { id: 3, title: 'Checking availability...', subtitle: 'Updating status' },
        { id: 4, title: 'Preparing your list...', subtitle: 'Almost done' },
      ]
    };
  }
  
  // 4. Articles Routing
  if (pathname.includes('/articles')) {
    return {
      ...defaultMetadata,
      title: 'Travel Stories',
      subtitle: 'Inspiration for your next journey',
      location: 'Bangladesh Blogs',
      tags: ['Stories', 'Tips', 'Culture'],
      image: 'https://images.unsplash.com/photo-1506784951206-81a171d79862?auto=format&fit=crop&w=1200&q=80',
      checklistItems: [
        { id: 1, title: 'Loading article content...', subtitle: 'Story is ready' },
        { id: 2, title: 'Preparing images...', subtitle: 'Visuals loaded' },
        { id: 3, title: 'Finding related posts...', subtitle: 'Gathering suggestions' },
        { id: 4, title: 'Formatting text...', subtitle: 'Just a moment' },
      ]
    };
  }

  // 5. All Tours Routing
  if (pathname.includes('/all-tours')) {
    return {
      ...defaultMetadata,
      title: 'Loading All Tours...',
      subtitle: 'Exploring every possibility',
      location: 'All Destinations',
      tags: ['Tours', 'Explore', 'Discover'],
      checklistItems: [
        { id: 1, title: 'Fetching global tours...', subtitle: 'Accessing catalog' },
        { id: 2, title: 'Sorting destinations...', subtitle: 'Organizing map' },
        { id: 3, title: 'Loading popular spots...', subtitle: 'Preparing visuals' },
        { id: 4, title: 'Finalizing directory...', subtitle: 'Just a moment' },
      ]
    };
  }

  // 6. Operators Routing
  if (pathname.includes('/operators')) {
    return {
      ...defaultMetadata,
      title: 'Loading Operators...',
      subtitle: 'Connecting with local guides',
      location: 'Tour Guides',
      tags: ['Operators', 'Guides', 'Agencies'],
      checklistItems: [
        { id: 1, title: 'Connecting to network...', subtitle: 'Finding agencies' },
        { id: 2, title: 'Fetching guide profiles...', subtitle: 'Loading details' },
        { id: 3, title: 'Checking verification...', subtitle: 'Ensuring safety' },
        { id: 4, title: 'Finalizing list...', subtitle: 'Almost ready' },
      ]
    };
  }

  return defaultMetadata;
}
