import { Meta, StoryObj } from '@storybook/nextjs';
import { Label } from './label';
import { TextInput } from '@/components/ui/text-input';

const meta: Meta<typeof Label> = {
  title: 'UI/Label',
  component: Label,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Label>;

export const Tests: Story = {
  args: {
    htmlFor: 'email',
    color: 'primary',
    size: 'md',
    align: 'right',
  },
  render: (args: Story['args']) => <Label {...args}>آدرس ایمیل</Label>,
};

export const Basic: Story = {
  render: () => (
    <div className="flex gap-2">
      <Label htmlFor="checkBox">آدرس ایمیل</Label>
      <input id="checkBox" type="checkbox" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <Label color="primary">Primary Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label color="secondary">Secondary Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label color="success">Success Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label color="error">Error Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label color="warning">Warning Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label color="info">Info Color</Label>
        <input type="checkbox" />
      </div>
      <div className="flex gap-2">
        <Label htmlFor="neutralColor" color="neutral">
          Neutral Color
        </Label>
        <input id="neutralColor" type="checkbox" />
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="xs" size="xs" align="right">
          ایمیل
        </Label>
        <TextInput id="xs" placeholder="ایمیل خود را وارد کنید" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="sm" size="sm" align="right">
          ایمیل
        </Label>
        <TextInput id="sm" placeholder="ایمیل خود را وارد کنید" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="md" size="md" align="right">
          ایمیل
        </Label>
        <TextInput id="md" placeholder="ایمیل خود را وارد کنید" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="lg" size="lg" align="right">
          ایمیل
        </Label>
        <TextInput id="lg" placeholder="ایمیل خود را وارد کنید" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="xl" size="xl" align="right">
          ایمیل
        </Label>
        <TextInput id="xl" placeholder="ایمیل خود را وارد کنید" />
      </div>
    </div>
  ),
};

export const Aligns: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="xs" size="md" align="right">
          Right
        </Label>
        <TextInput id="xs" placeholder="Right label" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="sm" size="md" align="left">
          Left
        </Label>
        <TextInput id="sm" placeholder="Left label" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="md" size="md" align="center">
          Center
        </Label>
        <TextInput id="md" placeholder="Center label" />
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="lg" size="md" align="justify">
          Justify
        </Label>
        <TextInput id="lg" placeholder="Justify label" />
      </div>
    </div>
  ),
};
