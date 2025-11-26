import { customFetch, ApiError } from '@/utils/custom-fetch';
import { logger } from '@/utils/logger';
import type { UserRecord } from '@/schemas/user.schema';
import {
  convertUserRecordToPayload,
  mapProfileApiToUserRecord,
  type EmployeeProfileApiModel,
  type EmployeeProfilePayload,
  hasFileInPayload,
  buildEmployeeProfileFormData,
} from '@/utils/profile-mappers';

const ERROR_MESSAGES = {
  UNAUTHORIZED: 'auth.errors.unauthorized',
  NETWORK_ERROR: 'auth.errors.networkError',
  VALIDATION_ERROR: 'validation.error',
} as const;

interface EmployeeProfileApiResponse {
  success?: boolean;
  message?: string;
  data?: EmployeeProfileApiModel;
  profile?: EmployeeProfileApiModel;
}

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

const resolveProfilePayload = (response: EmployeeProfileApiResponse | EmployeeProfileApiModel) => {
  if ('data' in response && response.data) return response.data;
  if ('profile' in response && response.profile) return response.profile;
  if ('id' in response || 'user' in response) {
    return response as EmployeeProfileApiModel;
  }
  return undefined;
};

export interface GetEmployeeProfileResult {
  success: boolean;
  profile?: UserRecord;
  message?: string;
}

export async function getEmployeeProfileApi(): Promise<GetEmployeeProfileResult> {
  try {
    const response = await customFetch<EmployeeProfileApiResponse>('/employee/profile', {
      method: 'GET',
      requiresAuth: true,
    });

    if (response.success === false) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.UNAUTHORIZED,
      };
    }

    const apiProfile = resolveProfilePayload(response);
    if (!apiProfile) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.NETWORK_ERROR,
      };
    }

    const profile = mapProfileApiToUserRecord(apiProfile);
    logger.info('Profile fetched successfully', { userId: profile.id });

    return { success: true, profile };
  } catch (error) {
    logger.error('Failed to fetch profile', error);
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

export interface SaveEmployeeProfileResult {
  success: boolean;
  profile?: UserRecord;
  message?: string;
}

export async function saveEmployeeProfileApi(
  user: UserRecord
): Promise<SaveEmployeeProfileResult> {
  const payload: EmployeeProfilePayload = convertUserRecordToPayload(user);
  const body = hasFileInPayload(payload) ? buildEmployeeProfileFormData(payload) : payload;

  try {
    const response = await customFetch<EmployeeProfileApiResponse>('/employee/profile', {
      method: 'POST',
      body,
      requiresAuth: true,
    });

    if (response.success === false) {
      return {
        success: false,
        message: response.message || ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }

    const apiProfile = resolveProfilePayload(response);
    const profile = apiProfile ? mapProfileApiToUserRecord(apiProfile) : user;
    logger.info('Profile saved successfully', { userId: profile.id });

    return {
      success: true,
      profile,
      message: response.message,
    };
  } catch (error) {
    logger.error('Failed to save profile', error);
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}
