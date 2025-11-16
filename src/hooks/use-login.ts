'use client';

import { useState } from 'react';
import { useAuth } from './use-auth';
import { loginSchema, type LoginInput } from '@/schemas/auth.schema';
import type { ZodIssue } from 'zod';

/**
 * Hook برای مدیریت فرم login
 */
export function useLogin() {
  const { login, isLoggingIn, loginError } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
  });

  const validate = (data: LoginInput): boolean => {
    const validationResult = loginSchema.safeParse(data);
    if (!validationResult.success) {
      const fieldErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue: ZodIssue) => {
        if (issue.path && issue.path[0]) {
          fieldErrors[issue.path[0] as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleChange = (field: keyof LoginInput) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    if (!validate(formData)) {
      return;
    }

    login(formData);
  };

  // Extract field errors from API error
  const getFieldErrors = (): Record<string, string> => {
    if (loginError?.response?.data?.errors) {
      const fieldErrors: Record<string, string> = {};
      loginError.response.data.errors.forEach((err) => {
        if (err.path && err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      return fieldErrors;
    }
    return {};
  };

  return {
    formData,
    errors: { ...errors, ...getFieldErrors() },
    handleChange,
    handleSubmit,
    isLoading: isLoggingIn,
    reset: () => {
      setFormData({ email: '', password: '' });
      setErrors({});
    },
  };
}
