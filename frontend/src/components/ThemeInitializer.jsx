// // components/ThemeInitializer.jsx
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateSystemTheme } from '../features/theme/themeSlice';

export default function ThemeInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
   
    // Initialize theme
    dispatch(updateSystemTheme());
    
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
   
    const handler = () => {
  
        dispatch(updateSystemTheme())};
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, [dispatch]);

  return null;
}

