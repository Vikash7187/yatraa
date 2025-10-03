# 🚀 Step-by-Step Deployment Guide

## 📋 Prerequisites
- GitHub account
- Netlify account (free)
- Railway account (free)

---

## 🎯 PART 1: Backend Deployment (Railway)

### Step 1: Prepare Backend for Railway
Your backend is now configured for Railway deployment.

### Step 2: Deploy to Railway
1. **Go to [railway.app](https://railway.app)**
2. **Sign up/Login** with GitHub
3. **Create New Project** → **Deploy from GitHub repo**
4. **Select your repository**: `yatraa`
5. **Important**: Click **"Add variables"** → **"Root Directory"** → Enter: `backend`
6. **Deploy** and wait for completion
7. **Copy your Railway URL** (looks like: `https://backend-production-xxxx.up.railway.app`)

### Step 3: Test Backend
Visit: `https://your-railway-url.up.railway.app` - should show "Yatraa API is running successfully!"

---

## 🎯 PART 2: Frontend Deployment (Netlify)

### Step 1: Update Frontend Configuration
Before deploying, update your API URL:

1. **Create/Update `.env` file in root:**
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here
VITE_API_BASE_URL=https://your-railway-url.up.railway.app
```

2. **Build and test locally:**
```bash
npm run build
npm run preview
```

### Step 2: Deploy to Netlify

**Option A: Drag & Drop (Fastest)**
1. **Go to [netlify.com](https://netlify.com)**
2. **Drag the `dist` folder** to the deploy area
3. **Site is live!** Copy the URL

**Option B: GitHub Integration**
1. **Push code to GitHub**
2. **Go to [netlify.com](https://netlify.com)**
3. **New site from Git** → **GitHub** → **Select repository**
4. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `dist`
5. **Deploy**

### Step 3: Configure Environment Variables
1. **Go to Site Settings** → **Environment Variables**
2. **Add:**
   - `VITE_CLERK_PUBLISHABLE_KEY` = `pk_test_your_clerk_key_here`
   - `VITE_API_BASE_URL` = `https://your-railway-url.up.railway.app`
3. **Save** → **Trigger Deploy**

---

## 🔧 TROUBLESHOOTING

### ❌ Backend Issues:

**Problem**: Railway deployment fails
**Solution**: 
- Ensure `backend` folder is set as root directory
- Check `package.json` has correct start script
- View deployment logs in Railway dashboard

**Problem**: CORS errors
**Solution**: Your backend is now configured for common deployment URLs

### ❌ Frontend Issues:

**Problem**: Blank page after deployment
**Solution**:
- Check environment variables are set correctly
- Verify API URL is correct
- Check browser console for errors

**Problem**: API calls fail
**Solution**:
- Update `VITE_API_BASE_URL` to your Railway URL
- Ensure Railway backend is running
- Test backend health endpoint directly

### ❌ General Issues:

**Problem**: Environment variables not working
**Solution**:
- For frontend: Must start with `VITE_`
- Redeploy after adding variables
- Check spelling and formatting

---

## ✅ VERIFICATION CHECKLIST

### ✓ Backend Deployed Successfully:
- [ ] Railway URL responds with "API is running successfully"
- [ ] `/api/packages` returns package data
- [ ] No CORS errors in browser console

### ✓ Frontend Deployed Successfully:
- [ ] Netlify site loads without blank page
- [ ] Navigation works (all routes)
- [ ] API calls work (packages load)
- [ ] No console errors

### ✓ Environment Variables Set:
- [ ] `VITE_CLERK_PUBLISHABLE_KEY` in Netlify
- [ ] `VITE_API_BASE_URL` in Netlify pointing to Railway

---

## 🎉 SUCCESS URLS

After successful deployment, you should have:
- **Frontend**: `https://brilliant-choux-xxxxxx.netlify.app`
- **Backend**: `https://backend-production-xxxx.up.railway.app`
- **API**: `https://backend-production-xxxx.up.railway.app/api/packages`

---

## 🆘 Still Having Issues?

1. **Check deployment logs** in Railway/Netlify dashboards
2. **Verify all environment variables** are correctly set
3. **Test API endpoints directly** in browser
4. **Check browser console** for JavaScript errors
5. **Ensure Railway backend is running** and accessible

## 📞 Quick Fixes:

### For "Nothing shows" issue:
```bash
# 1. Rebuild with correct environment variables
npm run build

# 2. Check if dist folder has files
ls dist/

# 3. Redeploy to Netlify
# Drag new dist folder or trigger new build
```

### For API issues:
- Visit your Railway URL directly
- Check if `/api/packages` endpoint works
- Update frontend environment variable to exact Railway URL

**Your deployment should now work! 🚀**