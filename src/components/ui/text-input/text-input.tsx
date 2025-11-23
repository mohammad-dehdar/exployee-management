'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
import { useLocale } from 'next-intl';
import { cn } from '@/utils/ui';
import { TextInputProps } from './types';
import { Label } from '@/components/ui/label';

export const textInputVariants = cva('textInput', {
  variants: {
    variant: {
      outline: 'textInput-outline',
      fill: 'textInput-fill',
      ghost: 'textInput-ghost',
    },
    color: {
      primary: 'textInput-primary',
      secondary: 'textInput-secondary',
      success: 'textInput-success',
      error: 'textInput-error',
      warning: 'textInput-warning',
      info: 'textInput-info',
      neutral: 'textInput-neutral',
    },
    fullWidth: {
      true: 'w-full',
    },
    disabled: {
      true: 'textInput-disabled',
    },
  },
  defaultVariants: {
    color: 'primary',
  },
});

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      classNames,
      variant,
      color,
      disabled,
      fullWidth = false,
      placeholder,
      value,
      dir,
      onValueChange,
      onBlur,
      startIcon,
      endIcon,
      endAction,
      label,
      inputMessage,
      labelProps,
      state,
      ...restProps
    },
    ref,
  ) => {
    const locale = useLocale();
    const stateColor = state || color;

    // Determine direction based on locale: fa = rtl, en/de = ltr
    // If dir is explicitly provided, use it; otherwise use locale-based direction
    const textDirection = dir ?? (locale === 'fa' ? 'rtl' : 'ltr');

    const inputClasses = cn(
      textInputVariants({
        color: stateColor,
        variant,
        fullWidth,
        disabled,
      }),
      classNames?.root,
    );

    const inputId = React.useId();
    const hasLabel = !!label;
    const showMessage = !!inputMessage && !!state;

    return (
      <div className={cn('flex flex-col items-start', fullWidth ? 'w-full' : 'w-fit')} dir={textDirection}>
        {hasLabel && (
          <Label
            className={cn(classNames?.label, 'textInputLabel')}
            htmlFor={inputId}
            color={stateColor}
            {...labelProps}
            dir={textDirection}
          >
            {label}
          </Label>
        )}
        <div className={inputClasses} dir={textDirection}>
          {startIcon && startIcon}
          <input
            id={inputId}
            dir={textDirection}
            type={restProps.type}
            ref={ref}
            data-slot="input"
            value={value}
            onChange={onValueChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={placeholder}
            {...restProps}
            className={cn('w-full flex-1 focus:outline-none', classNames?.input)}
          />
          {endAction ? endAction : endIcon && endIcon}
        </div>
        {showMessage && (
          <Label
            className={cn(classNames?.inputMessage, 'textInputMessage')}
            htmlFor={inputId}
            color={stateColor}
            {...labelProps}
            dir={textDirection}
          >
            {inputMessage}
          </Label>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
