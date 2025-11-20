'use client';

import { MoonIcon, SunIcon } from '@icons';
import { useThemeSwitcher } from '@/hooks/use-theme-switcher';
import { Button, Switch } from '@/components/ui';
import { ThemeSwitcherProps } from './type';
import { cn } from '@/utils/ui';

export const ThemeSwitcher = ({ variant, className }: ThemeSwitcherProps) => {
  const { isDark, handleToggle } = useThemeSwitcher();

  if (variant === 'switch') {
    return (
      <Switch
        checked={!isDark}
        onCheckedChange={handleToggle}
        classNames={{
          root: 'data-[state=checked]:bg-neutral-40 h-6 w-10 ',
          thumb: 'text-neutral-90 size-5 rtl:data-[state=unchecked]:translate-x-6.5',
        }}
      >
        {isDark ? <MoonIcon className="text-xs" /> : <SunIcon className="text-sm" />}
      </Switch>
    );
  }

  return (
    <Button
      onClick={handleToggle}
      className={cn(
        'text-neutral-90 dark:bg-neutral-80 dark:text-neutral-10 button-icon-xl bg-neutral-50 transition-none *:size-6 hover:opacity-70',
        className,
      )}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};
