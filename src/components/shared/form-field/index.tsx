'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/ui';

export interface FormFieldProps {
  /**
   * Label text for the field
   */
  label: string;
  
  /**
   * Error message to display below the field
   */
  error?: string;
  
  /**
   * Warning message to display below the field
   */
  warning?: string;
  
  /**
   * Helper text to display below the field
   */
  helperText?: string;
  
  /**
   * Whether the field is required
   */
  required?: boolean;
  
  /**
   * HTML id for the field (for label association)
   */
  id?: string;
  
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  
  /**
   * The input/field component
   */
  children: React.ReactNode;
  
  /**
   * Label props (color, size, etc.)
   */
  labelProps?: {
    color?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'neutral';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  };
}

/**
 * FormField - A composite component that wraps form inputs with label, error, and helper text.
 * 
 * This component provides a consistent pattern for form fields across the application.
 * It handles label, required indicator, error messages, and helper text in a standardized way.
 * 
 * @example
 * ```tsx
 * <FormField 
 *   label={t('fields.email')} 
 *   error={errors.email?.message} 
 *   required
 * >
 *   <TextInput {...register('email')} />
 * </FormField>
 * ```
 */
export function FormField({
  label,
  error,
  warning,
  helperText,
  required = false,
  id,
  className,
  children,
  labelProps,
}: FormFieldProps) {
  const generatedId = React.useId();
  const fieldId = id || generatedId;
  const message = error || warning || helperText;
  const messageColor = error ? 'error' : warning ? 'warning' : 'neutral';

  return (
    <div className={cn('flex flex-col space-y-2', className)}>
      <Label
        htmlFor={fieldId}
        color={labelProps?.color || (error ? 'error' : 'neutral')}
        size={labelProps?.size || 'sm'}
      >
        {label}
        {required && (
          <span className="ml-1 text-error" aria-label="required">
            *
          </span>
        )}
      </Label>
      
      {React.isValidElement(children) 
        ? React.cloneElement(children, { id: fieldId } as Partial<unknown>)
        : children}
      
      {message && (
        <Label
          htmlFor={fieldId}
          color={messageColor}
          size="xs"
          className="mt-1"
        >
          {message}
        </Label>
      )}
    </div>
  );
}

