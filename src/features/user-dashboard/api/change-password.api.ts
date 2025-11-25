import { customFetch, ApiError } from '@/utils/custom-fetch';
import { setTokens } from '@/utils/auth-service';
import { logger } from '@/utils/logger';

const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'auth.errors.userNotFound',
  WRONG_PASSWORD: 'auth.errors.wrongPassword',
  NETWORK_ERROR: 'auth.errors.networkError',
} as const;

interface ChangePasswordResponse {
  success: boolean;
  message?: string;
  token?: string;
}

const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    if (apiError.status === 404) {
      return ERROR_MESSAGES.USER_NOT_FOUND;
    }
    if (apiError.status === 403) {
      return ERROR_MESSAGES.WRONG_PASSWORD;
    }
  }
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface ChangePasswordResult {
  success: boolean;
  token?: string;
  message?: string;
}

export async function changePasswordApi(
  userId: string,
  payload: { currentPassword: string; newPassword: string }
): Promise<ChangePasswordResult> {
  try {
    const response = await customFetch<ChangePasswordResponse>(
      `/accounts/${userId}/change-password`,
      {
        method: 'POST',
        body: payload,
        requiresAuth: true,
      }
    );

    if (!response.success || !response.token) {
      return {
        success: false,
        message: response.message ?? ERROR_MESSAGES.WRONG_PASSWORD,
      };
    }

    setTokens({ accessToken: response.token });
    logger.info('Password changed successfully', { userId });

    return {
      success: true,
      token: response.token,
    };
  } catch (error) {
    logger.error('Password change failed', error, { userId });
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

