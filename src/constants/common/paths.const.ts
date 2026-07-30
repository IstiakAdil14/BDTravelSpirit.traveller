export const API = {
  tour: (id: string) => `/api/tours/${id}`,
  reviews: (id: string) => `/api/tours/${id}/reviews`,
  faqs: (id: string) => `/api/tours/${id}/faqs`,
  guides: (id: string) => `/api/tours/${id}/recommendate-guides`,
  recentlyViewed: (id: string) => `/api/tours/${id}/recently-viewed`,
  reports: (id: string) => `/api/tours/${id}/reports`,
  encode: (id: string) => `/api/tours/${id}/encode`,
};
