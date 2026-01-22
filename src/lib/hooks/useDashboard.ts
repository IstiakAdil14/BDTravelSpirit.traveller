import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@/lib/constants/dashboard';

export function useResponsive() {
  const [screenSize, setScreenSize] = useState<keyof typeof BREAKPOINTS>('lg');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      
      if (width < BREAKPOINTS.sm) {
        setScreenSize('sm');
        setIsMobile(true);
      } else if (width < BREAKPOINTS.md) {
        setScreenSize('md');
        setIsMobile(true);
      } else if (width < BREAKPOINTS.lg) {
        setScreenSize('lg');
        setIsMobile(false);
      } else if (width < BREAKPOINTS.xl) {
        setScreenSize('xl');
        setIsMobile(false);
      } else {
        setScreenSize('2xl');
        setIsMobile(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return { screenSize, isMobile };
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}