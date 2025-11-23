'use client';

import { useEffect, useMemo } from 'react';
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

export function useUserForm() {
  const t = useTranslations('userForm');
  const { profiles, updateProfile, currentUserId } = useAuthStore();
  const { currentAccount: account } = useRequireAuth('user');

  const profile = useMemo(
    () => currentUserId ? profiles[currentUserId] : undefined,
    [profiles, currentUserId]
  );

  const safeProfile = useMemo(
    () =>
      profile ?? {
        id: account?.id ?? 'pending',
        personal: { username: account?.displayName },
        contact: { personalEmail: account?.email },
        job: {},
        financial: {},
        education: {},
        workHistory: [{ company: '', role: '', description: '', startDate: '', endDate: '' }],
        certificates: [{ title: '', issuer: '', issueDate: '', duration: '' }],
        attachments: {},
        additional: {},
      },
    [profile, account]
  );

  const methods = useForm<UserRecord>({ 
    defaultValues: safeProfile,
    resolver: zodResolver(userRecordSchema),
    mode: 'onBlur',
  });

  useEffect(() => {
    methods.reset(safeProfile);
  }, [safeProfile, methods]);

  const completionPercent = useMemo(
    () => calculateCompletionPercent(safeProfile),
    [safeProfile]
  );

  const onSubmit = async (data: UserRecord) => {
    if (!account) return;
    
    const validation = userRecordSchema.safeParse(data);
    if (!validation.success) {
      toastError(t('messages.validationError'));
      console.error(validation.error);
      return;
    }
    
    await updateProfile(account.id, data);
    toastSuccess(t('messages.saveSuccess'));
  };

  const handleReset = () => {
    methods.reset({
      personal: { username: account?.displayName },
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

