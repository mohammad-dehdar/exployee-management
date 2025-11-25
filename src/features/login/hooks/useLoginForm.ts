'use client';

import { useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from '@/i18n/routing';
import { useAuthStore } from '@/store/store';
import { toastError, toastSuccess } from '@/components/feedback/toast-provider/toast-provider';
import { ROUTES } from '@/features/login/constants';
import { logger } from '@/utils/logger';
import { loginSchema, type LoginFormData } from '../schemas/login.schema';

export function useLoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const authStore = useAuthStore();
  const login = authStore.login;
  const currentUserId = authStore.currentUserId;
  const accounts = authStore.accounts;

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const isLoading = methods.formState.isSubmitting;
  const error = methods.formState.errors;

  useEffect(() => {
    if (!currentUserId) return;
    const account = accounts.find((acc) => acc.id === currentUserId);
    if (!account) return;
    router.push(account.role === 'admin' ? ROUTES.ADMIN_DASHBOARD : ROUTES.USER_DASHBOARD);
  }, [accounts, currentUserId, router]);

  const onSubmit = useCallback(async (data: LoginFormData) => {
    try {
      logger.info('Login attempt', { email: data.email });
      
      const result = await login(data.email, data.password);

      if (!result.success) {
        let errorMessage = result.message;
        if (errorMessage && errorMessage.includes('.')) {
          try {
            const translated = t(errorMessage);
            if (translated !== errorMessage) {
              errorMessage = translated;
            }
          } catch {
            errorMessage = t('auth.errors.invalidCredentials');
          }
        } else if (!errorMessage) {
          errorMessage = t('auth.errors.invalidCredentials');
        }
        
        methods.setError('root', {
          type: 'manual',
          message: errorMessage,
        });
        toastError(errorMessage);
        logger.warn('Login failed', { email: data.email, reason: result.message });
        return;
      }

      logger.info('Login successful', { 
        role: result.role,
        email: data.email 
      });
      
      toastSuccess(t('home.success.welcome'));
      
      const targetRoute = result.role === 'admin' 
        ? ROUTES.ADMIN_DASHBOARD 
        : ROUTES.USER_DASHBOARD;
      
      setTimeout(() => {
        router.push(targetRoute);
      }, 300);
    } catch (error) {
      const errorMessage = t('home.errors.loginFailed');
      methods.setError('root', {
        type: 'manual',
        message: errorMessage,
      });
      toastError(errorMessage);
      logger.error('Login error', error, { email: data.email });
    }
  }, [login, router, t, methods]);

  return {
    methods,
    onSubmit,
    isLoading,
    error,
  };
}

