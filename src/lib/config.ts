// Configuration file for environment variables
// This centralizes all environment variable access

export const config = {
  // Database
  mongodb: {
    uri: process.env.MONGODB_URI || "mongodb://localhost:27017/carrental",
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || "default-dev-secret-change-in-production",
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  },

  // Authentication
  auth: {
    nextAuthUrl: process.env.NEXTAUTH_URL || "http://localhost:3001",
    nextAuthSecret: process.env.NEXTAUTH_SECRET || "default-dev-secret",
  },

  // Cloudinary (for image uploads)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  // Application
  app: {
    url: process.env.APP_URL || "http://localhost:3001",
    env: process.env.NODE_ENV || "development",
    isDevelopment: process.env.NODE_ENV !== "production",
    isProduction: process.env.NODE_ENV === "production",
  },
};

// Type for the config
export type Config = typeof config;
