export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  role: 'traveller' | 'guide' | 'admin';
  location: string;
  joinedAt: string;
  stats: UserStats;
}

export interface UserStats {
  totalTrips: number;
  upcomingTrips: number;
  favorites: number;
  rating: number;
}

export interface Trip {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  travelers?: number;
  progress?: number;
  status: 'active' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  price?: number;
  image?: string;
  guide?: Guide;
}

export interface Guide {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
  rating: number;
  avatar?: string;
}

export interface AISuggestion {
  id: string;
  type: 'destination' | 'trending' | 'recommendation' | 'deal';
  title: string;
  description: string;
  confidence?: number;
  actionUrl?: string;
  image?: string;
}

export interface Activity {
  id: string;
  type: 'review' | 'favorite' | 'booking' | 'message' | 'payment' | 'trip';
  title: string;
  description: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface DashboardData {
  user: User;
  activeTrip?: Trip;
  upcomingTrips: Trip[];
  aiSuggestions: AISuggestion[];
  activities: Activity[];
  stats: UserStats;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

export interface Widget {
  id: string;
  title: string;
  subtitle?: string;
  items: string[];
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  actionUrl?: string;
}