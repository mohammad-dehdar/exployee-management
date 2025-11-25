import { customFetch, ApiError } from '@/utils/custom-fetch';
import { setTokens } from '@/utils/auth-service';
import { logger } from '@/utils/logger';
import { createEmptyProfile } from '@/schemas/user.schema';
import type { Account } from '@/store/auth.store';
import type { UserRecord } from '@/schemas/user.schema';

const ERROR_MESSAGES = {
  EMAIL_EXISTS: 'auth.errors.emailExists',
  NETWORK_ERROR: 'auth.errors.networkError',
} as const;

interface RegisterApiResponse {
  success: boolean;
  message?: string;
  error?: string;
  user?: {
    id: string;
    email: string;
    role: Account['role'];
    name?: string;
  };
  profile?: UserRecord;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
}

// Helper function to map API error to i18n key
const mapApiErrorToMessage = (error: ApiError | unknown): string => {
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    if (apiError.status === 409) {
      return ERROR_MESSAGES.EMAIL_EXISTS;
    }
  }
  
  return ERROR_MESSAGES.NETWORK_ERROR;
};

export interface RegisterUserResult {
  success: boolean;
  account?: Account;
  profile?: UserRecord;
  token?: string;
  message?: string;
}

export async function registerUserApi(
  payload: { email: string; password: string; name?: string; orgEmail?: string }
): Promise<RegisterUserResult> {
  try {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const normalizedOrgEmail = payload.orgEmail?.trim().toLowerCase();

    const response = await customFetch<RegisterApiResponse>('/accounts/register', {
      method: 'POST',
      body: {
        email: normalizedEmail,
        password: payload.password,
        name: payload.name || '',
        orgEmail: normalizedOrgEmail || '',
      },
      requiresAuth: false,
    });

    const { user, profile, token, accessToken, refreshToken } = response;

    if (!response.success || !user) {
      return {
        success: false,
        message: response.message || response.error || ERROR_MESSAGES.EMAIL_EXISTS,
      };
    }

    const resolvedToken = token ?? accessToken;
    if (resolvedToken) {
      setTokens({ accessToken: resolvedToken, refreshToken });
    }

    const account: Account = {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    };

    logger.info('User registration successful', { userId: user.id, email: user.email });

    return {
      success: true,
      account,
      profile: profile || createEmptyProfile(
        user.id,
        normalizedEmail,
        payload.name,
        normalizedOrgEmail
      ),
      token: resolvedToken,
    };
  } catch (error) {
    logger.error('User registration failed', error, { email: payload.email });
    return {
      success: false,
      message: mapApiErrorToMessage(error),
    };
  }
}

