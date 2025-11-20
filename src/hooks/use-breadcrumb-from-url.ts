'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface BreadcrumbItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

interface UseBreadcrumbFromUrlOptions {
  customLabels?: Record<string, string>;
  excludePaths?: string[];
  homeLabel?: string;
  homeHref?: string;
}

export const useBreadcrumbFromUrl = (options: UseBreadcrumbFromUrlOptions = {}) => {
  const pathname = usePathname();
  const { customLabels = {}, excludePaths = [], homeLabel = 'خانه', homeHref = '/' } = options;

  const breadcrumbItems = useMemo(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const items: BreadcrumbItem[] = [];

    if (homeHref !== pathname && !pathname.startsWith(homeHref)) {
      items.push({
        href: homeHref,
        label: homeLabel,
      });
    }

    let currentPath = '';

    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      if (excludePaths.includes(segment)) {
        return;
      }

      let label = customLabels[segment] || segment;

      if (!customLabels[segment]) {
        if (segment === 'games') {
          label = 'بازی ها';
        } else if (segment === 'ps4') {
          label = 'بازی های PS4';
        } else if (segment === 'ps5') {
          label = 'بازی های PS5';
        } else if (segment === 'xbox') {
          label = 'بازی های Xbox';
        } else if (segment === 'nintendo') {
          label = 'بازی های Nintendo';
        } else if (segment === 'pc') {
          label = 'بازی های PC';
        } else if (segment === 'steam') {
          label = 'بازی های steam';
        } else {
          label = segment
            .split('-')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      }

      items.push({
        href: currentPath,
        label,
      });
    });

    return items;
  }, [pathname, customLabels, excludePaths, homeLabel, homeHref]);

  return breadcrumbItems;
};
