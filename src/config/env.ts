const normalizeUrl = (value?: string) => {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  return trimmed.endsWith('/') ? trimmed.slice(0, -1) : trimmed;
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  API_URL: normalizeUrl(process.env.NEXT_PUBLIC_API_URL) ?? 'https://employee-management.liara.run',
};
