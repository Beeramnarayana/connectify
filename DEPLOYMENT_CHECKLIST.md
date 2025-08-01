# 🚀 Vercel Deployment Checklist

## ✅ Completed Steps:
- [x] Git repository initialized and connected to GitHub
- [x] All deployment configuration files created
- [x] CORS and axios configuration updated for production
- [x] JWT secret generated: `443b3207f0519267aa0694a28395aaa74b3539008f4397778d467dfe039f3e91`
- [x] Code pushed to GitHub repository: `https://github.com/Beeramnarayana/connectify.git`

## 🔧 Next Steps to Complete:

### Step 1: Set up MongoDB Atlas
1. Go to [mongodb.com](https://mongodb.com)
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. **Important**: In Network Access, add `0.0.0.0/0` to allow connections from anywhere

### Step 2: Set up Cloudinary
1. Go to [cloudinary.com](https://cloudinary.com)
2. Create a free account
3. Go to Dashboard
4. Copy your:
   - Cloud Name
   - API Key
   - API Secret

### Step 3: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with your GitHub account
3. Click "New Project"
4. Import your repository: `Beeramnarayana/connectify`
5. Configure project settings:
   - Framework Preset: `Other`
   - Root Directory: `./` (leave empty)
   - Build Command: Leave empty
   - Output Directory: Leave empty
6. Click "Deploy"

### Step 4: Set Environment Variables in Vercel
After deployment, go to your project settings and add these environment variables:

```
JWT_SEC=443b3207f0519267aa0694a28395aaa74b3539008f4397778d467dfe039f3e91
MONGODB_URL=your_mongodb_connection_string_here
Cloudinary_Cloud_Name=your_cloudinary_cloud_name
Cloudinary_Api=your_cloudinary_api_key
Cloudinary_Secret=your_cloudinary_api_secret
NODE_ENV=production
```

### Step 5: Test Your Deployment
1. Visit your Vercel domain (e.g., `https://connectify-vercel.vercel.app`)
2. Test user registration
3. Test user login
4. Test image uploads
5. Test all major features

### Step 6: Update CORS Origins (if needed)
After deployment, if you get CORS errors:
1. Go to your Vercel project settings
2. Note your actual domain
3. Update the CORS origins in `BackEnd/index.js` with your actual domain
4. Commit and push the changes

## 📋 Environment Variables Template:
```
JWT_SEC=443b3207f0519267aa0694a28395aaa74b3539008f4397778d467dfe039f3e91
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
Cloudinary_Cloud_Name=your_cloudinary_cloud_name
Cloudinary_Api=your_cloudinary_api_key
Cloudinary_Secret=your_cloudinary_api_secret
NODE_ENV=production
```

## 🔗 Useful Links:
- Your GitHub Repository: https://github.com/Beeramnarayana/connectify.git
- Vercel Dashboard: https://vercel.com
- MongoDB Atlas: https://mongodb.com
- Cloudinary: https://cloudinary.com

## 📞 Need Help?
- Check the `DEPLOYMENT_GUIDE.md` for detailed instructions
- Check the `setup-env.md` for environment variables help
- Your code is ready for deployment! 