import * as React from 'react';
import { cn } from '@/utils/ui';

export const Card: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div data-slot="card" className={cn('bg-background text-foreground', className)} {...props} />
  );
};

export const CardHeader: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-header" className={className} {...props} />;
};

export const CardMedia: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return (
    <div
      data-slot="card-media"
      className={cn('flex w-full justify-center', className)}
      {...props}
    />
  );
};

export const CardAction: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-action" className={cn('w-full', className)} {...props} />;
};

export const CardContent: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-content" className={cn('w-full', className)} {...props} />;
};

export const CardTitle: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-title" className={className} {...props} />;
};

export const CardDescription: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-description" className={className} {...props} />;
};

export const CardFooter: React.FC<React.ComponentProps<'div'>> = ({ className, ...props }) => {
  return <div data-slot="card-footer" className={cn('w-full', className)} {...props} />;
};
