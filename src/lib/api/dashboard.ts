import { useQuery } from '@tanstack/react-query';
import { 
  mockUser, 
  mockActiveTrip, 
  mockUpcomingTrips, 
  mockAISuggestions, 
  mockActivities 
} from '@/lib/data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const dashboardApi = {
  getUser: async () => {
    await delay(500);
    return mockUser;
  },
  
  getActiveTrip: async () => {
    await delay(300);
    return mockActiveTrip;
  },
  
  getUpcomingTrips: async () => {
    await delay(400);
    return mockUpcomingTrips;
  },
  
  getAISuggestions: async () => {
    await delay(600);
    return mockAISuggestions;
  },
  
  getActivities: async () => {
    await delay(350);
    return mockActivities;
  },
  
  getStats: async () => {
    await delay(200);
    return mockUser.stats;
  },
};

// React Query hooks
export const useDashboardUser = () => {
  return useQuery({
    queryKey: ['dashboard', 'user'],
    queryFn: dashboardApi.getUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useActiveTrip = () => {
  return useQuery({
    queryKey: ['dashboard', 'activeTrip'],
    queryFn: dashboardApi.getActiveTrip,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useUpcomingTrips = () => {
  return useQuery({
    queryKey: ['dashboard', 'upcomingTrips'],
    queryFn: dashboardApi.getUpcomingTrips,
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
};

export const useAISuggestions = () => {
  return useQuery({
    queryKey: ['dashboard', 'aiSuggestions'],
    queryFn: dashboardApi.getAISuggestions,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useActivities = () => {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: dashboardApi.getActivities,
    staleTime: 1 * 60 * 1000, // 1 minute
  });
};

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard', 'stats'],
    queryFn: dashboardApi.getStats,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};