# Environment Variables Setup Guide

## Overview

This guide explains how to set up environment variables for the Car Rental application, including MongoDB, JWT tokens, and other services.

## Step 1: Create Environment File

1. Create a `.env.local` file in the root of your project:

   ```bash
   touch .env.local
   ```

2. Add `.env.local` to your `.gitignore` file to prevent sensitive data from being committed:
   ```
   # .gitignore
   .env.local
   ```

## Step 2: Required Environment Variables

Copy and paste these variables into your `.env.local` file:

### Database Configuration

```env
# MongoDB Local
MONGODB_URI=mongodb://localhost:27017/carrental

# OR MongoDB Atlas (cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carrental?retryWrites=true&w=majority
```

### JWT Configuration

```env
# Generate a secure secret key for production
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
```

### Authentication (if using NextAuth.js)

```env
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your-nextauth-secret-key-change-this
```

### Email Configuration (optional)

```env
# For Gmail
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-specific-password

# For other providers, adjust accordingly
```

### Image Upload (optional)

```env
# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Payment Processing (optional)

```env
# Stripe
STRIPE_PUBLISHABLE_KEY=pk_test_your-publishable-key
STRIPE_SECRET_KEY=sk_test_your-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-webhook-secret
```

### Maps Integration (optional)

```env
# Google Maps
GOOGLE_MAPS_API_KEY=your-google-maps-api-key
```

### Application Settings

```env
APP_URL=http://localhost:3001
NODE_ENV=development
```

## Step 3: MongoDB Setup

### Option A: Local MongoDB

1. Install MongoDB locally:

   ```bash
   # macOS with Homebrew
   brew tap mongodb/brew
   brew install mongodb-community
   brew services start mongodb-community
   ```

2. Use the local connection string:
   ```env
   MONGODB_URI=mongodb://localhost:27017/carrental
   ```

### Option B: MongoDB Atlas (Recommended for Production)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with password
4. Whitelist your IP address
5. Get your connection string and replace username/password:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carrental?retryWrites=true&w=majority
   ```

## Step 4: Generate Secure Keys

### JWT Secret

Generate a secure random string:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Using OpenSSL
openssl rand -hex 64
```

### NextAuth Secret

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 5: Install Required Dependencies

```bash
npm install mongodb jsonwebtoken bcryptjs
npm install --save-dev @types/jsonwebtoken @types/bcryptjs
```

## Step 6: Using Environment Variables in Code

Environment variables are centralized in `/src/lib/config.ts`:

```typescript
import { config } from "@/lib/config";

// Use MongoDB
const mongoUri = config.mongodb.uri;

// Use JWT secret
const jwtSecret = config.jwt.secret;
```

## Step 7: Production Deployment

### Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add each variable from your `.env.local`

### Other Platforms

- **Heroku**: Use Config Vars in app settings
- **AWS**: Use AWS Secrets Manager or Parameter Store
- **Docker**: Use docker-compose with env_file
- **Railway**: Add variables in the dashboard

## Security Best Practices

1. **Never commit `.env.local` to Git**
2. **Use different values for development and production**
3. **Rotate secrets regularly**
4. **Use strong, randomly generated secrets**
5. **Limit database user permissions**
6. **Use environment-specific MongoDB databases**

## Troubleshooting

### MongoDB Connection Issues

```bash
# Check if MongoDB is running locally
brew services list | grep mongodb

# Test connection
mongosh mongodb://localhost:27017/carrental
```

### Environment Variables Not Loading

1. Restart your Next.js development server
2. Check file name is exactly `.env.local`
3. Ensure no spaces around `=` in variable definitions
4. Check that `.env.local` is in the root directory

## Example: Updated Login API with Real JWT

```typescript
// src/app/api/auth/login/route.ts
import { generateToken } from "@/lib/jwt";
import { getCollection } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  // Get users collection from MongoDB
  const users = await getCollection("users");
  const user = await users.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Generate real JWT token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  });

  return NextResponse.json({ user, token });
}
```

## Next Steps

1. Set up your `.env.local` file with your values
2. Install MongoDB locally or set up MongoDB Atlas
3. Update API routes to use real database instead of mock data
4. Implement proper password hashing with bcryptjs
5. Use the JWT utilities for authentication
