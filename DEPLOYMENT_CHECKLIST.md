# 🚀 DEPLOYMENT CHECKLIST

## ✅ COMPLETED
- [x] Backend configured for Railway deployment
- [x] Frontend built successfully
- [x] CORS configured for production domains
- [x] Environment template created

## 📋 YOUR NEXT STEPS

### STEP 1: Deploy Backend to Railway
1. **Go to**: https://railway.app
2. **Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: yatraa repository
5. **IMPORTANT**: Set **Root Directory** to `backend`
6. **Deploy** and wait for completion
7. **Copy Railway URL** (will look like: `https://backend-production-xxxx.up.railway.app`)

### STEP 2: Test Backend Deployment
Visit your Railway URL - should show: "Yatraa API is running successfully!"

### STEP 3: Update Frontend Configuration
After getting your Railway URL, update:
```bash
# Update .env file with your Railway URL
VITE_API_BASE_URL=https://your-railway-url.up.railway.app
```

### STEP 4: Rebuild Frontend
```bash
npm run build
```

### STEP 5: Deploy to Netlify
**Option A - Drag & Drop (Easiest):**
1. Go to: https://netlify.com
2. Drag your `dist` folder to the deploy area
3. Site deployed!

**Option B - GitHub Integration:**
1. Push code to GitHub
2. Netlify → New site from Git → Select repo
3. Build command: `npm run build`
4. Publish directory: `dist`

### STEP 6: Configure Netlify Environment Variables
1. **Site Settings** → **Environment Variables**
2. **Add**:
   - `VITE_CLERK_PUBLISHABLE_KEY` = your Clerk key
   - `VITE_API_BASE_URL` = your Railway URL
3. **Redeploy**

## 🧪 TESTING

After deployment, verify:
- [ ] Railway backend responds at root URL
- [ ] `/api/packages` returns data
- [ ] Netlify frontend loads without blank page
- [ ] No CORS errors in browser console

## 🆘 NEED HELP?

**If Railway deployment fails:**
- Check you set `backend` as root directory
- View deployment logs in Railway dashboard

**If Netlify shows blank page:**
- Verify environment variables are set
- Check browser console for errors
- Ensure Railway backend is accessible

**Ready to start? Begin with Step 1! 🚀**