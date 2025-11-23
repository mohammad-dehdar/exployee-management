/**
 * ======================
 * USER SERVICE
 * ======================
 * 
 * Service layer for user profile operations.
 * This separates business logic from the store and makes it easy to replace
 * with real API calls in the future.
 */

import type { UserRecord, UpdateUserPayload } from '@/schemas/user.schema';
import { calculateCompletionPercent } from '@/schemas/user.schema';
import { createEmptyProfile } from '@/schemas/user.schema';
import type { Account } from '@/store/store';

export interface UpdateProfileResult {
  success: boolean;
  profile?: UserRecord;
  message?: string;
}

/**
 * Mock delay to simulate API call
 */
const mockDelay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * User Service - Handles user profile operations
 * 
 * Currently uses mock implementation. Can be easily replaced with real API calls.
 */
export const userService = {
  /**
   * Update user profile
   * 
   * @param userId - User ID
   * @param data - Profile data to update
   * @param existingProfile - Current profile (from store)
   * @param account - User account (from store)
   * @returns Update result with merged profile
   */
  async updateProfile(
    userId: string,
    data: UpdateUserPayload,
    existingProfile: UserRecord | undefined,
    account: Account | undefined
  ): Promise<UpdateProfileResult> {
    await mockDelay(500);

    const existing = existingProfile ?? createEmptyProfile(
      userId,
      account?.email,
      account?.displayName
    );

    // Safe merge for additional info with skills
    const existingAdditional = existing.additional || {};
    const mergedAdditional = data.additional
      ? {
          ...existingAdditional,
          ...data.additional,
          // Only override skills if explicitly provided
          skills:
            data.additional.skills !== undefined
              ? data.additional.skills
              : existingAdditional.skills || [],
        }
      : existingAdditional;

    const mergedProfile: UserRecord = {
      ...existing,
      personal: data.personal
        ? { ...existing.personal, ...data.personal }
        : existing.personal,
      contact: data.contact
        ? { ...existing.contact, ...data.contact }
        : existing.contact,
      job: data.job ? { ...existing.job, ...data.job } : existing.job,
      financial: data.financial
        ? { ...existing.financial, ...data.financial }
        : existing.financial,
      education: data.education
        ? { ...existing.education, ...data.education }
        : existing.education,
      workHistory:
        data.workHistory !== undefined ? data.workHistory : existing.workHistory,
      certificates:
        data.certificates !== undefined
          ? data.certificates
          : existing.certificates,
      attachments: data.attachments
        ? { ...existing.attachments, ...data.attachments }
        : existing.attachments,
      additional: mergedAdditional,
    };

    return {
      success: true,
      profile: mergedProfile,
    };
  },

  /**
   * Get user profile
   * 
   * @param userId - User ID
   * @param profiles - Current profiles (from store)
   * @returns User profile or undefined
   */
  async getProfile(
    userId: string,
    profiles: Record<string, UserRecord>
  ): Promise<UserRecord | undefined> {
    await mockDelay(100);
    return profiles[userId];
  },

  /**
   * Calculate profile completion percentage
   * 
   * @param userId - User ID
   * @param profiles - Current profiles (from store)
   * @returns Completion percentage (0-100)
   */
  async getCompletionPercent(
    userId: string,
    profiles: Record<string, UserRecord>
  ): Promise<number> {
    await mockDelay(50);
    const profile = profiles[userId];
    if (!profile) return 0;
    return calculateCompletionPercent(profile);
  },

  /**
   * Check if profile is complete
   * 
   * @param userId - User ID
   * @param profiles - Current profiles (from store)
   * @returns True if profile is 100% complete
   */
  async isProfileComplete(
    userId: string,
    profiles: Record<string, UserRecord>
  ): Promise<boolean> {
    const percent = await this.getCompletionPercent(userId, profiles);
    return percent === 100;
  },
};

