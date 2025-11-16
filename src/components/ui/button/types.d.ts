import type { LinkProps } from 'next/link';
import type { ColorVariant } from '@/components/ui/types';
import type { buttonVariants } from './button';
import type { VariantProps } from 'class-variance-authority';

export type ButtonVariant = 'outline' | 'fill' | 'ghost' | 'link';

export type ButtonColor = Exclude<ColorVariant, 'muted'>;

export type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  color?: ButtonColor;
  variant?: ButtonVariant;
  rounded?: boolean;
  fullWidth?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  loadingClasses?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
};

export interface ButtonAsButton
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'> {
  as?: 'button';
  href?: never;
}

export interface ButtonAsLink
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'color'>,
    Omit<LinkProps, 'href'> {
  as: 'link';
  href?: LinkProps['href'];
}

export type ButtonProps = ButtonBaseProps & (ButtonAsButton | ButtonAsLink);
