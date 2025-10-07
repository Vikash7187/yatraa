#!/bin/bash

echo "🔍 GitHub Pages Deployment Debug Script"
echo "========================================"

echo "📁 Current directory:"
pwd

echo ""
echo "📋 Git status:"
git status --short

echo ""
echo "🌿 Current branch:"
git branch --show-current

echo ""
echo "📦 Build status:"
if [ -d "dist" ]; then
  echo "✅ dist folder exists"
  echo "📂 dist contents:"
  ls -la dist/
else
  echo "❌ dist folder missing - need to run 'npm run build'"
fi

echo ""
echo "⚙️ Package.json scripts:"
grep -A 10 '"scripts"' package.json

echo ""
echo "🔧 Vite config:"
grep -A 5 'base:' vite.config.js

echo ""
echo "🚀 To deploy:"
echo "1. Make sure you're on the 'roots' or 'main' branch"
echo "2. Commit and push your changes"
echo "3. GitHub Actions will automatically deploy"
echo "4. Check: https://vikash7187.github.io/yatraa/"