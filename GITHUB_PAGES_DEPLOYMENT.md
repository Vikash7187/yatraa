# GitHub Pages Deployment Guide

## Overview
This guide explains how to deploy the Yatraa travel website to GitHub Pages using automated workflows.

## Prerequisites
- GitHub repository: `https://github.com/Vikash7187/yatraa.git`
- Node.js >= 20.0.0
- npm >= 10.0.0

## Deployment Steps

### 1. Initial Setup (One-time)
The project is already configured for GitHub Pages with:
- ✅ `base: '/yatraa/'` in `vite.config.js`
- ✅ `gh-pages` dependency in `package.json`
- ✅ GitHub Actions workflow in `.github/workflows/deploy.yml`
- ✅ Correct homepage URL in `package.json`

### 2. Enable GitHub Pages
1. Go to your repository on GitHub: `https://github.com/Vikash7187/yatraa`
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. Deploy
**Automatic Deployment (Recommended):**
- Push your code to the `main` branch
- GitHub Actions will automatically build and deploy
- Website will be available at: `https://Vikash7187.github.io/yatraa`

**Manual Deployment (Alternative):**
```bash
npm run build
npm run deploy
```

### 4. Verify Deployment
- Visit: `https://Vikash7187.github.io/yatraa`
- Check that images and assets load correctly
- Test navigation and functionality

## Configuration Details

### Vite Configuration
```javascript
export default defineConfig({
  base: '/yatraa/', // GitHub Pages base path
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // ... optimized build settings
  }
})
```

### Package.json Scripts
- `npm run build` - Build production assets
- `npm run deploy` - Deploy to gh-pages branch
- `npm run predeploy` - Runs build before deploy

## Troubleshooting

### Common Issues:
1. **404 Error**: Ensure GitHub Pages is enabled with "GitHub Actions" source
2. **Assets not loading**: Check `base: '/yatraa/'` in vite.config.js
3. **Build fails**: Ensure Node.js >= 20 and run `npm ci`

### Build Status:
Check the Actions tab in your GitHub repository to monitor deployment status.

## Environment Variables
For production deployment, ensure all required environment variables are set in GitHub repository secrets if needed.

## Support
- GitHub Repository: https://github.com/Vikash7187/yatraa
- Live Site: https://Vikash7187.github.io/yatraa