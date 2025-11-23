'use client';

import { useState, FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/store/store';
import { toastError, toastSuccess } from '@/components/feedback/toast-provider/toast-provider';

export function useCreateUserForm() {
  const t = useTranslations();
  const registerUser = useAuthStore((state) => state.registerUser);

  const [email, setEmail] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await registerUser({ email, password, displayName, orgEmail });

      if (!result.success) {
        toastError(result.message ?? t('adminDashboard.createUser.error'));
        return;
      }

      toastSuccess(t('adminDashboard.createUser.success'));
      // Reset form
      setEmail('');
      setOrgEmail('');
      setPassword('');
      setDisplayName('');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    orgEmail,
    setOrgEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    handleSubmit,
    isLoading,
  };
}

