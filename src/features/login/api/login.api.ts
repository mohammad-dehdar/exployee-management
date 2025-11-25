import { customFetch, ApiError } from '@/utils/custom-fetch';
import { setTokens } from '@/utils/auth-service';
import { logger } from '@/utils/logger';
import type { Account } from '@/store/auth.store';
import { LoginResponseSchema } from '@/features/login/schemas/login.schema';

const ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'auth.errors.invalidCredentials',
  NETWORK_ERROR: 'auth.errors.networkError',
  VALIDATION_ERROR: 'validation.error',
} as const;

const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    if (apiError.status === 401) {
      return ERROR_MESSAGES.INVALID_CREDENTIALS;
    }
  }
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export async function loginApi(email: string, password: string) {
  try {
    const rawResponse = await customFetch<unknown>('/accounts/login', {
      method: 'POST',
      body: {
        email: email.trim().toLowerCase(),
        password,
      },
    });

    // Validate response with zod schema
    const validationResult = LoginResponseSchema.safeParse(rawResponse);

    if (!validationResult.success) {
      logger.error('Invalid login response format', validationResult.error, { email });
      return {
        success: false,
        message: ERROR_MESSAGES.VALIDATION_ERROR,
      };
    }

    const response = validationResult.data;

    if (!response.success) {
      return {
        success: false,
        message: response.message ?? ERROR_MESSAGES.INVALID_CREDENTIALS,
      };
    }

    if (!response.user || !response.accessToken) {
      return {
        success: false,
        message: ERROR_MESSAGES.INVALID_CREDENTIALS,
      };
    }

    setTokens({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    });

    const account: Account = {
      id: response.user.id,
      email: response.user.email,
      role: response.user.role,
      name: response.user.name,
    };

    logger.info('Login successful', { userId: account.id, email: account.email });

    return {
      success: true,
      account,
      role: account.role,
      token: response.accessToken,
    };
  } catch (error) {
    logger.error('Login failed', error, { email });
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

