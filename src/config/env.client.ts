const resolveCIFlag = () => {
  const raw = process.env.CI;
  return raw === 'true' || raw === '1';
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  CI: resolveCIFlag(),
};
