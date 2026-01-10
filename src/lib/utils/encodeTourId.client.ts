export const encodeTourIdClient = (id: string) => {
  return btoa(id); // simple Base64 encoding
};
