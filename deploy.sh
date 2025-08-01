#!/bin/bash

echo "🚀 Social Media App Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if code is pushed to GitHub
echo "📋 Checking if code is pushed to GitHub..."
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No GitHub remote found. Please:"
    echo "   1. Create a repository on GitHub"
    echo "   2. Add remote: git remote add origin YOUR_GITHUB_URL"
    echo "   3. Push code: git push -u origin main"
    exit 1
fi

echo "✅ GitHub repository found"

# Check if all required files exist
echo "📋 Checking required files..."

required_files=(
    "BackEnd/package.json"
    "Frontend/package.json"
    "vercel.json"
    "BackEnd/index.js"
    "Frontend/src/main.jsx"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ Missing required file: $file"
        exit 1
    fi
done

echo "✅ All required files found"

# Check if .env files are not committed
if [ -f "BackEnd/.env" ] || [ -f "Frontend/.env" ]; then
    echo "⚠️  Warning: .env files found. Make sure they are in .gitignore"
fi

echo ""
echo "🎯 Next Steps:"
echo "1. Go to https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository"
echo "4. Configure environment variables (see setup-env.md)"
echo "5. Deploy!"
echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo "🔧 For environment variables setup, see setup-env.md" 