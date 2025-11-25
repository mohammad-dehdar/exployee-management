'use client';

import React from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { ToastOptions, TypeOptions } from './type';

import {
  StatusIconsErrorIcon,
  StatusIconsInfoIcon,
  StatusIconsSuccessIcon,
  StatusIconsWarningIcon,
} from '@icons';

const icons = {
  success: <StatusIconsSuccessIcon className="size-6 sm:size-8" />,
  error: <StatusIconsErrorIcon className="size-6 sm:size-8" />,
  warning: <StatusIconsWarningIcon className="size-6 sm:size-8" />,
  info: <StatusIconsInfoIcon className="size-6 sm:size-8" />,
};

const classes = {
  success: 'bg-success-10 text-success-30 dark:bg-success-40 dark:text-success-20 font-dana!',
  error: 'bg-error-10 text-error-600 dark:bg-error-40 dark:text-error-20 font-dana!',
  warning: 'bg-warning-10 text-warning-30 dark:bg-warning-40 dark:text-warning-20 font-dana!',
  info: 'bg-info-10 text-info-30 dark:bg-info-40 dark:text-info-20 font-dana!',
};

const progress = {
  success: 'bg-success',
  error: 'bg-error',
  warning: 'bg-warning',
  info: 'bg-info',
};

export const ToastProvider: React.FC<ToastOptions> = ({
  position = 'top-center',
  autoClose = 5000,
  transition = Bounce,
  ...props
}) => {
  return (
    <ToastContainer
      position={position}
      autoClose={autoClose}
      hideProgressBar={false}
      closeOnClick
      rtl
      draggable
      pauseOnHover
      transition={transition}
      theme={undefined}
      {...props}
    />
  );
};

export const showToast = (message: string, type: TypeOptions, options?: ToastOptions) => {
  toast(message, {
    icon: icons[type],
    className: classes[type],
    progressClassName: progress[type],
    ...options,
  });
};

export const toastSuccess = (message: string, options?: ToastOptions) =>
  showToast(message, 'success', options);

export const toastError = (message: string, options?: ToastOptions) =>
  showToast(message, 'error', options);

export const toastInfo = (message: string, options?: ToastOptions) =>
  showToast(message, 'info', options);

export const toastWarning = (message: string, options?: ToastOptions) =>
  showToast(message, 'warning', options);
