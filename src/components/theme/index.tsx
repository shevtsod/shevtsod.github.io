'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

// ThemeProvider that prevents FOUC in Next.js
//
// https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-tailwindcss
// https://github.com/vercel/next.js/discussions/53063

export interface ThemeContextProps {
  /** the current theme */
  theme?: string;
  /** update the current theme */
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

/**
 * Context that provides the theme and ability to set the theme
 */
const ThemeContext = createContext<ThemeContextProps>({
  // setTheme cannot be undefined or it is not callable
  setTheme: () => {},
});

export interface ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Provides ThemeContext to children
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [themeState, setThemeState] = useState<string | undefined>(() => {
    if (typeof window === 'undefined') return undefined;

    // Previously selected theme stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    // System preference
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    // Resolve the theme by order of precedence
    return storedTheme || preferredTheme;
  });

  // Applies a new theme to DOM and localStorage
  function applyTheme(theme: string) {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }

  // Sets the new theme
  const setTheme = useCallback<React.Dispatch<React.SetStateAction<string>>>(
    (value) => {
      if (typeof value === 'function') {
        setThemeState((oldTheme) => {
          const newTheme = value(oldTheme ?? '');
          applyTheme(newTheme);
          return newTheme;
        });
      } else {
        setThemeState(value);
        applyTheme(value);
      }
    },
    [],
  );

  const handleMatchMediaChange = useCallback(
    (event: MediaQueryListEvent) => {
      setTheme(event.matches ? 'dark' : 'light');
    },
    [setTheme],
  );

  // Change theme based on user preference
  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
    matchMedia.addEventListener('change', handleMatchMediaChange);

    return () =>
      matchMedia.removeEventListener('change', handleMatchMediaChange);
  }, [handleMatchMediaChange]);

  return (
    <ThemeContext.Provider value={{ theme: themeState, setTheme }}>
      <script
        dangerouslySetInnerHTML={{ __html: `(${script.toString()})()` }}
      />

      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook that provides the current theme and a function to update the theme.
 */
export function useTheme() {
  return useContext(ThemeContext);
}

/**
 * Script injected in ThemeProvider to preset the theme and prevent FOUC
 * https://github.com/vercel/next.js/discussions/53063
 */
function script() {
  try {
    const storedTheme = localStorage.getItem('theme');
    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';
    const resolvedTheme = storedTheme || preferredTheme;
    document.documentElement.classList.add(resolvedTheme);
  } catch (_) {}
}
