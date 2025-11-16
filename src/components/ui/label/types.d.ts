import { VariantProps } from 'class-variance-authority';
import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { ColorVariant, SizeVariant } from '@/components/ui/types';
import { labelVariants } from './label';

export type LabelColor = Exclude<ColorVariant, 'muted'>;
export type LabelRef = React.ComponentRef<typeof LabelPrimitive.Root>;

export type LabelProps = Omit<React.ComponentPropsWithoutRef<HTMLLabelElement>, 'color'> &
  VariantProps<typeof labelVariants> & {
    color?: LabelColor;
    size?: SizeVariant;
    align?: 'right' | 'left' | 'center' | 'justify';
    dir?: 'rtl' | 'ltr' | 'auto';
    className?: string;
    htmlFor?: string;
    children?: React.ReactNode;
  };
