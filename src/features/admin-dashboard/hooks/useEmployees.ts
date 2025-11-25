import { useState, useEffect } from 'react';
import { getEmployeesApi, type EmployeeItem } from '../api/get-employees.api';
import { toastError } from '@/components/feedback/toast-provider/toast-provider';
import { useTranslations } from 'next-intl';

export function useEmployees(page: number = 1, limit: number = 10) {
  const t = useTranslations();
  const [employees, setEmployees] = useState<EmployeeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<{
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getEmployeesApi({ page, limit });

      if (result.success && result.employees) {
        setEmployees(result.employees);
        if (result.pagination) {
          setPagination(result.pagination);
        }
      } else {
        const errorMessage = result.message || t('auth.errors.networkError');
        setError(errorMessage);
        toastError(errorMessage);
      }

      setIsLoading(false);
    };

    fetchEmployees();
  }, [page, limit, t]);

  return {
    employees,
    isLoading,
    error,
    pagination,
    refetch: () => {
      setIsLoading(true);
      getEmployeesApi({ page, limit }).then((result) => {
        if (result.success && result.employees) {
          setEmployees(result.employees);
          if (result.pagination) {
            setPagination(result.pagination);
          }
        }
        setIsLoading(false);
      });
    },
  };
}

