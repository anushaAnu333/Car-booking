#!/bin/bash

echo "🚀 Car Rental App - Environment Setup"
echo "===================================="
echo ""

# Check if .env.local already exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Backing up to .env.local.backup"
    cp .env.local .env.local.backup
fi

# Generate secure keys
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 2>/dev/null || echo "your-super-secret-jwt-key-change-this-in-production")
NEXTAUTH_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))" 2>/dev/null || echo "your-nextauth-secret-key-change-this")

# Create .env.local file
cat > .env.local << EOF
# Database
MONGODB_URI=mongodb://localhost:27017/carrental
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carrental?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=${JWT_SECRET}
JWT_EXPIRES_IN=7d

# Next Auth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=${NEXTAUTH_SECRET}

# Application
APP_URL=http://localhost:3001
NODE_ENV=development

# Optional Services (uncomment and fill as needed)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password

# CLOUDINARY_CLOUD_NAME=your-cloud-name
# CLOUDINARY_API_KEY=your-api-key
# CLOUDINARY_API_SECRET=your-api-secret

# STRIPE_PUBLISHABLE_KEY=pk_test_your-key
# STRIPE_SECRET_KEY=sk_test_your-key

# GOOGLE_MAPS_API_KEY=your-api-key
EOF

echo "✅ Created .env.local with default values"
echo ""
echo "📝 Next steps:"
echo "1. Update MONGODB_URI with your MongoDB connection string"
echo "2. Install required dependencies:"
echo "   npm install mongodb jsonwebtoken bcryptjs"
echo "   npm install --save-dev @types/jsonwebtoken @types/bcryptjs"
echo ""
echo "🔐 Generated secure keys for JWT_SECRET and NEXTAUTH_SECRET"
echo ""
echo "📚 See ENVIRONMENT_SETUP.md for detailed instructions" 