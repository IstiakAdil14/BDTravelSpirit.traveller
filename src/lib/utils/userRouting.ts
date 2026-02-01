import { USER_ROLE, UserRole } from "@/constants/user.const";

// Simple base64 encoding/decoding for user IDs
export const encodeUserId = (userId: string): string => {
  return Buffer.from(userId).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

export const decodeUserId = (encodedId: string): string => {
  const base64 = encodedId.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  return Buffer.from(padded, 'base64').toString();
};

// Route mapping based on user roles
export const getUserDashboardPath = (userId: string, role: UserRole): string => {
  const encodedId = encodeUserId(userId);
  return `/dashboard?role=${role}&id=${encodedId}`;
};

export const validateUserAccess = (encodedId: string, userRole: UserRole, routeRole: string): boolean => {
  const roleFromRoute = routeRole.toLowerCase();
  const normalizedUserRole = userRole?.toLowerCase();
  
  // Handle both 'traveler' and 'traveller' spellings
  if (routeRole === 'traveller') {
    return normalizedUserRole === 'traveler' || normalizedUserRole === 'traveller' || !userRole;
  }
  
  return normalizedUserRole === roleFromRoute || (roleFromRoute === 'traveler' && !userRole);
};