import { customFetch } from '@/lib/api/custom-fetch';
import type { CreateUserPayload, UpdateUserPayload, UserRecord } from '@/schemas/user.schema';

export const userProfileService = {
  // ایجاد پروفایل جدید
  async createProfile(data: CreateUserPayload): Promise<UserRecord> {
    return customFetch<UserRecord>('/api/users/profile', {
      method: 'POST',
      body: data,
      requiresAuth: true,
    });
  },

  // به‌روزرسانی پروفایل
  async updateProfile(userId: string, data: UpdateUserPayload): Promise<UserRecord> {
    return customFetch<UserRecord>(`/api/users/${userId}/profile`, {
      method: 'PATCH',
      body: data,
      requiresAuth: true,
    });
  },

  // دریافت پروفایل
  async getProfile(userId: string): Promise<UserRecord> {
    return customFetch<UserRecord>(`/api/users/${userId}/profile`, {
      method: 'GET',
      requiresAuth: true,
    });
  },

  // حذف پروفایل
  async deleteProfile(userId: string): Promise<void> {
    return customFetch<void>(`/api/users/${userId}/profile`, {
      method: 'DELETE',
      requiresAuth: true,
    });
  },
};
