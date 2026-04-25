'use client';
import { createContext, useContext, type ReactNode } from 'react';

type Theme = 'dark' | 'light';
const ThemeContext = createContext<Theme>('dark');

export function ThemeProvider({ children }: { children: ReactNode }) {
  return <ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
