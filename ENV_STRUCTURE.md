# Environment Variables Structure

## Where to Add Environment Variables

### 1. Create `.env.local` in the root directory:

```
carrental/
├── src/
├── public/
├── package.json
├── .env.local          <-- Create this file here
└── .gitignore          <-- Make sure .env.local is listed here
```

### 2. Quick Setup

Run the setup script:

```bash
./setup-env.sh
```

Or manually create `.env.local`:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/carrental

# JWT Secret
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Application
APP_URL=http://localhost:3001
NODE_ENV=development
```

### 3. How Environment Variables are Used

```
.env.local
    ↓
src/lib/config.ts (centralizes all env vars)
    ↓
src/lib/mongodb.ts (uses config.mongodb.uri)
src/lib/jwt.ts (uses config.jwt.secret)
    ↓
API Routes use these utilities
```

### 4. Example Flow

1. **Environment Variable**: `MONGODB_URI` in `.env.local`
2. **Config**: Accessed via `config.mongodb.uri` in `/src/lib/config.ts`
3. **MongoDB Client**: Uses config in `/src/lib/mongodb.ts`
4. **API Route**: Uses MongoDB client in `/src/app/api/auth/login/route.ts`

### 5. Files Created for Environment Management

- `/src/lib/config.ts` - Centralizes all environment variables
- `/src/lib/mongodb.ts` - MongoDB connection using env vars
- `/src/lib/jwt.ts` - JWT utilities using env vars
- `/setup-env.sh` - Quick setup script
- `/ENVIRONMENT_SETUP.md` - Detailed setup guide

### 6. Security Checklist

- [ ] `.env.local` is in `.gitignore`
- [ ] Never commit real secrets to Git
- [ ] Use different values for dev/prod
- [ ] Generate secure random keys
- [ ] Rotate secrets regularly

### 7. Deployment

For production deployment, add these same variables to:

- **Vercel**: Project Settings → Environment Variables
- **Heroku**: App Settings → Config Vars
- **AWS**: Secrets Manager or Parameter Store
- **Docker**: docker-compose.yml or .env file
