# Vercel Deployment Guide for Yatraa

## 🚀 Quick Deployment Steps

### Option 1: Deploy via GitHub Integration (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Visit Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your GitHub account
   - Click "Add New..." → "Project"

3. **Import your repository:**
   - Select your GitHub repository `Vikash7187/yatraa`
   - Vercel will automatically detect it's a Vite project

4. **Configure environment variables:**
   - In the deployment settings, add:
     - `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
     - `VITE_API_BASE_URL`: Your backend API URL (when ready)

5. **Deploy:**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Option 2: Deploy via CLI

1. **Login to Vercel:**
   ```bash
   vercel login
   ```

2. **Deploy from project root:**
   ```bash
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project or create new one
   - Set up project settings
   - Deploy automatically

## 🔧 Configuration Details

### Environment Variables
Add these in Vercel Dashboard → Project Settings → Environment Variables:

- `VITE_CLERK_PUBLISHABLE_KEY`: `pk_test_bXV0dWFsLWhhcmUtOTAuY2xlcmsuYWNjb3VudHMuZGV2JA`
- `VITE_API_BASE_URL`: `https://yatraa-production-567e.up.railway.app/`

### Build Settings
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`
- **Node.js Version:** 18.x (specified in package.json engines)

## 🌐 Domain Configuration

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS settings as instructed

### Default Domain
- Vercel automatically provides: `https://yatraa-[hash].vercel.app`
- You can customize the project name in settings

## 🔗 Integration with Backend

After deploying your backend to Railway:
1. Get your Railway backend URL
2. Update `VITE_API_BASE_URL` in Vercel environment variables
3. Redeploy frontend (automatic if using GitHub integration)

## 📊 Monitoring

- **Analytics:** Available in Vercel dashboard
- **Logs:** Real-time deployment and function logs
- **Performance:** Web Vitals and performance metrics

## 🛠️ Troubleshooting

### Build Issues
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify environment variables are set correctly

### Routing Issues
- SPA routing is handled by vercel.json configuration
- All routes redirect to index.html for client-side routing

## 🔄 Automatic Deployments

With GitHub integration:
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Branch deployments for feature branches

## 📱 Preview Deployments

- Each commit gets a unique preview URL
- Share with team for testing
- Automatic cleanup of old previews