import { customFetch, ApiError } from '@/utils/custom-fetch';
import { logger } from '@/utils/logger';

const ERROR_MESSAGES = {
  UNAUTHORIZED: 'auth.errors.unauthorized',
  NETWORK_ERROR: 'auth.errors.networkError',
} as const;

export interface EmployeeItem {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'employee' | 'admin' | 'user';
    joinedAt: string;
  };
  fullName?: string;
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  mobile?: string;
  position?: string;
  contractType?: string;
  workLocation?: string;
  startDate?: string;
  details?: {
    id: string;
    education?: Record<string, unknown>;
    workHistory?: Array<Record<string, unknown>>;
    certificates?: Array<Record<string, unknown>>;
    additional?: Record<string, unknown>;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface GetEmployeesApiResponse {
  success: boolean;
  message?: string;
  data?: EmployeeItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Helper function to map API error to i18n key
const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 401 || apiError.status === 403) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }
  }
  
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface GetEmployeesResult {
  success: boolean;
  employees?: EmployeeItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  message?: string;
}

export async function getEmployeesApi(
  params?: { page?: number; limit?: number }
): Promise<GetEmployeesResult> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.page) {
      queryParams.append('page', params.page.toString());
    }
    if (params?.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const queryString = queryParams.toString();
    const endpoint = `/admin/employees${queryString ? `?${queryString}` : ''}`;

    const response = await customFetch<GetEmployeesApiResponse>(endpoint, {
      method: 'GET',
      requiresAuth: true,
    });

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    logger.info('Employees fetched successfully', { 
      count: response.data.length,
      page: response.pagination?.page,
    });

    return {
      success: true,
      employees: response.data,
      pagination: response.pagination,
    };
  } catch (error) {
    logger.error('Failed to fetch employees', error);
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

