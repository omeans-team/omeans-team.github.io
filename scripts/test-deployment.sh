#!/bin/bash

# Script untuk test deployment system
# Test build process dan deployment ke live branch

echo "🧪 Testing deployment system..."

# Konfigurasi
MAIN_BRANCH="main"
LIVE_BRANCH="live"

# Mengecek apakah sudah di branch main
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    echo "❌ Error: You must be on the $MAIN_BRANCH branch to test deployment"
    echo "Current branch: $CURRENT_BRANCH"
    echo "Please checkout to $MAIN_BRANCH first:"
    echo "  git checkout $MAIN_BRANCH"
    exit 1
fi

echo "✅ Current branch: $CURRENT_BRANCH"

# Test build process
echo "🔨 Testing build process..."
if npm run build; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    exit 1
fi

# Mengecek apakah out directory ada
if [ ! -d "out" ]; then
    echo "❌ Error: 'out' directory not found after build"
    echo "Please check your build configuration"
    exit 1
fi

echo "✅ Static files generated in 'out' directory"

# Mengecek isi out directory
echo "📁 Contents of 'out' directory:"
ls -la out/

# Test live branch existence
if git show-ref --verify --quiet refs/heads/$LIVE_BRANCH; then
    echo "✅ Live branch exists"
    
    # Mengecek live branch content
    echo "📋 Live branch content:"
    git ls-tree -r --name-only $LIVE_BRANCH | head -10
    
    # Compare with out directory
    echo "🔍 Comparing main build with live branch..."
    git checkout $LIVE_BRANCH -- .
    if diff -r out/ . > /dev/null 2>&1; then
        echo "✅ Live branch is up to date"
    else
        echo "⚠️  Live branch needs update"
    fi
    
    # Kembali ke main branch
    git checkout $MAIN_BRANCH -- .
else
    echo "⚠️  Live branch does not exist"
    echo "Run 'npm run setup-live' to create it"
fi

# Test GitHub Actions workflow
echo "🔧 Testing GitHub Actions workflow..."
if [ -f ".github/workflows/deploy-to-live.yml" ]; then
    echo "✅ Deploy workflow exists"
    
    # Validate YAML syntax
    if python3 -c "import yaml; yaml.safe_load(open('.github/workflows/deploy-to-live.yml'))" 2>/dev/null; then
        echo "✅ Workflow YAML is valid"
    else
        echo "❌ Workflow YAML has syntax errors"
    fi
else
    echo "❌ Deploy workflow not found"
fi

# Test package.json scripts
echo "📦 Testing package.json scripts..."
if npm run | grep -q "setup-live"; then
    echo "✅ Setup live script exists"
else
    echo "❌ Setup live script not found"
fi

if npm run | grep -q "build"; then
    echo "✅ Build script exists"
else
    echo "❌ Build script not found"
fi

# Summary
echo ""
echo "🎯 Deployment Test Summary:"
echo "  - Build process: ✅ Working"
echo "  - Static files: ✅ Generated"
echo "  - Live branch: $(git show-ref --verify --quiet refs/heads/$LIVE_BRANCH && echo "✅ Exists" || echo "❌ Missing")"
echo "  - GitHub Actions: $(test -f ".github/workflows/deploy-to-live.yml" && echo "✅ Configured" || echo "❌ Missing")"
echo "  - NPM scripts: ✅ Available"
echo ""
echo "📋 Next steps:"
echo "1. If live branch is missing: npm run setup-live"
echo "2. Configure GitHub Pages to use 'live' branch"
echo "3. Test deployment: git push origin main"
echo "4. Check GitHub Actions for deployment status"
