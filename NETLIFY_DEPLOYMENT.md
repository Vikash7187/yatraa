# Netlify Deployment Guide for Yatraa

⚠️ **Important Note**: Vercel is recommended over Netlify for Vite projects due to better build compatibility and performance. However, this guide will help you deploy successfully on Netlify.

## 🚀 Netlify Deployment Options

### Option 1: GitHub Integration (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git push origin main
   ```

2. **Visit Netlify Dashboard:**
   - Go to [netlify.com](https://netlify.com)
   - Sign in with your GitHub account
   - Click "Add new site" → "Import an existing project"

3. **Connect to GitHub:**
   - Select "Deploy with GitHub"
   - Choose your repository: `Vikash7187/yatraa`
   - Branch to deploy: `main`

4. **Build Settings (Auto-detected from netlify.toml):**
   - Build command: `npm run build:netlify`
   - Publish directory: `dist`
   - Node.js version: `18`

5. **Environment Variables:**
   The following are already configured in `netlify.toml`:
   - ✅ `VITE_CLERK_PUBLISHABLE_KEY`
   - ✅ `VITE_API_BASE_URL`
   - ✅ `NODE_VERSION = "18"`
   - ✅ `NPM_VERSION = "9"`

6. **Deploy:**
   - Click "Deploy site"
   - Netlify will build and deploy automatically

### Option 2: Manual Deployment

1. **Build locally:**
   ```bash
   npm run build
   ```

2. **Deploy manually:**
   - Go to Netlify dashboard
   - Drag and drop the `dist` folder to deploy

## 🔧 Configuration Details

### Build Configuration (netlify.toml)
```toml
[build]
  publish = "dist"
  command = "npm run build:netlify"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"
  VITE_CLERK_PUBLISHABLE_KEY = "your_clerk_key"
  VITE_API_BASE_URL = "https://yatraa-production.up.railway.app"
```

### Custom Build Script
The `build:netlify` script in package.json:
```json
"build:netlify": "npm ci && vite build"
```
This ensures clean dependency installation to avoid Rollup issues.

## 🛠️ Troubleshooting Common Issues

### 1. Rollup Build Errors
If you encounter `@rollup/rollup-linux-x64-gnu` errors:
- The configuration already uses Vite 5.4.2 (stable version)
- Uses `npm ci` for clean dependency installation
- If issues persist, consider switching to Vercel

### 2. Environment Variables Not Working
- Ensure variables are prefixed with `VITE_`
- Check they're set in netlify.toml
- For sensitive values, set them in Netlify UI instead

### 3. Routing Issues (404 on refresh)
- The `netlify.toml` includes SPA redirects
- All routes redirect to `/index.html` for client-side routing

### 4. Build Timeouts
- Current build uses optimized chunks (vendor, mui, clerk)
- If build is slow, the configuration is already optimized

## 🌍 Domain Configuration

### Custom Domain
1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS settings as instructed

### Default Domain
- Netlify provides: `https://[site-name].netlify.app`
- You can customize the site name in settings

## 📊 Monitoring

- **Build logs:** Available in deploy section
- **Function logs:** Not applicable (static site)
- **Analytics:** Available with Netlify Analytics

## 🔄 Automatic Deployments

With GitHub integration:
- Every push to `main` triggers deployment
- Pull requests create deploy previews
- Branch deployments available

## ⚡ Performance Optimization

Already configured in `netlify.toml`:
- Asset caching with `Cache-Control` headers
- Security headers (XSS, CSRF protection)
- Gzip compression (automatic)

## 🚨 Known Limitations

1. **Build Reliability**: Netlify may have intermittent Rollup issues with Vite
2. **Build Speed**: Slower than Vercel for Vite projects
3. **Cold Start**: Functions not applicable for this static site

## 💡 Alternative: Switch to Vercel

If you encounter persistent issues:
```bash
# Vercel deployment is simpler and more reliable for Vite
vercel --prod
```

## 📞 Support

- Netlify Support: [support.netlify.com](https://support.netlify.com)
- Community: [community.netlify.com](https://community.netlify.com)
- Documentation: [docs.netlify.com](https://docs.netlify.com)