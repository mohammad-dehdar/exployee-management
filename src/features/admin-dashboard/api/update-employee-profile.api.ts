import { customFetch, ApiError } from '@/utils/custom-fetch';
import { logger } from '@/utils/logger';
import type { EmployeeProfilePayload } from '@/utils/profile-mappers';
import { hasFileInPayload, buildEmployeeProfileFormData } from '@/utils/profile-mappers';

const ERROR_MESSAGES = {
  UNAUTHORIZED: 'auth.errors.unauthorized',
  NETWORK_ERROR: 'auth.errors.networkError',
  VALIDATION_ERROR: 'validation.error',
} as const;

interface UpdateEmployeeProfileApiResponse {
  success: boolean;
  message?: string;
  data?: unknown;
}

// Helper function to map API error to i18n key
const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 401 || apiError.status === 403) {
      return ERROR_MESSAGES.UNAUTHORIZED;
    }
    if (apiError.status === 400) {
      return ERROR_MESSAGES.VALIDATION_ERROR;
    }
  }
  
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface UpdateEmployeeProfileResult {
  success: boolean;
  message?: string;
  data?: unknown;
}

export async function updateEmployeeProfileApi(
  payload: EmployeeProfilePayload
): Promise<UpdateEmployeeProfileResult> {
  try {
    const endpoint = '/employee/profile';
    const body = hasFileInPayload(payload) ? buildEmployeeProfileFormData(payload) : payload;

    const response = await customFetch<UpdateEmployeeProfileApiResponse>(endpoint, {
      method: 'POST',
      body,
      requiresAuth: true,
    });

    if (!response.success) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    logger.info('Employee profile updated successfully');

    return {
      success: true,
      data: response.data,
      message: response.message,
    };
  } catch (error) {
    logger.error('Failed to update employee profile', error);
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

export { convertUserRecordToPayload } from '@/utils/profile-mappers';

