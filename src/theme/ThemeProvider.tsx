import { useCallback, useEffect, useState } from 'react';
import type { Theme } from './types';
import { ThemeContext } from './ThemeContext';
import {
  applyTheme,
  getStoredTheme,
  getSystemTheme,
  THEME_STORAGE_KEY,
} from './utils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => {
    // On initial mount, check localStorage first, then system preference
    const stored = getStoredTheme();
    return stored ?? getSystemTheme();
  });

  // Apply theme to document on mount and when theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Initialize theme from localStorage or system preference on mount
  useEffect(() => {
    const stored = getStoredTheme();
    setThemeState(stored ?? getSystemTheme());
  }, []);

  // Listen for system theme changes (when no stored preference)
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only update if there's no stored preference
      if (!getStoredTheme()) {
        const newTheme = mediaQuery.matches ? 'dark' : 'light';
        setThemeState(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
    applyTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      }
      return newTheme;
    });
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
