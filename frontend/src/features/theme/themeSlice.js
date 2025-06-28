// features/theme/themeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const getInitialTheme = () => {
  if (typeof window !== 'undefined') {
    const storedTheme = localStorage.getItem('theme');
 
    
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    
    return storedTheme || (systemDark ? 'dark' : 'light');
  }
  return 'light';
};


const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: getInitialTheme(),
    preference: localStorage.getItem('themePreference') || 'system'
  },
  reducers: {
      setTheme: (state, action) => {
      state.preference = action.payload; // Fix: preference should be set
      state.mode = action.payload;
      localStorage.setItem('themePreference', action.payload);
    },
    setSystemTheme: (state) => {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      state.mode = systemTheme;
      state.preference = 'system';
      localStorage.setItem('theme', systemTheme);
      localStorage.setItem('themePreference', 'system');
    },
    updateSystemTheme: (state) => {
      if (state.preference === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        state.mode = systemTheme;
        localStorage.setItem('theme', systemTheme);
      }
    }
  }
});

export const { setTheme, setSystemTheme, updateSystemTheme } = themeSlice.actions;
export default themeSlice.reducer;


