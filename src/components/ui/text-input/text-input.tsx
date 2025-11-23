'use client';

import * as React from 'react';
import { cva } from 'class-variance-authority';
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
      dir = 'rtl',
      onValueChange,
      onBlur,
      startIcon,
      endIcon,
      endAction,
      label,
      inputMessage,
      labelProps,
      state,
      ...props
    },
    ref,
  ) => {
    const stateColor = state || color;

    // Extract placeholder from props to avoid duplication
    const { placeholder: propsPlaceholder, ...restProps } = props;

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

    // Use placeholder from parameter first, then from props, or undefined
    const finalPlaceholder = placeholder ?? propsPlaceholder;

    return (
      <div className={cn('flex flex-col items-start', fullWidth ? 'w-full' : 'w-fit')} dir={dir}>
        {hasLabel && (
          <Label
            className={cn(classNames?.label, 'textInputLabel')}
            htmlFor={inputId}
            color={stateColor}
            {...labelProps}
            dir={dir}
          >
            {label}
          </Label>
        )}
        <div className={inputClasses} dir={dir}>
          {startIcon && startIcon}
          <input
            id={inputId}
            dir={dir}
            type={restProps.type}
            ref={ref}
            data-slot="input"
            value={value}
            onChange={onValueChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder={finalPlaceholder}
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
            dir={dir}
          >
            {inputMessage}
          </Label>
        )}
      </div>
    );
  },
);

TextInput.displayName = 'TextInput';
