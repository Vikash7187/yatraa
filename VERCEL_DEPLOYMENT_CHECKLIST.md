# ✅ Vercel Deployment Checklist

## 📋 Pre-deployment Checklist

### Environment Configuration
- [x] Updated [.env.production](file:///C:/Users/suhan/yatraa/.env.production) with Render backend URL
- [x] Updated [.env.example](file:///C:/Users/suhan/yatraa/.env.example) with Render backend URL
- [x] Updated [vercel.env](file:///C:/Users/suhan/yatraa/vercel.env) with Render backend URL
- [x] Updated [src/config/api.js](file:///C:/Users/suhan/yatraa/src/config/api.js) with Render backend URL as default

### Code Configuration
- [x] Verified [vite.config.js](file:///C:/Users/suhan/yatraa/vite.config.js) base path is set to '/'
- [x] Verified [vercel.json](file:///C:/Users/suhan/yatraa/vercel.json) configuration
- [x] Verified all API endpoints use the configured base URL

### Backend Verification
- [x] Render backend is deployed and running at https://yatraa-2.onrender.com
- [x] Health check endpoint is responding: https://yatraa-2.onrender.com/health
- [x] Packages endpoint is responding: https://yatraa-2.onrender.com/api/packages
- [x] CORS is configured to allow Vercel frontend domain

## 🚀 Deployment Steps

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository (Vikash7187/yatraa)
4. Vercel should automatically detect the Vite project

### 2. Configure Project Settings
1. **Build & Development Settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

2. **Environment Variables** (add in Project Settings → Environment Variables):
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_bXV0dWFsLWhhcmUtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA
   VITE_API_BASE_URL=https://yatraa-2.onrender.com
   ```

### 3. Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. Vercel will provide your deployment URL

## 🧪 Post-deployment Testing

### API Integration Tests
- [ ] Visit your Vercel deployment URL
- [ ] Check browser console for API connection logs
- [ ] Verify packages are loading from Render backend
- [ ] Test booking creation
- [ ] Test profile booking history

### Environment Variables Verification
- [ ] Check that [VITE_API_BASE_URL](file:///C:/Users/suhan/yatraa/.env.production#L7-L7) is correctly set in Vercel
- [ ] Check that [VITE_CLERK_PUBLISHABLE_KEY](file:///C:/Users/suhan/yatraa/vercel.env#L4-L4) is correctly set in Vercel

## 🔧 Troubleshooting

### Common Issues

1. **API Connection Failures**:
   - Verify [VITE_API_BASE_URL](file:///C:/Users/suhan/yatraa/.env.production#L7-L7) in Vercel environment variables
   - Check Render backend CORS configuration
   - Check browser console for network errors

2. **CORS Errors**:
   - Ensure your Vercel frontend domain is in Render backend CORS origins
   - Check Render backend logs for CORS rejection messages

3. **Environment Variables Not Loading**:
   - Verify all environment variables start with `VITE_`
   - Check Vercel deployment logs for environment variable loading

### Checking Logs

1. **Vercel Logs**:
   - Go to your Vercel project dashboard
   - Check "Logs" tab for build and runtime logs

2. **Render Logs**:
   - Go to your Render dashboard
   - Check logs for your backend service

## 🔄 Redeployment

To redeploy after making changes:

1. Push changes to your GitHub repository
2. Vercel will automatically redeploy
3. If environment variables change, update them in Vercel dashboard