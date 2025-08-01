# Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your code should be in a GitHub repository
3. **MongoDB Atlas**: Set up a MongoDB database at [mongodb.com](https://mongodb.com)
4. **Cloudinary Account**: Set up for image uploads at [cloudinary.com](https://cloudinary.com)

## Environment Variables Setup

You'll need to set these environment variables in Vercel:

### Required Environment Variables:

1. **MONGODB_URL**: Your MongoDB Atlas connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database_name`

2. **JWT_SEC**: A secret key for JWT token generation
   - Generate a random string (at least 32 characters)

3. **Cloudinary Configuration**:
   - `Cloudinary_Cloud_Name`: Your Cloudinary cloud name
   - `Cloudinary_Api`: Your Cloudinary API key
   - `Cloudinary_Secret`: Your Cloudinary API secret

## Deployment Steps

### Step 1: Prepare Your Repository

1. Make sure your code is pushed to GitHub
2. Ensure all dependencies are in `package.json` files

### Step 2: Deploy to Vercel

1. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure Build Settings**:
   - Framework Preset: `Other`
   - Root Directory: `./` (leave empty)
   - Build Command: Leave empty (Vercel will use the configuration from `vercel.json`)
   - Output Directory: Leave empty

3. **Set Environment Variables**:
   - In the Vercel dashboard, go to your project settings
   - Navigate to "Environment Variables"
   - Add all the required environment variables listed above

4. **Deploy**:
   - Click "Deploy"
   - Vercel will automatically build and deploy your application

### Step 3: Update Frontend API URLs

After deployment, you'll need to update your frontend to use the new API URLs:

1. Find all API calls in your frontend code
2. Replace localhost URLs with your Vercel domain
3. Example: `http://localhost:3000/api/auth/login` → `https://your-app.vercel.app/api/auth/login`

## Project Structure

Your project is structured as a monorepo with:
- **Backend**: `BackEnd/` - Express.js API
- **Frontend**: `Frontend/` - React/Vite application

The `vercel.json` configuration handles routing:
- `/api/*` requests go to the backend
- All other requests serve the frontend

## Troubleshooting

### Common Issues:

1. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure environment variables are set correctly

2. **API Not Working**:
   - Verify environment variables are set in Vercel
   - Check MongoDB connection string
   - Ensure CORS is configured properly

3. **Frontend Not Loading**:
   - Check that the build completed successfully
   - Verify the `dist` directory is being generated

### Useful Commands:

```bash
# Test backend locally
cd BackEnd
npm install
npm run dev

# Test frontend locally
cd Frontend
npm install
npm run dev

# Build frontend
cd Frontend
npm run build
```

## Post-Deployment

1. **Test Your Application**:
   - Register a new user
   - Test login functionality
   - Test image uploads
   - Test all major features

2. **Set Up Custom Domain** (Optional):
   - In Vercel dashboard, go to "Domains"
   - Add your custom domain

3. **Monitor Performance**:
   - Use Vercel Analytics to monitor your app
   - Check function logs for any errors

## Security Notes

- Never commit `.env` files to your repository
- Use strong, unique JWT secrets
- Regularly rotate your API keys
- Enable CORS properly for production 