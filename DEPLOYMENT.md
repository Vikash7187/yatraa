# Yatraa Travel Website Deployment Guide

## 🚀 Quick Deployment Steps

### Frontend Deployment (Netlify - Recommended)

1. **Prepare the Project:**
   ```bash
   # Test production build
   npm run build
   npm run preview
   ```

2. **Deploy to Netlify:**
   
   **Option A: GitHub Integration (Recommended)**
   - Push code to GitHub
   - Go to [netlify.com](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`
   
   **Option B: Manual Upload**
   - Run `npm run build`
   - Drag `dist` folder to Netlify

3. **Configure Environment Variables:**
   - Go to Site settings → Environment variables
   - Add: `VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key`

### Backend Deployment Options

#### Option 1: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Create new project from GitHub
3. Select the `backend` folder
4. Railway will auto-detect and deploy

#### Option 2: Render
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repository
4. Settings:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

#### Option 3: Heroku
```bash
# Install Heroku CLI
cd backend
heroku create yatraa-api
git subtree push --prefix=backend heroku main
```

### Update API URL for Production

After backend deployment, update the frontend API base URL:

```javascript
// In your service files, change:
const API_BASE_URL = 'https://your-backend-url.railway.app/api';
// Instead of: 'http://localhost:3002/api'
```

## 🌐 Complete Deployment Workflow

### Step 1: Prepare Backend
```bash
cd backend
npm install
npm start  # Test locally
```

### Step 2: Deploy Backend
- Choose Railway/Render/Heroku
- Deploy and get your backend URL

### Step 3: Update Frontend Config
```javascript
// src/services/apiConfig.js (create this file)
export const API_BASE_URL = import.meta.env.PROD
  ? 'https://your-backend-url.railway.app/api'
  : 'http://localhost:3002/api';
```

### Step 4: Deploy Frontend
```bash
npm run build
# Deploy to Netlify/Vercel
```

## 🔧 Environment Variables

### Frontend (.env)
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
VITE_API_BASE_URL=https://your-backend-url.railway.app/api
```

### Backend (.env)
```
PORT=3002
NODE_ENV=production
```

## 📱 Testing Production Deployment

1. **Frontend Tests:**
   - Navigation works
   - Contact form submits
   - Hotel images load
   - Authentication works

2. **Backend Tests:**
   - API endpoints respond
   - CORS configured correctly
   - Data persists (if using database)

## 🚨 Common Issues & Solutions

### Issue: API calls fail after deployment
**Solution:** Update API base URL in frontend services

### Issue: 404 errors on page refresh
**Solution:** Ensure `_redirects` file is in `public` folder

### Issue: Environment variables not working
**Solution:** Check variable names start with `VITE_` for frontend

### Issue: CORS errors
**Solution:** Update CORS configuration in backend to allow your frontend domain

## 📈 Production Optimizations

1. **Enable Gzip compression** (automatic on Netlify/Vercel)
2. **Set up CDN** (automatic on most platforms)
3. **Enable HTTPS** (automatic on modern platforms)
4. **Add monitoring** (UptimeRobot, etc.)

## 🔒 Security Considerations

1. **Environment Variables:**
   - Never commit `.env` files
   - Use platform-specific environment variable settings

2. **API Security:**
   - Rate limiting
   - Input validation
   - HTTPS only

3. **Clerk Authentication:**
   - Configure production domain
   - Update redirect URLs

## 📊 Recommended Stack

- **Frontend:** Netlify (free tier available)
- **Backend:** Railway (free tier available)
- **Database:** Railway PostgreSQL (if needed)
- **Authentication:** Clerk (already configured)
- **Monitoring:** Netlify Analytics

## 🎯 Live URLs After Deployment

- **Frontend:** `https://yatraa-travel.netlify.app`
- **Backend:** `https://yatraa-api.railway.app`
- **Full API:** `https://yatraa-api.railway.app/api/packages`

## 📞 Support

If you encounter deployment issues:
1. Check build logs on your platform
2. Verify environment variables
3. Test API endpoints directly
4. Check browser console for errors

Happy deploying! 🚀