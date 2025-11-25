'use client';

import { useEffect } from 'react';
import { useRouter } from '@/i18n/routing';
import { useAuthStore, type Account } from '@/store/store';

type Role = 'admin' | 'user' | 'employee';

export function useRequireAuth(requiredRole?: Role) {
  const router = useRouter();
  const { currentUserId, accounts } = useAuthStore();

  useEffect(() => {
    if (!currentUserId) {
      router.replace('/');
      return;
    }

    if (requiredRole) {
      const account = accounts.find(acc => acc.id === currentUserId);
      const allowedRoles = requiredRole === 'user' ? ['user', 'employee'] : [requiredRole];

      if (!account || !allowedRoles.includes(account.role as Role)) {
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

