'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { useLocale } from 'next-intl';
import { LabelProps, LabelRef } from './types';
import { cn } from '@/utils/ui';
import { cva } from 'class-variance-authority';

export const labelVariants = cva('label', {
  variants: {
    color: {
      primary: 'label-primary',
      secondary: 'label-secondary',
      success: 'label-success',
      error: 'label-error',
      warning: 'label-warning',
      info: 'label-info',
      neutral: 'label-neutral',
    },
    size: {
      xs: 'label-xs',
      sm: 'label-sm',
      md: 'label-base',
      lg: 'label-lg',
      xl: 'label-xl',
    },
    align: {
      right: 'label-right',
      left: 'label-left',
      center: 'label-center',
      justify: 'label-justify',
    },
  },
  defaultVariants: {
    color: 'neutral',
    size: 'md',
    align: 'center',
  },
});

export const Label = React.forwardRef<LabelRef, LabelProps>(
  ({ className, color, size, align, htmlFor, dir, ...props }, ref) => {
    const locale = useLocale();
    // Determine direction: if dir is explicitly provided, use it; otherwise use locale-based direction
    const textDirection = dir ?? (locale === 'fa' ? 'rtl' : 'ltr');
    
    return (
      <LabelPrimitive.Root
        ref={ref}
        data-slot="label"
        htmlFor={htmlFor}
        dir={textDirection}
        className={cn(labelVariants({ color, size, align }), className)}
        {...props}
      />
    );
  },
);

Label.displayName = 'Label';
