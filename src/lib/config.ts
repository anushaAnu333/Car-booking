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

  // Email
  email: {
    smtp: {
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      user: process.env.SMTP_USER || "",
      pass: process.env.SMTP_PASS || "",
    },
  },

  // Cloudinary (for image uploads)
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },

  // Stripe (for payments)
  stripe: {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || "",
    secretKey: process.env.STRIPE_SECRET_KEY || "",
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  },

  // Google Maps
  googleMaps: {
    apiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  },

  // Redis (optional)
  redis: {
    url: process.env.REDIS_URL || "redis://localhost:6379",
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
