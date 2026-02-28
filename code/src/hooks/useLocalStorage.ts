import { useState } from 'react';

// BUG-006 FIX: Feature detection for localStorage
function isLocalStorageAvailable(): boolean {
  try {
    const test = '__localStorage_test__';
    window.localStorage.setItem(test, test);
    window.localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storageAvailable] = useState(isLocalStorageAvailable());
  
  const [storedValue, setStoredValue] = useState<T>(() => {
    // BUG-004 FIX: Handle localStorage unavailability
    if (!storageAvailable) {
      console.warn('localStorage is not available. Using in-memory state.');
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      
      // BUG-004 & BUG-006 FIX: Only attempt localStorage if available
      if (!storageAvailable) {
        console.warn('localStorage unavailable - changes will not persist');
        return;
      }

      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error saving localStorage key "${key}":`, error);
      
      // BUG-004 FIX: Better error handling with user-friendly messages
      if (error instanceof DOMException) {
        if (error.name === 'QuotaExceededError') {
          alert(
            '❗ Storage quota exceeded!\n\n' +
            'Your browser storage is full. Please delete some old conversations to continue saving new messages.'
          );
        } else if (error.name === 'SecurityError') {
          console.warn(
            'localStorage access denied (private browsing mode?). ' +
            'Your conversations will not be saved.'
          );
        }
      }
    }
  };

  return [storedValue, setValue] as const;
}
