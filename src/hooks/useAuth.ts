// // src/hooks/useAuth.ts
// import {useSelector} from 'react-redux';
// import {type RootState} from '@/app/store';

// export const useAuth = () => {
//   const {token, isAuthenticated, isLoading, role} = useSelector(
//     (state: RootState) => state.auth
//   );

//   return {token, isAuthenticated, isLoading, role};
// };

// src/hooks/useLocalStorage.ts
import {useState} from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  return [storedValue, setValue] as const;
}
