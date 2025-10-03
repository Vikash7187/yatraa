# Deployment Fix Guide

## Issues Fixed

### 1. **Asset Path Configuration**
- Changed from absolute paths (`/assets/`) to relative paths (`./assets/`)
- This ensures assets load correctly regardless of deployment subdirectory

### 2. **Environment Variable Handling**
- Added better error handling for missing environment variables
- Created a fallback configuration page that shows when environment variables are missing
- App now gracefully handles missing CLERK keys instead of breaking

### 3. **Build Optimization**
- Added manual chunk splitting to reduce bundle sizes
- Improved loading performance

## Deployment Steps

### For Netlify:
1. **Set Environment Variables in Netlify Dashboard:**
   - Go to Site Settings > Environment Variables
   - Add: `VITE_CLERK_PUBLISHABLE_KEY` = your Clerk publishable key
   - Add: `VITE_API_BASE_URL` = your backend API URL (if using)

2. **Deploy:**
   ```bash
   npm run build
   ```
   - Upload the `dist` folder to Netlify

### For Vercel:
1. **Set Environment Variables in Vercel Dashboard:**
   - Go to Project Settings > Environment Variables
   - Add: `VITE_CLERK_PUBLISHABLE_KEY` = your Clerk publishable key
   - Add: `VITE_API_BASE_URL` = your backend API URL (if using)

2. **Deploy:**
   ```bash
   npm run build
   ```
   - Deploy using Vercel CLI or GitHub integration

### For Other Platforms:
1. **Set Environment Variables:**
   - Create appropriate environment variables for your platform
   - Ensure they start with `VITE_` prefix

2. **Build and Deploy:**
   ```bash
   npm run build
   ```
   - Deploy the `dist` folder

## Environment Variables Required

### Essential:
- `VITE_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key from https://dashboard.clerk.com/

### Optional:
- `VITE_API_BASE_URL`: Your backend API URL (defaults to mock API if not provided)

## Troubleshooting

### If the site still shows nothing:
1. **Check Browser Console:**
   - Open Developer Tools (F12)
   - Look for JavaScript errors or network failures

2. **Verify Environment Variables:**
   - Ensure they're properly set in your deployment platform
   - Environment variables must start with `VITE_` to be included in the build

3. **Check Asset Loading:**
   - Verify that CSS and JS files are loading correctly
   - Check if there are 404 errors for assets

### If the configuration page shows:
- This means environment variables are missing
- Add the required `VITE_CLERK_PUBLISHABLE_KEY` to your deployment platform
- Redeploy after adding environment variables

## Testing Locally

To test the production build locally:
```bash
npm run build
npm run preview
```

Visit the provided localhost URL to verify everything works before deploying.

## Common Issues

1. **Assets not loading**: Fixed by using relative paths
2. **Environment variables missing**: Fixed by proper configuration and fallback UI
3. **Chunk size warnings**: Addressed by manual chunk splitting
4. **Auth provider errors**: Fixed by graceful handling of missing Clerk keys

The application will now show a proper configuration page instead of a blank screen when environment variables are missing, making it easier to identify and fix deployment issues.