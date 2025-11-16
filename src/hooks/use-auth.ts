'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/user.store';
import { authService } from '@/services/auth-service';
import { toastSuccess, toastError } from '@/components/feedback';
import type { LoginInput, SignupInput } from '@/schemas/auth.schema';
import type { AxiosError } from 'axios';
import type { ApiError } from '@/services/types';

/**
 * Hook برای مدیریت authentication
 */
export function useAuth() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user, setUser, logout: logoutStore } = useUserStore();

  // دریافت اطلاعات کاربر فعلی
  const { data: currentUser, isLoading: isLoadingUser } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const response = await authService.getCurrentUser();
      if (response.user) {
        setUser(response.user);
      }
      return response.user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.user);
      queryClient.setQueryData(['auth', 'user'], response.user);
      toastSuccess('ورود با موفقیت انجام شد');
      router.push('/dashboard');
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'خطا در ورود';
      toastError(errorMessage);
    },
  });

  // Signup mutation
  const signupMutation = useMutation({
    mutationFn: (data: SignupInput) => authService.signup(data),
    onSuccess: () => {
      toastSuccess('ثبت‌نام با موفقیت انجام شد');
      router.push('/login');
    },
    onError: (error: AxiosError<ApiError>) => {
      const errorMessage = error.response?.data?.message || 'خطا در ثبت‌نام';
      toastError(errorMessage);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logoutStore();
      queryClient.setQueryData(['auth', 'user'], null);
      queryClient.clear();
      toastSuccess('خروج با موفقیت انجام شد');
      router.push('/login');
    },
    onError: () => {
      // حتی اگر خطا رخ دهد، کاربر را logout می‌کنیم
      logoutStore();
      queryClient.setQueryData(['auth', 'user'], null);
      router.push('/login');
    },
  });

  return {
    user: user || currentUser,
    isLoadingUser,
    isAuthenticated: !!user || !!currentUser,
    login: loginMutation.mutate,
    loginAsync: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    signup: signupMutation.mutate,
    signupAsync: signupMutation.mutateAsync,
    isSigningUp: signupMutation.isPending,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error as AxiosError<ApiError> | null,
    signupError: signupMutation.error as AxiosError<ApiError> | null,
  };
}
