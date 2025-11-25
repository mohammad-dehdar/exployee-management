import Cookies from 'js-cookie';
import { env } from '@/config/env';

export const getApiUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${env.API_URL}${normalizedPath}`;
};

export const getAccessToken = (): string | undefined => Cookies.get('accessToken');

export const setTokens = (data: {
  accessToken?: string;
  access?: string;
  access_token?: string;
  token?: string;
  refreshToken?: string;
  refresh?: string;
  refresh_token?: string;
  data?: {
    accessToken?: string;
    access?: string;
    access_token?: string;
    token?: string;
    refreshToken?: string;
    refresh?: string;
    refresh_token?: string;
  };
}): void => {
  const payload = data.data ?? data;
  const access =
    payload.accessToken ?? payload.access_token ?? payload.access ?? payload.token;
  const refresh =
    payload.refreshToken ?? payload.refresh_token ?? payload.refresh;

  if (access) {
    Cookies.set('accessToken', access, {
      expires: 7,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }

  if (refresh) {
    Cookies.set('refreshToken', refresh, {
      expires: 30,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  }
};

export const clearTokens = (): void => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};
