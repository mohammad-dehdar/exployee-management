import { useState, useEffect, useCallback } from 'react';
import { getEmployeeDetailsApi, type EmployeeDetails } from '../api/get-employee-details.api';
import { toastError } from '@/components/feedback/toast-provider/toast-provider';
import { useTranslations } from 'next-intl';

export function useEmployeeDetails(employeeId: string | undefined) {
  const t = useTranslations();
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchEmployeeDetails = useCallback(async () => {
    if (!employeeId) {
      setEmployee(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const result = await getEmployeeDetailsApi(employeeId);

    if (result.success && result.employee) {
      setEmployee(result.employee);
    } else {
      const errorMessage = result.message || t('auth.errors.networkError');
      setError(errorMessage);
      toastError(errorMessage);
    }

    setIsLoading(false);
  }, [employeeId, t]);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [fetchEmployeeDetails]);

  return {
    employee,
    isLoading,
    error,
    refetch: fetchEmployeeDetails,
  };
}

