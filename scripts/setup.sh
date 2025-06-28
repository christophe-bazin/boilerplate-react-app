#!/bin/bash

# React + Supabase Boilerplate Setup Script
# Run with: chmod +x scripts/setup-local.sh && ./scripts/setup-local.sh

set -e

echo "🚀 Setting up React + Supabase Boilerplate..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to Node.js 18+."
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Ask for app name to customize title
echo ""
read -p "Enter your app name (default: My App): " APP_NAME
APP_NAME=${APP_NAME:-"My App"}

# Update app title
echo "⚙️  Updating app configuration..."
sed -i "s/<title>.*<\/title>/<title>$APP_NAME<\/title>/" index.html

# Update app.json
cat > src/config/app.json << EOL
{
  "app": {
    "name": "$APP_NAME",
    "logo": "/src/assets/logo.svg"
  }
}
EOL

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "⚙️  Creating .env.local template..."
    cat > .env.local << EOL
# Supabase Configuration
# Replace with your actual Supabase project values
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
EOL
    echo "📝 .env.local created with placeholders"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Execute database/setup.sql in your Supabase SQL editor"  
echo "3. Customize your app:"
echo "   - App name: src/config/app.json"
echo "   - Translations: src/locales/"
echo "4. Run 'npm run dev' to start development"
echo ""
echo "✨ Happy coding!"
