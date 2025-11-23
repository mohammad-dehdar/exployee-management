'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useAuthStore, type Account } from '@/store/store';

export function useRequireAuth(requiredRole?: 'admin' | 'user') {
  const router = useRouter();
  const { currentUserId, accounts } = useAuthStore();

  useEffect(() => {
    if (!currentUserId) {
      router.replace('/');
      return;
    }

    if (requiredRole) {
      const account = accounts.find(acc => acc.id === currentUserId);
      if (!account || account.role !== requiredRole) {
        router.replace('/');
      }
    }
  }, [currentUserId, requiredRole, accounts, router]);

  const currentAccount = accounts.find(acc => acc.id === currentUserId);

  return {
    isAuthenticated: !!currentUserId,
    currentAccount: currentAccount as Account | undefined,
  };
}

