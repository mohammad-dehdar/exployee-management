import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Button } from './button';
import { withTests } from '@storybook/addon-jest';

import results from '~/.jest-test-results.json';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Button component has no default styles like padding, margin, or font. Only button-text-md class is applied by default. Border radius is automatically applied. For pixel-perfect designs matching Figma, you can use h-* in className to set the exact height. For text styling according to Figma, use Typography utility classes like body-20 lg:body-10.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Basic: Story = {
  args: {
    children: 'Default Button',
    color: 'primary',
    variant: 'fill',
    rounded: false,
    fullWidth: false,
    isDisabled: false,
    isLoading: false,
  },
  render: (args) => <Button {...args}>{args.children}</Button>,
};

Basic.decorators = [withTests({ results })];

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline">Outline</Button>
      <Button variant="fill">Fill</Button>
      <Button variant="ghost">Ghost</Button>
      <Button as="link" variant="link">
        Link
      </Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="primary" variant="fill">
        Primary
      </Button>
      <Button color="secondary" variant="fill">
        Secondary
      </Button>
      <Button color="success" variant="fill">
        Success
      </Button>
      <Button color="error" variant="fill">
        Error
      </Button>
      <Button color="warning" variant="fill">
        Warning
      </Button>
      <Button color="info" variant="fill">
        Info
      </Button>
      <Button color="neutral" variant="fill">
        Neutral
      </Button>
    </div>
  ),
};

export const ButtonSizes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Button sizes are controlled via className utilities, not props. Use button-text-* classes for different text button sizes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="button-text-xs">button-text-xs</Button>
      <Button className="button-text-sm">button-text-sm</Button>
      <Button className="button-text-md">button-text-md</Button>
      <Button className="button-text-lg">button-text-lg</Button>
      <Button className="button-text-xl">button-text-xl</Button>
      <Button className="button-text-2xl">button-text-2xl</Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Normal</Button>
      <Button isDisabled>Disabled</Button>
      <Button isLoading>Loading</Button>
      <Button isLoading loadingText="Processing...">
        Submit
      </Button>
    </div>
  ),
};

export const FullWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use the fullWidth prop to make the button take up 100% of its container width.',
      },
    },
  },
  render: () => (
    <div className="space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="outline" color="success">
        Full Width Success
      </Button>
    </div>
  ),
};

export const FullRounded: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button rounded className="button-icon-xs">
        +
      </Button>
      <Button rounded variant="outline" className="button-icon-sm">
        ×
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use startIcon and endIcon props to add icons to buttons.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button startIcon={<span>+</span>}>Add Item</Button>
      <Button endIcon={<span>→</span>}>Next</Button>
      <Button startIcon={<span>↑</span>} endIcon={<span>↓</span>}>
        Both Icons
      </Button>
    </div>
  ),
};

export const IconButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Use button-icon-* classes for icon-only buttons with different sizes.',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button className="button-icon-xs">
        <span>+</span>
      </Button>
      <Button className="button-icon-sm">
        <span>+</span>
      </Button>
      <Button className="button-icon-md">
        <span>+</span>
      </Button>
      <Button className="button-icon-lg">
        <span>+</span>
      </Button>
      <Button className="button-icon-xl">
        <span>+</span>
      </Button>
    </div>
  ),
};

export const FillButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="fill" color="primary">
        Primary
      </Button>
      <Button variant="fill" color="secondary">
        Secondary
      </Button>
      <Button variant="fill" color="success">
        Success
      </Button>
      <Button variant="fill" color="error">
        Error
      </Button>
      <Button variant="fill" isDisabled>
        Disabled
      </Button>
    </div>
  ),
};

export const OutlineButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline" color="primary">
        Primary
      </Button>
      <Button variant="outline" color="secondary">
        Secondary
      </Button>
      <Button variant="outline" color="success">
        Success
      </Button>
      <Button variant="outline" color="error">
        Error
      </Button>
      <Button variant="outline" isDisabled>
        Disabled
      </Button>
    </div>
  ),
};

export const GhostButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="ghost" color="primary">
        Primary
      </Button>
      <Button variant="ghost" color="secondary">
        Secondary
      </Button>
      <Button variant="ghost" color="success">
        Success
      </Button>
      <Button variant="ghost" color="error">
        Error
      </Button>
      <Button variant="ghost" isDisabled>
        Disabled
      </Button>
    </div>
  ),
};

export const LinkButtons: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Note: When using as="link", if href is not provided, it defaults to "#".',
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button as="link" variant="link" color="primary">
        Primary
      </Button>
      <Button as="link" variant="link" color="secondary">
        Secondary
      </Button>
      <Button as="link" variant="link" color="success">
        Success
      </Button>
      <Button as="link" variant="link" color="error">
        Error
      </Button>
      <Button as="link" variant="link" isDisabled>
        Disabled
      </Button>
    </div>
  ),
};
