import { create } from 'zustand';

interface DashboardState {
  travellerId: string | null;
  sidebarOpen: boolean;
  activeTrip: any | null;
  notifications: any[];
  setSidebarOpen: (open: boolean) => void;
  setTravellerId: (id: string) => void;
  setActiveTrip: (trip: any) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  travellerId: null,
  sidebarOpen: false,
  activeTrip: null,
  notifications: [],
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTravellerId: (id) => set({ travellerId: id }),
  setActiveTrip: (trip) => set({ activeTrip: trip }),
}));