export const DASHBOARD_ROUTES = {
  TRAVELLER: {
    OVERVIEW: '/dashboard/traveller',
    TRIPS: '/dashboard/traveller/trips',
    EXPLORE: '/dashboard/traveller/explore',
    FAVORITES: '/dashboard/traveller/favorites',
    BOOKINGS: '/dashboard/traveller/bookings',
    MESSAGES: '/dashboard/traveller/messages',
    PAYMENTS: '/dashboard/traveller/payments',
    REVIEWS: '/dashboard/traveller/reviews',
    SUPPORT: '/dashboard/traveller/support',
    SETTINGS: '/dashboard/traveller/settings',
  },
} as const;

export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  stagger: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;