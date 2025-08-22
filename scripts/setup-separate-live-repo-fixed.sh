#!/bin/bash

# Script untuk setup repository terpisah untuk live site (GitHub Free) - Fixed Version
# Repository utama tetap private, repository live site public

echo "🚀 Setting up separate live repository for GitHub Free (Fixed Version)..."

# Konfigurasi
MAIN_REPO="omeans-team/omeans-team.github.io"
LIVE_REPO="omeans-team/omeans-team-live"
LIVE_BRANCH="main"

echo "📋 Configuration:"
echo "  - Main Repository: $MAIN_REPO (private)"
echo "  - Live Repository: $LIVE_REPO (public)"
echo "  - Live Branch: $LIVE_BRANCH"

# Mengecek apakah live repository sudah ada
echo "🔍 Checking if live repository exists..."
if git ls-remote "https://github.com/$LIVE_REPO.git" >/dev/null 2>&1; then
    echo "✅ Live repository exists"
    RECREATE="n"
else
    echo "❌ Live repository does not exist"
    echo ""
    echo "📋 Please create the live repository first:"
    echo "1. Go to: https://github.com/new"
    echo "2. Repository name: omeans-team-live"
    echo "3. Visibility: Public"
    echo "4. Description: Live site for omeans-team portfolio"
    echo "5. Create repository"
    echo ""
    echo "⚠️  After creating the repository, run this script again"
    echo ""
    echo "🔗 Repository URL: https://github.com/$LIVE_REPO"
    exit 1
fi

# Membuat live repository
echo "🌿 Setting up live repository..."

# Clone repository kosong atau buat baru
if [ ! -d "live-repo" ]; then
    mkdir live-repo
    cd live-repo
    git init
    git remote add origin "https://github.com/$LIVE_REPO.git"
else
    cd live-repo
    git remote set-url origin "https://github.com/$LIVE_REPO.git"
fi

# Fetch latest changes
echo "📥 Fetching latest changes..."
git fetch origin

# Check if main branch exists
if git ls-remote --heads origin main | grep -q main; then
    echo "✅ Main branch exists, checking out..."
    git checkout main
    git pull origin main
else
    echo "📝 Creating main branch..."
    git checkout -b main
fi

# Menghapus semua file
echo "🧹 Cleaning up live repository..."
git rm -rf . 2>/dev/null || true

# Membuat file minimal untuk live repository
echo "📄 Creating minimal files for live repository..."

# Menambahkan .nojekyll untuk GitHub Pages
echo "" > .nojekyll

# Membuat README untuk live repository
cat > README.md << EOF
# 🚀 Live Site - Static Files

This repository contains the compiled static files for the live website.

## 📋 Information

- **Source Repository:** \`$MAIN_REPO\` (private development)
- **Live Repository:** \`$LIVE_REPO\` (public static files)
- **Auto-Deploy:** Yes (via GitHub Actions)
- **Last Updated:** $(date)

## 🔗 Links

- **Live Site:** https://$(echo $LIVE_REPO | cut -d'/' -f1).github.io/$(echo $LIVE_REPO | cut -d'/' -f2)/
- **Source Code:** https://github.com/$MAIN_REPO (private)

## ⚠️ Important

- **DO NOT** edit files directly in this repository
- **DO NOT** commit sensitive information to this repository
- All changes should be made in the source repository
- This repository is automatically updated via GitHub Actions

## 🔧 Development

To make changes:

1. Work in the source repository: \`$MAIN_REPO\`
2. Make your changes
3. Build the project: \`npm run build\`
4. Commit and push to source repository
5. GitHub Actions will automatically deploy to this repository

## 🚀 GitHub Actions Workflow

The deployment is handled by GitHub Actions in the source repository which:

1. Builds the project on push to main branch
2. Deploys static files to this repository
3. Creates deployment summary issues
4. Excludes node_modules and development files

---
*This repository is automatically managed by GitHub Actions from the source repository.*
EOF

# Commit minimal files
echo "💾 Committing minimal files..."
git add .
git commit -m "🚀 Initial live repository setup

- Empty repository for GitHub Pages deployment
- Contains only .nojekyll and README.md
- Static files will be deployed by GitHub Actions
- Safe for public deployment"

# Push ke live repository
echo "📤 Pushing to live repository..."
git push origin main

# Kembali ke directory utama
cd ..

echo "✅ Live repository setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure GitHub Pages to use '$LIVE_REPO' repository"
echo "2. Update GitHub Actions workflow to deploy to '$LIVE_REPO'"
echo "3. Test the deployment by pushing to main repository"
echo ""
echo "🔗 GitHub Pages Settings:"
echo "  Repository: $LIVE_REPO"
echo "  Settings > Pages > Source: Deploy from a branch"
echo "  Branch: $LIVE_BRANCH"
echo "  Folder: / (root)"
echo ""
echo "🔒 Security Benefits:"
echo "  - Main repository stays private"
echo "  - Only static files are public"
echo "  - Source code remains protected"
echo "  - Automated deployment process"
