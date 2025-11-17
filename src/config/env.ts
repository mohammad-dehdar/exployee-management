const required = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

const resolveCIFlag = () => {
  const raw = process.env.CI;
  if (raw === undefined) return false;
  return raw === 'true' || raw === '1';
};

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? 'development',
  CI: resolveCIFlag(),
  API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
  MONGODB_URI: required('MONGODB_URI'),
  JWT_SECRET: required('JWT_SECRET'),
};
