const MONGODB_PASSWORD = "LenQhYO3X0kWI0h5";
const MONGODB_USERNAME = "mdehdar7878";
const DEFAULT_JWT_SECRET = "5d1628cb6e6ab1555af20b9203bb58fc70f66a066e8d5f3a442864d673db5206";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CI: process.env.CI || false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || "localhost:3000",
  MONGODB_URI: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.oyx0o.mongodb.net/?appName=Cluster0`,
  JWT_SECRET: process.env.JWT_SECRET || DEFAULT_JWT_SECRET,
};
