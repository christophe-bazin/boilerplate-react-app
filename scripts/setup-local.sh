#!/bin/bash

# Local Development Setup Script for Transcript IA Frontend
# Run with: chmod +x scripts/setup-local.sh && ./scripts/setup-local.sh

set -e

echo "🚀 Setting up Transcript IA Frontend for local development..."

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
    echo "📝 Please edit .env.local with your Supabase credentials"
else
    echo "✅ .env.local already exists"
fi

# Check if Supabase is configured
if grep -q "your-project-ref" .env.local 2>/dev/null; then
    echo "⚠️  Warning: .env.local contains placeholder values"
    echo "   Please update with your actual Supabase project URL and anon key"
fi

echo ""
echo "🎯 Next steps:"
echo "1. Update .env.local with your Supabase credentials"
echo "2. Execute database/setup.sql in your Supabase SQL editor"
echo "3. Run 'npm run dev' to start development server"
echo ""
echo "📚 Documentation:"
echo "- README.md: Project setup and usage"
echo ""
echo "✨ Happy coding!"
