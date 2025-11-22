import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import { TextInput } from './text-input';
import { SearchIcon } from '@/components/shared/icons';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof TextInput> = {
  title: 'UI/TextInput',
  component: TextInput,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TextInput>;

export const Tests: Story = {
  args: {
    placeholder: 'جستجو...',
    color: 'primary',
    variant: 'outline',
    fullWidth: false,
  },
  render: (args: Story['args']) => <TextInput {...args} />,
};

export const Basic: Story = {
  render: () => <TextInput placeholder="جستجو..." />,
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput variant="outline" placeholder="Outline" />
      <TextInput variant="fill" placeholder="Fill" />
      <TextInput variant="ghost" placeholder="Ghost" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <TextInput variant="fill" color="primary" placeholder="Primary" />
      <TextInput variant="fill" color="secondary" placeholder="Secondary" />
      <TextInput variant="fill" color="success" placeholder="Success" />
      <TextInput variant="fill" color="error" placeholder="Error" />
      <TextInput variant="fill" color="warning" placeholder="Warning" />
      <TextInput variant="fill" color="info" placeholder="Info" />
      <TextInput variant="fill" color="neutral" placeholder="Neutral" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput classNames={{ root: 'textInput-sm', input: '' }} placeholder="Small" />
      <TextInput classNames={{ root: 'textInput-md', input: '' }} placeholder="Medium" />
      <TextInput classNames={{ root: 'textInput-lg', input: '' }} placeholder="Lage" />
    </div>
  ),
};

export const WithLightInputSize: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput classNames={{ root: 'textInput-sm-light' }} placeholder="جستجو..." />
      <TextInput classNames={{ root: 'textInput-md-light' }} placeholder="جستجو..." />
      <TextInput classNames={{ root: 'textInput-lg-light' }} placeholder="جستجو..." />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput placeholder="Normal" />
      <TextInput disabled placeholder="Disabled Gray Input" />
      <TextInput state="error" inputMessage="مشاهده خطا" placeholder="جستجو..." />
      <TextInput state="success" inputMessage="مشاهده خطا" placeholder="جستجو..." />
      <TextInput state="warning" inputMessage="مشاهده خطا" placeholder="جستجو..." />
    </div>
  ),
};

export const OutlineTextInputs: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <TextInput variant="outline" color="primary" placeholder="Primary Outline" />
      <TextInput variant="outline" color="secondary" placeholder="Secondary Outline" />
      <TextInput variant="outline" color="success" placeholder="Success Outline" />
      <TextInput variant="outline" color="error" placeholder="Error Outline" />
      <TextInput variant="outline" color="warning" placeholder="Warning Outline" />
      <TextInput variant="outline" color="info" placeholder="Info Outline" />
      <TextInput variant="outline" color="neutral" placeholder="Neutral Outline" />
    </div>
  ),
};

export const FillTextInputs: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <TextInput variant="fill" color="primary" placeholder="Primary Fill" />
      <TextInput variant="fill" color="secondary" placeholder="Secondary Fill" />
      <TextInput variant="fill" color="success" placeholder="Success Fill" />
      <TextInput variant="fill" color="error" placeholder="Error Fill" />
      <TextInput variant="fill" color="warning" placeholder="Warning Fill" />
      <TextInput variant="fill" color="info" placeholder="Info Fill" />
      <TextInput variant="fill" color="neutral" placeholder="Neutral Fill" />
    </div>
  ),
};

export const GhostTextInputs: Story = {
  render: () => (
    <div className="flex flex-wrap gap-5">
      <TextInput variant="ghost" color="primary" placeholder="Primary Ghost" />
      <TextInput variant="ghost" color="secondary" placeholder="Secondary Ghost" />
      <TextInput variant="ghost" color="success" placeholder="Success Ghost" />
      <TextInput variant="ghost" color="error" placeholder="Error Ghost" />
      <TextInput variant="ghost" color="warning" placeholder="Warning Ghost" />
      <TextInput variant="ghost" color="info" placeholder="Info Ghost" />
      <TextInput variant="ghost" color="neutral" placeholder="Neutral Ghost" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput startIcon={<SearchIcon />} placeholder="Start Icon" />
      <TextInput endIcon={<SearchIcon />} placeholder="End Icon" />
      <TextInput endIcon={<SearchIcon />} startIcon={<SearchIcon />} placeholder="Both Icons" />
    </div>
  ),
};

export const WithEndAction: Story = {
  render: () => (
    <div className="flex flex-col gap-5">
      <TextInput
        endAction={<Button className="button-text-xs">ارسال</Button>}
        classNames={{ root: 'textInput-sm-endAction' }}
        placeholder="جستجو..."
      />
      <TextInput
        endAction={<Button className="button-text-sm">ارسال</Button>}
        classNames={{ root: 'textInput-md-endAction' }}
        placeholder="جستجو..."
      />
      <TextInput
        endAction={<Button className="button-text-md">ارسال</Button>}
        classNames={{ root: 'textInput-lg-endAction' }}
        placeholder="جستجو..."
      />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col">
      <TextInput
        label="ایمیل"
        classNames={{ root: 'textInput-sm', label: 'textInput-sm-label' }}
        placeholder="جستجو..."
      />
      <TextInput
        label="ایمیل"
        classNames={{ root: 'textInput-md', label: 'textInput-md-label' }}
        placeholder="جستجو..."
      />
      <TextInput
        label="ایمیل"
        classNames={{ root: 'textInput-lg', label: 'textInput-lg-label' }}
        placeholder="جستجو..."
      />
    </div>
  ),
};

export const WithInputMessage: Story = {
  render: () => (
    <div className="flex flex-col">
      <TextInput
        state="error"
        label="ایمیل"
        inputMessage="مشاهده خطا"
        classNames={{
          root: 'textInput-sm',
          label: 'textInput-sm-label',
          inputMessage: 'textInput-sm-inputMessage',
        }}
        placeholder="جستجو..."
      />
      <TextInput
        state="warning"
        label="ایمیل"
        inputMessage="مشاهده خطا"
        classNames={{
          root: 'textInput-md',
          label: 'textInput-md-label',
          inputMessage: 'textInput-md-inputMessage',
        }}
        placeholder="جستجو..."
      />
      <TextInput
        state="success"
        label="ایمیل"
        inputMessage="مشاهده خطا"
        classNames={{
          root: 'textInput-lg',
          label: 'textInput-lg-label',
          inputMessage: 'textInput-lg-inputMessage',
        }}
        placeholder="جستجو..."
      />
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="flex w-full flex-col gap-5">
      <TextInput placeholder="Normal Text Input" />
      <TextInput fullWidth placeholder="Fullwidth Text Input" />
    </div>
  ),
};
