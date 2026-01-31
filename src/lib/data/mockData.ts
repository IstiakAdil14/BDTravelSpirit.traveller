export const mockTravellerData = {
  profile: {
    name: 'John Doe',
    avatar: '/images/avatars/john.jpg',
    location: 'Dhaka, Bangladesh',
    memberSince: '2023',
  },
  stats: {
    totalTrips: 12,
    countriesVisited: 8,
    upcomingTrips: 3,
    totalSpent: 45000,
  },
  activeTrip: {
    id: '1',
    destination: 'Cox\'s Bazar',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    progress: 65,
    image: '/images/destinations/coxs-bazar.jpg',
  },
  upcomingTrips: [
    {
      id: '2',
      destination: 'Sylhet',
      date: '2024-03-10',
      image: '/images/destinations/sylhet.jpg',
      price: 15000,
    },
    {
      id: '3',
      destination: 'Rangamati',
      date: '2024-04-05',
      image: '/images/destinations/rangamati.jpg',
      price: 12000,
    },
  ],
  aiSuggestions: [
    {
      id: '1',
      title: 'Perfect weather in Bandarban',
      description: 'Great time to visit the hills',
      type: 'weather',
    },
    {
      id: '2',
      title: 'New restaurant in Dhaka',
      description: 'Highly rated by travelers',
      type: 'food',
    },
  ],
  activities: [
    {
      id: '1',
      type: 'booking',
      message: 'Booking confirmed for Cox\'s Bazar',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'review',
      message: 'You reviewed Sylhet Tea Gardens',
      time: '1 day ago',
    },
  ],
};

// Export individual items for dashboard API
export const mockUser = {
  ...mockTravellerData.profile,
  stats: mockTravellerData.stats,
};

export const mockActiveTrip = mockTravellerData.activeTrip;
export const mockUpcomingTrips = mockTravellerData.upcomingTrips;
export const mockAISuggestions = mockTravellerData.aiSuggestions;
export const mockActivities = mockTravellerData.activities;