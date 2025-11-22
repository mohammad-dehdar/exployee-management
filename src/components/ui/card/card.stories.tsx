import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs';
import {
  Card,
  CardAction,
  CardHeader,
  CardMedia,
  CardContent,
  CardDescription,
  CardTitle,
} from './card';
import { Button } from '@/components/ui';
import Image from 'next/image';

const meta: Meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Tests: Story = {
  args: {
    children: 'A Sample Card',
    className: 'bg-neutral-900 text-white p-6',
  },
  render: (args) => <Card {...args}>{args.children}</Card>,
};


export const Basic: Story = {
  render: () => (
    <Card className="flex w-52 flex-col items-center rounded-2xl bg-gray-100 px-2 py-5 shadow-2xl">
      <CardHeader className="flex w-full flex-col items-center gap-2">
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p>Card Content</p>
      </CardContent>
      <CardAction className="flex justify-center">
        <Button className="button-text-sm">Click Me</Button>
      </CardAction>
    </Card>
  ),
};

export const SpecialCase: Story = {
  render: () => (
    <Card className="grid w-[22%] grid-rows-4">
      <div className="relative row-span-3 row-start-1 flex justify-center">
        <CardMedia className="absolute h-full w-full overflow-hidden rounded-2xl">
          <Image
            src="https://images.openai.com/thumbnails/url/hea0Pnicu1mUUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw4qiPIrMgywLE3P9fDJyM4pNigpT3XxKTMp8y50zfSv9I1KMTUoCfEKCqxISo0PTCk1MvF0c00P8PZWKwYA4A0pig"
            width={1000}
            height={700}
            alt="Game image"
            className="h-full w-full object-cover"
          />
        </CardMedia>
        <CardTitle className="bg-background absolute bottom-0 z-[1] mb-4 flex items-center justify-center rounded-lg">
          <p className="w-fit px-4 py-2 text-xs">ps4/5 | Xbox s/x | steam</p>
        </CardTitle>
      </div>
      <CardContent className="row-span-1 row-start-4 mt-1 flex flex-col items-center gap-1">
        <CardHeader>
          <h2 className="text-xl font-semibold">Battelfield بازی</h2>
        </CardHeader>
        <CardDescription className="flex w-full flex-col items-center gap-1">
          <p className="text-l">همه ظرفیت ها + تحویل فوری</p>
          <p className="text-xl font-semibold">
            <span>تومان </span>
            <span>350000</span>
          </p>
        </CardDescription>
      </CardContent>
    </Card>
  ),
};
