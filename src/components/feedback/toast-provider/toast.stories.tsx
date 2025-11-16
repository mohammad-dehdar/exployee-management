import React from 'react';
import { Meta, StoryObj } from '@storybook/nextjs-vite';

import { ToastProvider, toastSuccess, toastError, toastInfo, toastWarning } from './toast-provider';
import { Button } from '@/components/ui';
import { Flip, Slide, Zoom } from 'react-toastify';

const meta: Meta<typeof ToastProvider> = {
  title: 'Feedback/ToastProvider',
  component: ToastProvider,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof ToastProvider>;

export const WithProviderWrapper: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex flex-col items-center justify-center gap-4 p-10">
        <h2 className="text-xl font-semibold">Toast Notifications</h2>
        <p className="text-muted-foreground text-center text-sm">
          ToastProvider در روت پروژه wrap شده است .
        </p>
        <p className="text-muted-foreground text-center text-sm">
          شما فقط باید از فانکشن های زیر استفاده کنید
        </p>
        <div className="flex gap-3">
          <Button
            className="bg-success text-neutral-10 rounded-xl px-5 py-2"
            onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
          >
            Success
          </Button>
          <Button
            className="bg-error text-neutral-10 rounded-xl px-5 py-2"
            onClick={() => toastError('خطایی رخ داده')}
          >
            Error
          </Button>
          <Button
            className="bg-warning text-neutral-10 rounded-xl px-5 py-2"
            onClick={() => toastWarning('هشدار! موردی بررسی شود')}
          >
            Warning
          </Button>
          <Button
            className="bg-info text-neutral-10 rounded-xl px-5 py-2"
            onClick={() => toastInfo('این یک پیام اطلاع‌رسانی است')}
          >
            Info
          </Button>
        </div>
      </div>
    </>
  ),
};

export const WithPosition: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          position Default
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'top-center',
            })
          }
        >
          position top-center
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'top-right',
            })
          }
        >
          position top-right
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'top-left',
            })
          }
        >
          position top-left
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'bottom-center',
            })
          }
        >
          position bottom-center
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'bottom-right',
            })
          }
        >
          position bottom-right
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              position: 'bottom-left',
            })
          }
        >
          position bottom-left
        </Button>
      </div>
    </>
  ),
};

export const autoClose: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              autoClose: 2000,
            })
          }
        >
          With autoClose 2000
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              autoClose: false,
            })
          }
        >
          Without autoClose
        </Button>
      </div>
    </>
  ),
};

export const WithTransition: Story = {
  render: () => (
    <>
      <ToastProvider />
      <></>
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          Transition Default - Bounce
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              transition: Slide,
            })
          }
        >
          Transition Default - Slide
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              transition: Flip,
            })
          }
        >
          Transition Default - Flip
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              transition: Zoom,
            })
          }
        >
          Transition Default - Zoom
        </Button>
      </div>
    </>
  ),
};

export const CloseOnClick: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          With closeOnClick Default - True
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              closeOnClick: false,
            })
          }
        >
          Without closeOnClick - false
        </Button>
      </div>
    </>
  ),
};

export const PauseOnHover: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          With PauseOnHover Default - True
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              pauseOnHover: false,
            })
          }
        >
          Without PauseOnHover - false
        </Button>
      </div>
    </>
  ),
};

export const Rtl: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          With Rtl Default - True
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              rtl: false,
            })
          }
        >
          Rtl - false
        </Button>
      </div>
    </>
  ),
};

export const ProgressBar: Story = {
  render: () => (
    <>
      <ToastProvider />
      <div className="flex gap-3">
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() => toastSuccess('عملیات با موفقیت انجام شد')}
        >
          With ProgressBar Default
        </Button>
        <Button
          className="bg-success text-neutral-10 rounded-xl px-5 py-2"
          onClick={() =>
            toastSuccess('عملیات با موفقیت انجام شد', {
              hideProgressBar: true,
            })
          }
        >
          Without ProgressBar
        </Button>
      </div>
    </>
  ),
};
