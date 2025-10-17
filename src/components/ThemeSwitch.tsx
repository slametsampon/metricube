// src/components/ThemeSwitch.tsx

'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle Theme"
      className="ml-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
    >
      {theme === 'dark' ? '🌙' : '☀️'}
    </button>
  );
}
