'use client';

import { FC } from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '@/utils/ui';
import { SwitchProps } from './types';

export const Switch: FC<SwitchProps> = ({ children, classNames, dir = 'auto', ...props }) => {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      dir={dir}
      className={cn('peer switch', classNames?.root)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn('switch-thumb', classNames?.thumb)}
      >
        {children}
      </SwitchPrimitive.Thumb>
    </SwitchPrimitive.Root>
  );
};
