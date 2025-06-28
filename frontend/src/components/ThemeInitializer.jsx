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


// ThemeInitializer.jsx
// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setRole } from '../features/theme/themeSlice';

// export default function ThemeInitializer() {
//   const dispatch = useDispatch();
//   const currentRole = useSelector(state => state.user.role); // Assuming you have user role in Redux

//   useEffect(() => {
//     // Update theme role when user role changes
//     if (currentRole) {
//       dispatch(setRole(currentRole));
//     }
//   }, [currentRole, dispatch]);

//   useEffect(() => {
//     const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
//     const handler = () => {
//       if (!localStorage.getItem(`theme_${currentRole}`)) {
//         const systemTheme = mediaQuery.matches ? 'dark' : 'light';
//         dispatch(setTheme({ role: currentRole, mode: systemTheme }));
//       }
//     };
    
//     mediaQuery.addEventListener('change', handler);
//     return () => mediaQuery.removeEventListener('change', handler);
//   }, [currentRole, dispatch]);

//   return null;
// }