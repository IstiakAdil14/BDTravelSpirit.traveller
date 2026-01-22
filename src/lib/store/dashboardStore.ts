import { create } from 'zustand';

interface DashboardState {
  sidebarOpen: boolean;
  activeTrip: any | null;
  upcomingTrips: any[];
  stats: {
    totalTrips: number;
    upcomingTrips: number;
    favorites: number;
    rating: number;
  };
  setSidebarOpen: (open: boolean) => void;
  setActiveTrip: (trip: any) => void;
  setUpcomingTrips: (trips: any[]) => void;
  updateStats: (stats: Partial<DashboardState['stats']>) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  sidebarOpen: false,
  activeTrip: null,
  upcomingTrips: [],
  stats: {
    totalTrips: 12,
    upcomingTrips: 3,
    favorites: 28,
    rating: 4.9,
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setActiveTrip: (trip) => set({ activeTrip: trip }),
  setUpcomingTrips: (trips) => set({ upcomingTrips: trips }),
  updateStats: (newStats) => 
    set((state) => ({ 
      stats: { ...state.stats, ...newStats } 
    })),
}));