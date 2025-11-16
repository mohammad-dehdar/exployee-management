import type { User } from '@/store/user.store';

/**
 * Payload موجود در JWT token
 */
export interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

/**
 * Response برای login API
 */
export interface LoginResponse {
  message: string;
  user: User;
}

/**
 * Response برای signup API
 */
export interface SignupResponse {
  message: string;
  user: {
    id: string;
    email: string;
    name?: string;
    role?: string;
  };
}

/**
 * ساختار خطای API
 */
export interface ApiError {
  message: string;
  errors?: Array<{
    path: (string | number)[];
    message: string;
  }>;
}

/**
 * Response عمومی برای API calls
 */
export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  errors?: Array<{
    path: (string | number)[];
    message: string;
  }>;
}
