import Cookies from 'js-cookie';
import { getApiUrl } from '../api/endpoints';

export const getAccessToken = (): string | undefined => {
  return Cookies.get('accessToken');
};

export const getRefreshToken = (): string | undefined => {
  return Cookies.get('refreshToken');
};

export const setAccessToken = (token: string): void => {
  Cookies.set('accessToken', token, {
    expires: 7,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const setRefreshToken = (token: string): void => {
  Cookies.set('refreshToken', token, {
    expires: 30,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });
};

export const removeAccessToken = (): void => {
  Cookies.remove('accessToken');
};

export const removeRefreshToken = (): void => {
  Cookies.remove('refreshToken');
};

interface TokenResponse {
  access_token?: string;
  access?: string;
  token?: string;
  refresh_token?: string;
  refresh?: string;
}

export const setTokens = (data: TokenResponse | { data?: TokenResponse }): void => {
  const payload = 'data' in data && data.data ? data.data : (data as TokenResponse);
  const access = payload.access_token || payload.access || payload.token;
  const refresh = payload.refresh_token || payload.refresh;

  if (!access) {
    throw new Error('No access token received');
  }

  setAccessToken(access);
  if (refresh) {
    setRefreshToken(refresh);
  }
};

export const clearTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiryTime = payload.exp * 1000;
    const bufferTime = 60 * 1000;
    return Date.now() >= expiryTime - bufferTime;
  } catch {
    return true;
  }
};

export const refreshAccessToken = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(getApiUrl('/account/api/token/refresh/'), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const data = await response.json();
    setTokens(data);
    return true;
  } catch {
    clearTokens();
    return false;
  }
};

export const ensureValidToken = async (): Promise<boolean> => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return false;
  }

  if (isTokenExpired(accessToken)) {
    return await refreshAccessToken();
  }

  return true;
};
