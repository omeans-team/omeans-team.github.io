# 🚀 Live Branch Deployment System

Sistem deployment otomatis untuk memisahkan kode development (private) dari static files (public) menggunakan GitHub Actions.

## 📋 Overview

Sistem ini memungkinkan Anda untuk:
- **Main Branch**: Menyimpan kode development yang bersifat private
- **Live Branch**: Menyimpan static files yang aman untuk publikasi
- **Auto-Deploy**: Otomatis deploy static files saat push ke main branch
- **Security**: Mencegah kode sensitif terpublish ke publik

## 🏗️ Architecture

```
┌─────────────────┐    Push     ┌──────────────────┐    GitHub Actions    ┌─────────────────┐
│   Main Branch   │ ──────────► │   Repository     │ ───────────────────► │  Live Branch    │
│  (Development)  │             │   (Private)      │                      │   (Public)      │
│                 │             │                  │                      │                 │
│ • Source Code   │             │ • All Files      │                      │ • Static Files  │
│ • Config Files  │             │ • Development    │                      │ • HTML/CSS/JS   │
│ • Dependencies  │             │ • Private        │                      │ • Assets        │
│ • Sensitive     │             │                  │                      │ • Safe for Web  │
└─────────────────┘             └──────────────────┘                      └─────────────────┘
```

## 🚀 Quick Start

### 1. Setup Live Branch

```bash
# Menggunakan GitHub Actions approach (Recommended)
npm run setup-live-actions

# Atau menggunakan script manual
npm run setup-live-manual
```

### 2. Configure GitHub Pages

1. Buka repository di GitHub
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: `live`
5. Folder: `/ (root)`
6. Save

### 3. Test Deployment

```bash
# Buat perubahan di main branch
echo "Test deployment" >> README.md
git add .
git commit -m "Test live branch deployment"
git push origin main
```

## 📁 File Structure

### Main Branch (Development)
```
omeans-team.github.io/
├── src/                    # Source code
├── public/                 # Public assets
├── scripts/                # Build scripts
├── .github/                # GitHub Actions
├── package.json            # Dependencies
├── next.config.ts          # Next.js config
└── README.md               # Documentation
```

### Live Branch (Production)
```
omeans-team.github.io/
├── index.html              # Main page
├── _next/                  # Next.js static files
├── video-scrubber/         # Video assets
├── favicon.ico             # Favicon
├── .nojekyll               # GitHub Pages config
└── README.md               # Live branch info
```

## 🔧 Available Scripts

### Setup Scripts
```bash
# GitHub Actions approach (Recommended)
npm run setup-live-actions

# Manual approach
npm run setup-live-manual

# Clean approach
npm run setup-live-clean

# Ultra clean approach
npm run setup-live-ultra

# Windows versions
npm run setup-live-win
npm run setup-live-clean-win
```

### Testing Scripts
```bash
# Test deployment system
npm run test-deployment
```

## 🚀 GitHub Actions Workflow

### `.github/workflows/deploy-to-live.yml`

Workflow ini akan otomatis:
1. **Trigger**: Push ke `main` branch
2. **Build**: Next.js project
3. **Deploy**: Static files ke `live` branch
4. **Create Issue**: Deployment summary

```yaml
name: Deploy to Live Branch

on:
  push:
    branches: [main]
    paths-ignore:
      - '**.md'
      - '.github/**'
      - 'docs/**'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to live branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          publish_branch: live
          force_orphan: true
```

## 🔒 Security Features

### Branch Protection
- **Main Branch**: Private development
- **Live Branch**: Public static files only
- **Auto-Deploy**: No manual intervention needed
- **No Sensitive Data**: node_modules, config files excluded

### File Exclusions
```
node_modules/          # Dependencies
.next/                 # Next.js build cache
.git/                  # Git history
.env*                  # Environment variables
*.log                  # Log files
coverage/              # Test coverage
```

## 📊 Deployment Process

### 1. Development Workflow
```bash
# 1. Make changes in main branch
git checkout main
# Edit files...

# 2. Build and test locally
npm run build
npm run dev

# 3. Commit and push
git add .
git commit -m "Update feature"
git push origin main
```

### 2. Automatic Deployment
1. **GitHub Actions** triggered on push
2. **Build** project in clean environment
3. **Generate** static files in `out/` directory
4. **Deploy** to `live` branch
5. **Create** deployment summary issue

### 3. Live Site Update
- **GitHub Pages** serves from `live` branch
- **Static files** available at `https://username.github.io/repo/`
- **No sensitive data** exposed to public

## 🔗 URLs

### Development
- **Repository**: `https://github.com/username/repo`
- **Main Branch**: `https://github.com/username/repo/tree/main`
- **Issues**: `https://github.com/username/repo/issues`

### Production
- **Live Site**: `https://username.github.io/repo/`
- **Live Branch**: `https://github.com/username/repo/tree/live`

## 🛠️ Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Check build locally
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint
```

#### 2. Deployment Failures
```bash
# Check GitHub Actions logs
# Go to: Actions tab in repository

# Verify live branch exists
git branch -a | grep live

# Recreate live branch if needed
npm run setup-live-actions
```

#### 3. Permission Issues
```bash
# Check repository permissions
# Settings > Actions > General > Workflow permissions
# Enable: "Read and write permissions"
```

### Debug Commands
```bash
# Check current branch
git branch --show-current

# Check remote branches
git branch -r

# Check live branch content
git checkout live
ls -la

# Return to main
git checkout main
```

## 📈 Monitoring

### GitHub Actions
- **Status**: Check Actions tab
- **Logs**: View detailed build logs
- **Issues**: Deployment summaries created automatically

### Live Site
- **URL**: `https://username.github.io/repo/`
- **Status**: Check GitHub Pages settings
- **Custom Domain**: Configure in repository settings

## 🔄 Maintenance

### Regular Tasks
1. **Update Dependencies**: `npm update`
2. **Check Build**: `npm run build`
3. **Test Deployment**: Push test changes
4. **Monitor Issues**: Review deployment summaries

### Cleanup
```bash
# Clean build cache
rm -rf .next out

# Clean node_modules (if needed)
rm -rf node_modules
npm install

# Reset live branch (if corrupted)
npm run setup-live-actions
```

## 📚 Best Practices

### Development
- ✅ Work only in `main` branch
- ✅ Test builds locally before pushing
- ✅ Use meaningful commit messages
- ✅ Keep dependencies updated

### Security
- ✅ Never commit sensitive data
- ✅ Use environment variables
- ✅ Review deployment summaries
- ✅ Monitor live branch content

### Performance
- ✅ Optimize images and assets
- ✅ Minimize bundle size
- ✅ Use CDN for large files
- ✅ Enable compression

## 🎯 Benefits

### Security
- **Code Protection**: Source code stays private
- **No Sensitive Data**: Only static files published
- **Controlled Access**: Development environment isolated

### Automation
- **Zero Manual Work**: Push triggers deployment
- **Consistent Builds**: Clean environment every time
- **Instant Updates**: Changes live immediately

### Maintainability
- **Clear Separation**: Development vs production
- **Easy Rollback**: Git history preserved
- **Team Collaboration**: Standard workflow

## 🚀 Next Steps

1. **Configure GitHub Pages** to use `live` branch
2. **Set up branch protection** rules
3. **Test deployment** with a small change
4. **Monitor** GitHub Actions for any issues
5. **Customize** workflow as needed

---

*This system provides a secure, automated way to deploy static files while keeping your development code private.*
