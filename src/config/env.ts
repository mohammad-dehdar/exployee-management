const MONGODB_PASSWORD = "LenQhYO3X0kWI0h5";
const MONGODB_USERNAME = "mdehdar7878";

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  CI: process.env.CI || false,
  API_URL: process.env.NEXT_PUBLIC_API_URL || "localhost:3000",
  MONGODB_URI: `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.oyx0o.mongodb.net/?appName=Cluster0`,
};
