/**
 * ======================
 * AUTH SERVICE
 * ======================
 * 
 * Service layer for authentication operations.
 * This separates business logic from the store and makes it easy to replace
 * with real API calls in the future.
 */

import type { Account } from '@/store/store';
import type { UserRecord } from '@/schemas/user.schema';
import { createEmptyProfile } from '@/schemas/user.schema';

type Role = 'admin' | 'user';

export interface LoginResult {
  success: boolean;
  account?: Account;
  role?: Role;
  message?: string;
}

export interface RegisterUserResult {
  success: boolean;
  account?: Account;
  profile?: UserRecord;
  message?: string;
}

export interface ChangePasswordResult {
  success: boolean;
  message?: string;
}

/**
 * Mock delay to simulate API call
 */
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Auth Service - Handles authentication operations
 * 
 * Currently uses mock implementation. Can be easily replaced with real API calls.
 */
export const authService = {
  /**
   * Login with email and password
   * 
   * @param email - User email
   * @param password - User password
   * @param accounts - Current accounts list (from store)
   * @returns Login result with account and role
   */
  async login(
    email: string,
    password: string,
    accounts: Account[]
  ): Promise<LoginResult> {
    await mockDelay(500);

    const normalizedEmail = email.trim().toLowerCase();
    const account = accounts.find(
      (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
    );

    if (!account) {
      return {
        success: false,
        message: 'ایمیل یا پسورد نادرست است',
      };
    }

    return {
      success: true,
      account,
      role: account.role,
    };
  },

  /**
   * Register a new user
   * 
   * @param payload - User registration data
   * @param accounts - Current accounts list (from store)
   * @returns Registration result with new account and profile
   */
  async registerUser(
    payload: { email: string; password: string; displayName?: string; orgEmail?: string },
    accounts: Account[]
  ): Promise<RegisterUserResult> {
    await mockDelay(500);

    const normalizedEmail = payload.email.trim().toLowerCase();
    const normalizedOrgEmail = payload.orgEmail?.trim().toLowerCase();
    const exists = accounts.some(
      (acc) => acc.email.toLowerCase() === normalizedEmail
    );

    if (exists) {
      return {
        success: false,
        message: 'برای این ایمیل قبلاً حساب ساخته شده است',
      };
    }

    const id = crypto.randomUUID();
    const newAccount: Account = {
      id,
      email: normalizedEmail,
      password: payload.password,
      role: 'user',
      displayName: payload.displayName,
    };

    const profile = createEmptyProfile(
      id,
      normalizedEmail,
      payload.displayName,
      normalizedOrgEmail
    );

    return {
      success: true,
      account: newAccount,
      profile,
    };
  },

  /**
   * Change user password
   * 
   * @param userId - User ID
   * @param payload - Password change data
   * @param accounts - Current accounts list (from store)
   * @returns Change password result
   */
  async changePassword(
    userId: string,
    payload: { currentPassword: string; newPassword: string },
    accounts: Account[]
  ): Promise<ChangePasswordResult> {
    await mockDelay(500);

    const accountIndex = accounts.findIndex((acc) => acc.id === userId);

    if (accountIndex === -1) {
      return {
        success: false,
        message: 'کاربر یافت نشد',
      };
    }

    if (accounts[accountIndex].password !== payload.currentPassword) {
      return {
        success: false,
        message: 'رمز فعلی صحیح نیست',
      };
    }

    return {
      success: true,
    };
  },

  /**
   * Logout (currently just returns success, store handles state)
   * 
   * @returns Logout result
   */
  async logout(): Promise<{ success: boolean }> {
    await mockDelay(200);
    return { success: true };
  },
};

