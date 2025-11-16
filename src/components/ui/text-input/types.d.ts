import { VariantProps } from 'class-variance-authority';
import { ColorVariant } from '@/components/ui/types';
import { textInputVariants } from './text-input';
import { LabelProps } from '@/components/ui/label/types';

export type TextInputVariant = 'outline' | 'fill' | 'ghost';
export type TextInputState = 'error' | 'warning' | 'success';
export type TextInputColor = Exclude<ColorVariant, 'muted'>;
export type TextInputType =
  | 'search'
  | 'email'
  | 'password'
  | 'text'
  | 'number'
  | 'file'
  | 'reset'
  | 'radio'
  | 'checkbox';

export type TextInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'color' | 'type'> &
  VariantProps<typeof textInputVariants> & {
    variant?: TextInputVariant;
    color?: TextInputColor;
    state?: TextInputState;
    placeholder?: string;
    value?: string | number;
    dir?: 'rtl' | 'ltr' | 'auto';
    fullWidth?: boolean;
    required?: boolean;
    onValueChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    endAction?: React.ReactNode;
    type?: TextInputType;
    disabled?: boolean;
    label?: string;
    inputMessage?: string;
    labelProps?: LabelProps;
    classNames?: {
      root?: string;
      input?: string;
      label?: string;
      inputMessage?: string;
    };
  };
