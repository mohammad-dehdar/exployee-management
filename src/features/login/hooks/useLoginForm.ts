'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { useAuthStore } from '@/store/store';
import { toastError, toastSuccess } from '@/components/feedback/toast-provider/toast-provider';
import { ROUTES } from '@/features/login/constants';

export function useLoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const currentUserId = useAuthStore((state) => state.currentUserId);
  const accounts = useAuthStore((state) => state.accounts);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (!currentUserId) return;
    const account = accounts.find((acc) => acc.id === currentUserId);
    if (!account) return;
    router.push(account.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
  }, [accounts, currentUserId, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (!result.success) {
        toastError(result.message ?? t('home.errors.loginFailed'));
        return;
      }

      toastSuccess(t('home.success.welcome'));
      const targetRoute = result.role === 'admin' 
        ? ROUTES.ADMIN_DASHBOARD 
        : ROUTES.USER_DASHBOARD;
      router.push(targetRoute);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    isLoading,
  };
}

