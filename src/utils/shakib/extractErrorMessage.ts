export function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error && typeof error === 'object') {
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    if ('response' in error && error.response && typeof error.response === 'object') {
      const response = error.response as any;
      if (response.data && typeof response.data === 'object') {
        if (response.data.error && typeof response.data.error === 'string') {
          return response.data.error;
        }
        if (response.data.message && typeof response.data.message === 'string') {
          return response.data.message;
        }
      }
    }
  }
  
  return 'An unexpected error occurred';
}