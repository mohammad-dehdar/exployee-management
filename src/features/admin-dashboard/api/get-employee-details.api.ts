import { customFetch, ApiError } from '@/utils/custom-fetch';
import { logger } from '@/utils/logger';

const ERROR_MESSAGES = {
  UNAUTHORIZED: 'auth.errors.unauthorized',
  NOT_FOUND: 'auth.errors.notFound',
  NETWORK_ERROR: 'auth.errors.networkError',
} as const;

export interface EmployeeDetails {
  id: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  mobile?: string;
  position?: string;
  user: {
    name: string;
    email: string;
    role: string;
    joinedAt: string;
  };
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

interface GetEmployeeDetailsApiResponse {
  success: boolean;
  message?: string;
  data?: EmployeeDetails;
}

// Helper function to map API error to i18n key
const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 401 || apiError.status === 403) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }
    if (apiError.status === 404) {
      return ERROR_MESSAGES.NOT_FOUND;
    }
  }
  
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface GetEmployeeDetailsResult {
  success: boolean;
  employee?: EmployeeDetails;
  message?: string;
}

export async function getEmployeeDetailsApi(
  employeeId: string
): Promise<GetEmployeeDetailsResult> {
  try {
    const endpoint = `/admin/employees/${employeeId}`;

    const response = await customFetch<GetEmployeeDetailsApiResponse>(endpoint, {
      method: 'GET',
      requiresAuth: true,
    });

    if (!response.success || !response.data) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    logger.info('Employee details fetched successfully', { 
      employeeId,
    });

    return {
      success: true,
      employee: response.data,
    };
  } catch (error) {
    logger.error('Failed to fetch employee details', error, { employeeId });
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

