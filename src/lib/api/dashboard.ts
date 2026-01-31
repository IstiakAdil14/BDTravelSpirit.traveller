import { useQuery } from '@tanstack/react-query';

// Dashboard API functions - removed mock data dependencies
export const dashboardApi = {
  getUser: async () => {
    // Return empty user data
    return {
      name: 'User',
      avatar: '',
      location: '',
      memberSince: '2024',
      stats: {
        totalTrips: 0,
        countriesVisited: 0,
        upcomingTrips: 0,
        totalSpent: 0,
      }
    };
  },
  
  getActiveTrip: async () => {
    return null;
  },
  
  getUpcomingTrips: async () => {
    return [];
  },
  
  getAISuggestions: async () => {
    return [];
  },
  
  getActivities: async () => {
    return [];
  },
  
  getStats: async () => {
    return {
      totalTrips: 0,
      countriesVisited: 0,
      upcomingTrips: 0,
      totalSpent: 0,
    };
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