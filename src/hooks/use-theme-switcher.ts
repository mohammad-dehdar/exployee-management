'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function useThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function handleToggle() {
    const currentTheme = theme === 'system' ? resolvedTheme : theme;

    if (currentTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  const isDark = mounted && (theme === 'system' ? resolvedTheme === 'dark' : theme === 'dark');

  return { isDark, handleToggle };
}
