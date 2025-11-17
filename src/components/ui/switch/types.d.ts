import { ComponentProps } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { PropsWithChildren } from '@/types/children';

export type SwitchProps = Omit<ComponentProps<typeof SwitchPrimitive.Root>, 'className'> &
  PropsWithChildren & {
    classNames?: {
      root?: string;
      thumb?: string;
    };
    dir?: 'rtl' | 'ltr' | 'auto';
  };
