import { env } from '@/config/env';

export function getApiUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  return `${env.API_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}
