// Utility functions for traveller ID encoding/decoding
export function encodeTravellerId(userId: string): string {
  // Simple base64 encoding for demo - replace with your actual encoding logic
  return btoa(userId).replace(/[+/=]/g, (match) => {
    switch (match) {
      case '+': return '-';
      case '/': return '_';
      case '=': return '';
      default: return match;
    }
  });
}

export function decodeTravellerId(encodedId: string): string {
  // Reverse the encoding process
  const base64 = encodedId.replace(/[-_]/g, (match) => {
    switch (match) {
      case '-': return '+';
      case '_': return '/';
      default: return match;
    }
  });
  
  // Add padding if needed
  const padded = base64 + '='.repeat((4 - base64.length % 4) % 4);
  
  try {
    return atob(padded);
  } catch {
    return 'default-user';
  }
}

export function generateTravellerId(): string {
  // Generate a random traveller ID for demo purposes
  const randomId = Math.random().toString(36).substring(2, 15);
  return encodeTravellerId(`traveller_${randomId}`);
}

export function getTravellerIdFromSession(): string {
  // In a real app, this would get the user ID from session/auth
  // For demo, we'll use localStorage or generate a new one
  if (typeof window !== 'undefined') {
    let travellerId = localStorage.getItem('travellerId');
    if (!travellerId) {
      travellerId = generateTravellerId();
      localStorage.setItem('travellerId', travellerId);
    }
    return travellerId;
  }
  return generateTravellerId();
}