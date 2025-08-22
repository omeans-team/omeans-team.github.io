# 🔒 Private Main + Public Live Repository Deployment

Sistem deployment untuk repository private dengan live site public menggunakan repository terpisah.

## 📋 Overview

Sistem ini memungkinkan Anda untuk:
- **Main Repository**: Private (development code)
- **Live Repository**: Public (static files only)
- **Auto-Deploy**: Otomatis deploy dari private ke public
- **Security**: Source code tetap terlindungi

## 🏗️ Architecture

```
┌─────────────────────┐    Push     ┌─────────────────────┐    GitHub Actions    ┌─────────────────────┐
│  Main Repository    │ ──────────► │  Private Repository │ ───────────────────► │  Live Repository    │
│   (PRIVATE)         │             │   (Development)     │                      │   (PUBLIC)          │
│                     │             │                     │                      │                     │
│ • Source Code       │             │ • All Files         │                      │ • Static Files      │
│ • Config Files      │             │ • Development       │                      │ • HTML/CSS/JS       │
│ • Dependencies      │             │ • Private           │                      │ • Assets            │
│ • Sensitive Data    │             │                     │                      │ • Safe for Web      │
└─────────────────────┘             └─────────────────────┘                      └─────────────────────┘
```

## 🚀 Quick Start

### 1. Setup Live Repository

```bash
# Setup repository terpisah untuk live site
npm run setup-live-separate
```

### 2. Configure GitHub Pages

1. Buka live repository: https://github.com/omeans-team/omeans-team-live
2. Settings > Pages
3. Source: Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Save

### 3. Test Deployment

```bash
# Buat perubahan di main repository
echo "Test deployment" >> README.md
git add .
git commit -m "Test private to public deployment"
git push origin main
```

## 📁 Repository Structure

### Main Repository (Private)
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

### Live Repository (Public)
```
omeans-team-live/
├── index.html              # Main page
├── _next/                  # Next.js static files
├── video-scrubber/         # Video assets
├── favicon.ico             # Favicon
├── .nojekyll               # GitHub Pages config
└── README.md               # Live repository info
```

## 🔧 Available Scripts

### Setup Scripts
```bash
# Setup repository terpisah (GitHub Free)
npm run setup-live-separate

# Setup branch dalam repository yang sama (GitHub Pro+)
npm run setup-live-actions
```

## 🚀 GitHub Actions Workflow

### `.github/workflows/deploy-to-separate-repo.yml`

Workflow ini akan otomatis:
1. **Trigger**: Push ke `main` branch di repository private
2. **Build**: Next.js project
3. **Deploy**: Static files ke repository public
4. **Create Issue**: Deployment summary

```yaml
name: Deploy to Separate Live Repository

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
      - name: Checkout main repository
        uses: actions/checkout@v4
        
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build static files
        run: npm run build
        
      - name: Deploy to separate live repository
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          external_repository: omeans-team/omeans-team-live
          publish_branch: main
          force_orphan: true
```

## 🔒 Security Features

### Repository Protection
- **Main Repository**: Private (source code protected)
- **Live Repository**: Public (static files only)
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
# 1. Work in private repository
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
1. **GitHub Actions** triggered on push to private repository
2. **Build** project in clean environment
3. **Generate** static files in `out/` directory
4. **Deploy** to public repository
5. **Create** deployment summary issue

### 3. Live Site Update
- **GitHub Pages** serves from public repository
- **Static files** available at `https://username.github.io/repo-name/`
- **No sensitive data** exposed to public

## 🔗 URLs

### Development (Private)
- **Repository**: `https://github.com/omeans-team/omeans-team.github.io`
- **Main Branch**: `https://github.com/omeans-team/omeans-team.github.io/tree/main`
- **Issues**: `https://github.com/omeans-team/omeans-team.github.io/issues`

### Production (Public)
- **Live Site**: `https://omeans-team.github.io/omeans-team-live/`
- **Live Repository**: `https://github.com/omeans-team/omeans-team-live`

## 🛠️ Setup Instructions

### Step 1: Create Live Repository
```bash
# Run setup script
npm run setup-live-separate
```

### Step 2: Configure GitHub Pages
1. Buka: https://github.com/omeans-team/omeans-team-live/settings/pages
2. Source: Deploy from a branch
3. Branch: main
4. Folder: / (root)
5. Save

### Step 3: Test Deployment
```bash
# Make changes in private repository
echo "Test deployment" >> README.md
git add .
git commit -m "Test deployment"
git push origin main
```

## 🎯 Benefits

### Security
- **Source Code Protection**: Main repository tetap private
- **No Sensitive Data**: Hanya static files yang public
- **Controlled Access**: Development environment terisolasi

### Automation
- **Zero Manual Work**: Push triggers deployment
- **Consistent Builds**: Clean environment setiap kali
- **Instant Updates**: Changes live immediately

### GitHub Free Compatibility
- **Works with Free Plan**: Tidak perlu GitHub Pro
- **Public Live Site**: GitHub Pages tersedia untuk public repository
- **Private Development**: Source code tetap terlindungi

## 🔄 Maintenance

### Regular Tasks
1. **Update Dependencies**: `npm update`
2. **Check Build**: `npm run build`
3. **Test Deployment**: Push test changes
4. **Monitor Issues**: Review deployment summaries

### Repository Management
```bash
# Check live repository status
git ls-remote https://github.com/omeans-team/omeans-team-live.git

# Recreate live repository if needed
npm run setup-live-separate
```

## 🚀 Next Steps

1. **Run setup script**: `npm run setup-live-separate`
2. **Configure GitHub Pages** untuk live repository
3. **Test deployment** dengan perubahan kecil
4. **Monitor** GitHub Actions untuk memastikan semuanya berjalan
5. **Customize** workflow sesuai kebutuhan

---

*This system provides a secure, automated way to deploy static files from a private repository to a public live site.*
