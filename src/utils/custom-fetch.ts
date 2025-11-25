import { getAccessToken, getApiUrl } from './auth-service';

interface CustomFetchOptions extends Omit<RequestInit, 'body'> {
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
  const { requiresAuth = false, body, headers, ...rest } = options;
  const requestUrl = getApiUrl(url);
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;

  const resolvedHeaders: Record<string, string> = isFormData
    ? {
        ...(headers ? (headers as Record<string, string>) : {}),
      }
    : {
        'Content-Type': 'application/json',
        ...(headers ? (headers as Record<string, string>) : {}),
      };

  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      resolvedHeaders.Authorization = `Bearer ${token}`;
    }
  }

  let resolvedBody: BodyInit | undefined;
  if (isFormData) {
    resolvedBody = body as BodyInit;
  } else if (typeof body === 'string') {
    resolvedBody = body as BodyInit;
  } else if (body !== undefined && body !== null) {
    resolvedBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(requestUrl, {
      ...rest,
      headers: resolvedHeaders,
      body: resolvedBody,
    });

    const contentType = response.headers.get('content-type') ?? '';
    const data = contentType.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new ApiError(
        response.status,
        (data as { message?: string })?.message || 'Request failed. Please try again.',
        data,
      );
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, 'Network error. Please check your connection.', error);
  }
}
