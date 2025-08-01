Write-Host "🚀 Social Media App Deployment Script" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not found. Please initialize git first:" -ForegroundColor Red
    Write-Host "   git init" -ForegroundColor Yellow
    Write-Host "   git add ." -ForegroundColor Yellow
    Write-Host "   git commit -m 'Initial commit'" -ForegroundColor Yellow
    exit 1
}

# Check if code is pushed to GitHub
Write-Host "📋 Checking if code is pushed to GitHub..." -ForegroundColor Cyan
try {
    $origin = git remote get-url origin 2>$null
    if (-not $origin) {
        Write-Host "❌ No GitHub remote found. Please:" -ForegroundColor Red
        Write-Host "   1. Create a repository on GitHub" -ForegroundColor Yellow
        Write-Host "   2. Add remote: git remote add origin YOUR_GITHUB_URL" -ForegroundColor Yellow
        Write-Host "   3. Push code: git push -u origin main" -ForegroundColor Yellow
        exit 1
    }
    Write-Host "✅ GitHub repository found" -ForegroundColor Green
} catch {
    Write-Host "❌ Error checking git remote" -ForegroundColor Red
    exit 1
}

# Check if all required files exist
Write-Host "📋 Checking required files..." -ForegroundColor Cyan

$requiredFiles = @(
    "BackEnd/package.json",
    "Frontend/package.json",
    "vercel.json",
    "BackEnd/index.js",
    "Frontend/src/main.jsx"
)

foreach ($file in $requiredFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "❌ Missing required file: $file" -ForegroundColor Red
        exit 1
    }
}

Write-Host "✅ All required files found" -ForegroundColor Green

# Check if .env files are not committed
if ((Test-Path "BackEnd/.env") -or (Test-Path "Frontend/.env")) {
    Write-Host "⚠️  Warning: .env files found. Make sure they are in .gitignore" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Next Steps:" -ForegroundColor Green
Write-Host "1. Go to https://vercel.com" -ForegroundColor Cyan
Write-Host "2. Click 'New Project'" -ForegroundColor Cyan
Write-Host "3. Import your GitHub repository" -ForegroundColor Cyan
Write-Host "4. Configure environment variables (see setup-env.md)" -ForegroundColor Cyan
Write-Host "5. Deploy!" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md" -ForegroundColor Magenta
Write-Host "🔧 For environment variables setup, see setup-env.md" -ForegroundColor Magenta 