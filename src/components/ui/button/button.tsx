import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/utils/ui';
import { cva } from 'class-variance-authority';
import { LoaderCircleIcon } from '@icons';
import { ButtonBaseProps, ButtonProps } from './types';

export const buttonVariants = cva('button', {
  variants: {
    variant: {
      outline: 'button-outline',
      fill: 'button-fill',
      ghost: 'button-ghost',
      link: 'button-link',
    },
    color: {
      primary: 'button-primary',
      secondary: 'button-secondary',
      success: 'button-success',
      error: 'button-error',
      warning: 'button-warning',
      info: 'button-info',
      neutral: 'button-neutral',
    },
    rounded: {
      true: 'button-fullRounded',
    },
    fullWidth: {
      true: 'button-fullWidth',
    },
    isDisabled: {
      true: 'button-disabled',
    },
  },
  defaultVariants: {
    variant: 'fill',
    color: 'primary',
  },
});

export const Button: React.FC<ButtonProps> = ({
  as = 'button',
  className = 'button-text-md',
  variant,
  color,
  rounded = false,
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  loadingText,
  startIcon,
  endIcon,
  children,
  loadingClasses,
  href,
  type = 'button',
  ...props
}) => {
  const buttonClasses = cn(
    buttonVariants({
      variant,
      color,
      rounded,
      fullWidth,
      isDisabled,
    }),
    className,
  );

  const buttonContent = (
    <>
      {isLoading ? (
        <span className={cn(children && 'mr-2')}>
          <LoaderCircleIcon className={cn('size-4 animate-spin', loadingClasses)} />
        </span>
      ) : startIcon ? (
        <span className={cn(children && 'mr-2')}>{startIcon}</span>
      ) : null}
      {isLoading ? (loadingText ? loadingText : children) : children}
      {endIcon ? <span className={cn(children && 'ml-2')}>{endIcon}</span> : null}
    </>
  );

  if (as === 'link') {
    return (
      <Link href={href || '#'} className={buttonClasses} {...(props as ButtonBaseProps)}>
        {buttonContent}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={isLoading || isDisabled}
      {...(props as ButtonBaseProps)}
    >
      {buttonContent}
    </button>
  );
};
