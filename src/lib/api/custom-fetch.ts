import Cookies from 'js-cookie';
import { ensureValidToken, getAccessToken, refreshAccessToken } from '../auth/tokens';
import { getApiUrl } from './endpoints';

interface CustomFetchOptions extends RequestInit {
  body?: unknown;
  requiresAuth?: boolean;
}

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public data?: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export async function customFetch<T = unknown>(
  url: string,
  options: CustomFetchOptions = {},
): Promise<T> {
  const { requiresAuth = false, ...fetchOptions } = options;

  // Prepend base URL if the URL is not absolute
  const BASE_URL = getApiUrl(url);

  const headers: HeadersInit = {
    ...(fetchOptions.headers || {}),
  };

  const csrfToken = Cookies.get('csrftoken');
  if (csrfToken) {
    (headers as Record<string, string>)['X-CSRFTOKEN'] = csrfToken;
  }

  if (requiresAuth) {
    await ensureValidToken();
    const accessToken = getAccessToken();

    if (accessToken) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  if (fetchOptions.body && typeof fetchOptions.body === 'object') {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
    fetchOptions.body = JSON.stringify(fetchOptions.body);
  }

  const config: RequestInit = {
    ...fetchOptions,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(BASE_URL, config);

    let data: unknown;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      if (response.status === 401 && requiresAuth) {
        const refreshed = await refreshAccessToken();

        if (refreshed) {
          return customFetch<T>(BASE_URL, options);
        } else {
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }

      const parsed =
        typeof data === 'object' && data !== null
          ? (data as { detail?: string; message?: string })
          : undefined;

      throw new ApiError(
        response.status,
        parsed?.detail || parsed?.message || 'خطا در ارتباط با سرور',
        data,
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(0, 'خطا در برقراری ارتباط با سرور', error);
  }
}
