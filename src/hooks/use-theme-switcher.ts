'use client';

import { useTheme } from 'next-themes';

export function useThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = typeof window !== 'undefined';

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
