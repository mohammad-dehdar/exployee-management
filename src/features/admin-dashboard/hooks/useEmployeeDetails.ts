import { useState, useEffect } from 'react';
import { getEmployeeDetailsApi, type EmployeeDetails } from '../api/get-employee-details.api';
import { toastError } from '@/components/feedback/toast-provider/toast-provider';
import { useTranslations } from 'next-intl';

export function useEmployeeDetails(employeeId: string | undefined) {
  const t = useTranslations();
  const [employee, setEmployee] = useState<EmployeeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!employeeId) {
      // Use setTimeout to avoid synchronous setState in effect
      const timer = setTimeout(() => {
        setEmployee(null);
        setError(null);
        setIsLoading(false);
      }, 0);
      return () => clearTimeout(timer);
    }

    let cancelled = false;

    const fetchEmployeeDetails = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getEmployeeDetailsApi(employeeId);

      if (cancelled) return;

      if (result.success && result.employee) {
        setEmployee(result.employee);
      } else {
        const errorMessage = result.message || t('auth.errors.networkError');
        setError(errorMessage);
        toastError(errorMessage);
      }

      setIsLoading(false);
    };

    fetchEmployeeDetails();

    return () => {
      cancelled = true;
    };
  }, [employeeId, t]);

  return {
    employee,
    isLoading,
    error,
    refetch: () => {
      if (!employeeId) return;
      setIsLoading(true);
      getEmployeeDetailsApi(employeeId).then((result) => {
        if (result.success && result.employee) {
          setEmployee(result.employee);
        }
        setIsLoading(false);
      });
    },
  };
}

