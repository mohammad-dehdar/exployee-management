import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Switch } from './switch';
import { MoonIcon, SunIcon } from '@/components/shared/icons';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Basic: Story = {
  render: () => {
    return (
      <div className="flex items-center justify-center gap-2">
        <Switch />
        <span>Airplane Mode</span>
      </div>
    );
  },
};

export const SpecialCase: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);

    return (
      <div className="flex items-center justify-center gap-4">
        <Switch
          checked={isDark}
          onCheckedChange={setIsDark}
          classNames={{
            root: 'data-[state=checked]:bg-neutral-80',
            thumb: 'text-neutral-90',
          }}
        >
          {isDark ? <MoonIcon className="text-xs" /> : <SunIcon className="text-sm" />}
        </Switch>
        <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
    );
  },
};
