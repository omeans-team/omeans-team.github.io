#!/bin/bash

# Script untuk setup branch live dari branch main (Final Clean Version)
# Branch live akan berisi static files yang aman untuk publikasi

echo "🚀 Setting up live branch for public deployment (Final Clean Version)..."

# Konfigurasi
MAIN_BRANCH="main"
LIVE_BRANCH="live"
REPO_NAME=$(basename -s .git $(git config --get remote.origin.url))

echo "📋 Configuration:"
echo "  - Main branch: $MAIN_BRANCH (private development)"
echo "  - Live branch: $LIVE_BRANCH (public static files)"
echo "  - Repository: $REPO_NAME"

# Mengecek apakah sudah di branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    echo "❌ Error: You must be on the $MAIN_BRANCH branch to setup live branch"
    echo "Current branch: $CURRENT_BRANCH"
    echo "Please checkout to $MAIN_BRANCH first:"
    echo "  git checkout $MAIN_BRANCH"
    exit 1
fi

# Mengecek apakah live branch sudah ada
if git show-ref --verify --quiet refs/heads/$LIVE_BRANCH; then
    echo "⚠️  Live branch already exists. Do you want to recreate it? (y/N)"
    read -r response
    if [[ ! "$response" =~ ^[Yy]$ ]]; then
        echo "❌ Setup cancelled"
        exit 1
    fi
    
    echo "🗑️  Deleting existing live branch..."
    git branch -D $LIVE_BRANCH
fi

# Build static files
echo "🔨 Building static files..."
if ! npm run build; then
    echo "❌ Build failed. Please fix the build errors first."
    exit 1
fi

# Verifikasi out directory
if [ ! -d "out" ]; then
    echo "❌ Build output directory 'out' not found"
    echo "Please check your build configuration"
    exit 1
fi

# Membuat live branch dari static files
echo "🌿 Creating live branch..."
git checkout --orphan $LIVE_BRANCH

# Menghapus semua file
echo "🧹 Cleaning up live branch..."
git rm -rf .

# Copy static files dari out directory menggunakan tar untuk exclude node_modules
echo "📁 Copying static files (using tar to exclude node_modules)..."
cd out
tar --exclude='node_modules' --exclude='.git' --exclude='*.log' --exclude='*.tmp' -cf - . | tar -xf - -C ..
cd ..

# Verify files were copied
if [ ! -f "index.html" ] && [ ! -f "index.htm" ]; then
    echo "❌ No index.html found in copied files"
    echo "Please check your build output"
    git checkout $MAIN_BRANCH
    exit 1
fi

# Menambahkan .nojekyll untuk GitHub Pages
echo "" > .nojekyll

# Membuat README untuk live branch
cat > README.md << EOF
# 🚀 Live Branch - Static Files

This branch contains the compiled static files for public deployment.

## 📋 Information

- **Source Branch:** \`$MAIN_BRANCH\` (private development)
- **Live Branch:** \`$LIVE_BRANCH\` (public static files)
- **Auto-Deploy:** Yes (via GitHub Actions)
- **Last Updated:** $(date)

## 🔗 Links

- **Live Site:** https://$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1.github.io\/\2/')/
- **Source Code:** https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1\/\2/')/tree/$MAIN_BRANCH

## ⚠️ Important

- **DO NOT** edit files directly in this branch
- **DO NOT** commit sensitive information to this branch
- All changes should be made in the \`$MAIN_BRANCH\` branch
- This branch is automatically updated via GitHub Actions

## 🔧 Development

To make changes:

1. Switch to \`$MAIN_BRANCH\` branch
2. Make your changes
3. Build the project: \`npm run build\`
4. Commit and push to \`$MAIN_BRANCH\`
5. GitHub Actions will automatically deploy to this branch

---
*This branch is automatically managed by GitHub Actions.*
EOF

# Commit static files
echo "💾 Committing static files..."
git add .
git commit -m "🚀 Initial live branch setup with static files

- Auto-generated from $MAIN_BRANCH branch
- Contains compiled static files only
- Safe for public deployment
- Managed by GitHub Actions"

# Push live branch
echo "📤 Pushing live branch to remote..."
git push origin $LIVE_BRANCH

# Kembali ke main branch
echo "🔄 Switching back to $MAIN_BRANCH..."
git checkout $MAIN_BRANCH

echo "✅ Live branch setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Configure GitHub Pages to use '$LIVE_BRANCH' branch"
echo "2. Set up branch protection rules for '$LIVE_BRANCH'"
echo "3. Test the deployment by pushing to '$MAIN_BRANCH'"
echo ""
echo "🔗 GitHub Pages Settings:"
echo "  Repository Settings > Pages > Source: Deploy from a branch"
echo "  Branch: $LIVE_BRANCH"
echo "  Folder: / (root)"
echo ""
echo "🔒 Branch Protection (Recommended):"
echo "  - Require pull request reviews before merging"
echo "  - Restrict pushes that create files"
echo "  - Allow force pushes: Disabled"
echo "  - Allow deletions: Disabled"
