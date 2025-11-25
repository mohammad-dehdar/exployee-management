'use client';

import { useEffect, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/store/store';
import { useRequireAuth } from '@/utils/route-guards';
import { 
  userRecordSchema, 
  type UserRecord,
  calculateCompletionPercent 
} from '@/schemas/user.schema';
import { toastError, toastSuccess } from '@/components/feedback';
import { logger } from '@/utils/logger';

export function useUserForm() {
  const t = useTranslations('userForm');
  const { profiles, updateProfile, currentUserId } = useAuthStore();
  const { currentAccount: account } = useRequireAuth('user');

  const profile = currentUserId ? profiles[currentUserId] : undefined;

  const safeProfile = useMemo(
    () =>
      profile ?? {
        id: account?.id ?? 'pending',
        personal: { username: account?.name },
        contact: { personalEmail: account?.email },
        job: {},
        financial: {},
        education: {},
        workHistory: [],
        certificates: [],
        attachments: {},
        additional: {},
      },
    [profile, account]
  );

  const methods = useForm<UserRecord>({ 
    defaultValues: safeProfile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(userRecordSchema) as any,
    mode: 'onBlur',
  });

  useEffect(() => {
    methods.reset(safeProfile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeProfile]);

  const completionPercent = calculateCompletionPercent(safeProfile);

  const onSubmit = useCallback(async (data: UserRecord) => {
    if (!account) return;
    
    const validation = userRecordSchema.safeParse(data);
    if (!validation.success) {
      logger.error('Form validation failed', validation.error, { userId: account.id });
      toastError(t('messages.validationError'));
      return;
    }
    
    try {
      await updateProfile(account.id, data);
      toastSuccess(t('messages.saveSuccess'));
      logger.info('Profile updated successfully', { userId: account.id });
    } catch (error) {
      logger.error('Failed to update profile', error, { userId: account.id });
      toastError(t('messages.saveError') || 'Failed to save profile');
    }
  }, [account, updateProfile, t]);

  const handleReset = () => {
    methods.reset({
      personal: { username: account?.name },
      contact: { personalEmail: account?.email },
      job: {},
      financial: {},
      education: {},
      workHistory: [{ company: '', role: '', description: '', startDate: '', endDate: '' }],
      certificates: [{ title: '', issuer: '', issueDate: '', duration: '' }],
      attachments: {},
      additional: {},
    });
  };

  return {
    methods,
    onSubmit,
    handleReset,
    completionPercent,
    account,
  };
}

