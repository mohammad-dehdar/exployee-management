import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import type { TokenPayload } from './types';
import { env } from '@/config/env';

/**
 * بررسی و decode کردن JWT token از cookies
 * @returns TokenPayload | null
 */
export async function checkToken(): Promise<TokenPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    const decoded = jwt.verify(
      token,
      env.JWT_SECRET
    ) as TokenPayload;

    return decoded;
  } catch (error) {
    // Token invalid or expired
    return null;
  }
}

/**
 * بررسی اعتبار token در client-side
 * @returns boolean
 */
export function checkTokenClient(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('token=')
    );

    if (!tokenCookie) {
      return false;
    }

    const token = tokenCookie.split('=')[1];
    if (!token) {
      return false;
    }

    // فقط بررسی وجود token، decode در سمت سرور انجام می‌شود
    return true;
  } catch (error) {
    return false;
  }
}
