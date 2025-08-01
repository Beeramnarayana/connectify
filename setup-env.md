# Environment Variables Template

Copy these variables to your Vercel environment variables section:

## Required Variables:

```
MONGODB_URL=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/your_database_name
JWT_SEC=your_super_secret_jwt_key_at_least_32_characters_long
Cloudinary_Cloud_Name=your_cloudinary_cloud_name
Cloudinary_Api=your_cloudinary_api_key
Cloudinary_Secret=your_cloudinary_api_secret
NODE_ENV=production
```

## How to get these values:

### MongoDB Atlas:
1. Go to [mongodb.com](https://mongodb.com)
2. Create a free cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database password

### JWT Secret:
Generate a random string (at least 32 characters):
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Cloudinary:
1. Go to [cloudinary.com](https://cloudinary.com)
2. Create a free account
3. Go to Dashboard
4. Copy your Cloud Name, API Key, and API Secret

## Important Notes:
- Never commit these values to your repository
- Use different values for development and production
- Regularly rotate your secrets
- Make sure your MongoDB cluster allows connections from anywhere (0.0.0.0/0) for Vercel 