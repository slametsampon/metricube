// src/components/theme-provider.tsx
'use client';

import { ThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes';

/**
 * Wrapper untuk next-themes ThemeProvider
 * - Mendukung dark/light/system mode
 * - Bisa override props jika dibutuhkan
 */
export function AppThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </ThemeProvider>
  );
}
