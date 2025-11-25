'use client';

import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/store';
import { toastError, toastSuccess } from '@/components/feedback/toast-provider/toast-provider';
import { useState } from 'react';
import { registerUserApi } from '../api/register.api';
import type { RegisterUserFormData } from '../schemas/register-user.schema';

export function useRegisterUserForm() {
  const t = useTranslations();
  const { addAccount, setCurrentUserId, setAuthToken, addProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: RegisterUserFormData) => {
    setIsLoading(true);

    try {
      const result = await registerUserApi({
        email: data.email,
        password: data.password,
        name: data.displayName || '',
        orgEmail: data.orgEmail || '',
      });

      if (!result.success) {
        toastError(result.message ?? t('adminDashboard.createUser.error'));
        return;
      }

      if (result.account && result.profile && result.token) {
        addAccount(result.account);
        setCurrentUserId(result.account.id);
        setAuthToken(result.token);
        addProfile(result.account.id, result.profile);
      }

      toastSuccess(t('adminDashboard.createUser.success'));
    } catch {
      toastError(t('adminDashboard.createUser.error'));
    } finally {
      setIsLoading(false);
    }
  };

  return {
    onSubmit,
    isLoading,
  };
}

