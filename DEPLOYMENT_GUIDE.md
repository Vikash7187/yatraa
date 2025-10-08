# 🚀 Yatraa Deployment Guide

This guide explains how to deploy the Yatraa application with the frontend on Vercel and the backend on Render.

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free tier available)
3. Render account (free tier available)
4. Your repository pushed to GitHub

## ☁️ Backend Deployment (Render)

### Step 1: Deploy to Render

1. Go to [Render](https://render.com/)
2. Sign in with your GitHub account
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Set the following options:
   - Name: `yatraa-backend`
   - Region: Choose the closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: `Free`

### Step 2: Add Environment Variables

In the Advanced settings, add:
```
NODE_ENV=production
PORT=3003
```

### Step 3: Deploy

Click "Create Web Service" and wait for deployment to complete.

### Step 4: Get Your Backend URL

Once deployed, note the URL provided by Render (it will be something like `https://yatraa-2.onrender.com`).

## 🌐 Frontend Deployment (Vercel)

### Step 1: Deploy to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import your `yatraa` repository
5. Vercel should automatically detect the Vite project
6. In the project settings, make sure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Step 2: Configure Environment Variables

After deployment, go to your project settings:
1. Navigate to "Environment Variables"
2. Add these variables:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_bXV0dWFsLWhhcmUtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA
   VITE_API_BASE_URL=https://yatraa-2.onrender.com
   ```

### Step 3: Redeploy

After adding environment variables, trigger a new deployment:
1. Go to the "Deployments" tab
2. Click the three dots next to the latest deployment
3. Select "Redeploy"

## 🔗 Connect Frontend and Backend

1. Go back to your Vercel project settings
2. Update the `VITE_API_BASE_URL` environment variable to your Render backend URL
3. This will trigger a new deployment of your frontend

## 🧪 Testing Your Deployment

### Test Backend Endpoints

1. Health check: `https://yatraa-2.onrender.com/health`
2. Packages endpoint: `https://yatraa-2.onrender.com/api/packages`
3. Bookings endpoint: `https://yatraa-2.onrender.com/api/bookings`

### Test Frontend

1. Visit your Vercel deployment URL
2. Try to view packages
3. Try to create a booking
4. Check your profile for booking history

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure your frontend URL is in the CORS origins list in `server.js`
2. **Environment Variables Not Loading**: Check that they're set correctly in your deployment platform
3. **API Connection Failures**: Verify the `VITE_API_BASE_URL` is set correctly in Vercel
4. **Missing Dependencies**: Ensure all required dependencies are in the backend package.json (like date-fns)

### Checking Logs

1. **Render Logs**: Go to your Render dashboard and check the logs for your web service
2. **Vercel Logs**: Go to your Vercel dashboard and check the deployment logs

## 🔄 Redeployment

To redeploy after making changes:

1. Push changes to your GitHub repository
2. Render will automatically redeploy the backend
3. Vercel will automatically redeploy the frontend
4. If environment variables change, you'll need to manually trigger redeployment in the respective dashboards

## 📞 Support

If you encounter issues:
1. Check the deployment logs in both platforms
2. Verify all environment variables are set correctly
3. Ensure CORS is configured properly for your frontend domain
4. Make sure all dependencies are properly listed in backend package.json