# 🚀 Auto Deployment System

## 📋 Overview

Sistem deployment otomatis yang memindahkan static files dari repository private ke repository public untuk GitHub Pages. Sistem ini menggunakan SSH Deploy Keys untuk keamanan dan otomatisasi penuh.

## 🎯 Fitur Utama

### ✅ **Auto Build & Deploy**
- Build otomatis saat push ke main branch
- Deploy ke repository public terpisah
- SSH authentication untuk keamanan
- Base path configuration untuk GitHub Pages

### ✅ **Smart Detection**
- Hanya deploy saat ada perubahan kode
- Ignore file markdown dan dokumentasi
- Build verification sebelum deploy

### ✅ **Live Site Management**
- Repository private untuk source code
- Repository public untuk live site
- Otomatis update live site

## 🔧 Setup Requirements

### 1. **Repository Structure**
```
Private Repository: omeans-team/omeans-team.github.io (source code)
Public Repository:  omeans-team/omeans-team-live (live site)
```

### 2. **SSH Deploy Keys**
```bash
# Generate SSH key pair
ssh-keygen -t rsa -b 4096 -C "omeans-team-deployment" -f deploy_key

# Public key → Live repository deploy keys
# Private key → Source repository secrets
```

### 3. **GitHub Pages Configuration**
- **Source**: Deploy from a branch
- **Branch**: main
- **Folder**: / (root)

## 🔑 SSH Setup

### **Step 1: Add Public Key to Live Repository**
1. Buka: https://github.com/omeans-team/omeans-team-live/settings/keys
2. Click: "Add deploy key"
3. **Title**: `omeans-team-deployment`
4. **Key**: Paste public key content
5. **Allow write access**: ✅ Enable
6. **Add key**

### **Step 2: Add Private Key to Source Repository**
1. Buka: https://github.com/omeans-team/omeans-team.github.io/settings/secrets/actions
2. Click: "New repository secret"
3. **Name**: `deploy_key` (huruf kecil)
4. **Value**: Paste private key content
5. **Add secret**

## 📁 Configuration Files

### **next.config.ts**
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: '/omeans-team-live',
  assetPrefix: '/omeans-team-live/',
  images: {
    unoptimized: true
  },
  experimental: {
    esmExternals: false
  }
}

export default nextConfig
```

### **.github/workflows/deploy-to-separate-repo.yml**
```yaml
name: Deploy to Separate Live Repository

on:
  push:
    branches:
      - main
    paths-ignore:
      - '**.md'
      - 'docs/**'
      - 'README.md'

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pages: write
      id-token: write
      actions: write
      issues: write
      pull-requests: write
    
    steps:
      - name: Checkout main repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build static files
        run: |
          echo "🔨 Building static files..."
          SKIP_ENV_VALIDATION=true NODE_ENV=production npm run build
          echo "✅ Build completed"
          ls -la out/
      
      - name: Verify build output
        run: |
          echo "📁 Checking build output..."
          if [ ! -f "out/index.html" ]; then
            echo "❌ index.html not found in out directory"
            ls -la out/
            exit 1
          fi
          echo "✅ index.html found"
          echo "📊 Build output contents:"
          ls -la out/
      
      - name: Setup SSH
        run: |
          echo "🔑 Setting up SSH for deployment..."
          mkdir -p ~/.ssh
          echo "${{ secrets.deploy_key }}" > ~/.ssh/id_rsa
          chmod 600 ~/.ssh/id_rsa
          ssh-keyscan github.com >> ~/.ssh/known_hosts
      
      - name: Deploy to separate live repository
        run: |
          echo "🚀 Deploying to live repository..."
          
          # Configure git to use SSH
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          
          # Clone the live repository using SSH
          git clone git@github.com:omeans-team/omeans-team-live.git live-repo
          cd live-repo
          
          # Switch to main branch
          git checkout main || git checkout -b main
          
          # Remove all existing files
          git rm -rf . || true
          
          # Copy static files from build output
          cp -r ../out/* .
          
          # Add .nojekyll file
          touch .nojekyll
          
          # Add all files
          git add .
          
          # Commit
          git commit -m "Deploy static files from main repository - $(date)" || echo "No changes to commit"
          
          # Push to live repository using SSH
          git push origin main --force
          
          echo "✅ Deployment completed"
      
      - name: Verify deployment
        run: |
          echo "🔍 Verifying deployment..."
          sleep 10
          curl -s -o /dev/null -w "%{http_code}" https://omeans-team.github.io/omeans-team-live/ || echo "Site not yet available"
      
      - name: Create deployment summary
        uses: actions/github-script@v7
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          script: |
            try {
              console.log('🔍 Creating deployment summary...');
              
              const { data: commits } = await github.rest.repos.compareCommits({
                owner: context.repo.owner,
                repo: context.repo.repo,
                base: context.payload.before,
                head: context.payload.after
              });
              
              const changedFiles = commits.files || [];
              const additions = changedFiles.reduce((sum, file) => sum + file.additions, 0);
              const deletions = changedFiles.reduce((sum, file) => sum + file.deletions, 0);
              
              const summary = `## 🚀 Live Repository Deployment Summary
              
              **Live Repository:** \`omeans-team/omeans-team-live\` (public)
              **Source Repository:** \`${context.repo.owner}/${context.repo.repo}\` (private)
              **Commit:** \`${context.payload.head_commit.id.substring(0, 7)}\`
              **Author:** ${context.payload.head_commit.author.name}
              **Date:** ${new Date(context.payload.head_commit.timestamp).toLocaleString()}
              
              ### 📊 Build Statistics
              - **Files Changed:** ${changedFiles.length} files
              - **Additions:** +${additions} lines
              - **Deletions:** -${deletions} lines
              - **Total Changes:** ${additions + deletions} lines
              
              ### 🔗 Links
              - **Live Site:** https://omeans-team.github.io/omeans-team-live/
              - **Source Code:** https://github.com/${context.repo.owner}/${context.repo.repo} (private)
              - **Live Repository:** https://github.com/omeans-team/omeans-team-live
              
              ### 📝 Changes Made
              \`\`\`
              ${context.payload.head_commit.message}
              \`\`\`
              
              ---
              *This deployment was automatically generated from the private main repository.*`;
              
              const issue = await github.rest.issues.create({
                owner: context.repo.owner,
                repo: context.repo.repo,
                title: '🚀 Live Repository Deployed: ' + context.payload.head_commit.message.split('\n')[0],
                body: summary,
                labels: ['deployment', 'live-repository', 'auto-generated']
              });
              
              console.log('✅ Deployment summary issue created: #' + issue.data.number);
            } catch (error) {
              console.error('❌ Failed to create deployment summary:', error.message);
              console.error('Error details:', JSON.stringify(error, null, 2));
              
              // Create a simple comment instead
              try {
                const comment = `🚀 **Deployment Successful!**
                
                **Live Site:** https://omeans-team.github.io/omeans-team-live/
                **Commit:** \`${context.payload.head_commit.id.substring(0, 7)}\`
                **Message:** ${context.payload.head_commit.message}
                
                *Deployment completed successfully but issue creation failed due to permissions.*`;
                
                console.log('📝 Deployment completed successfully!');
                console.log('🔗 Live Site: https://omeans-team.github.io/omeans-team-live/');
              } catch (commentError) {
                console.error('❌ Failed to create comment:', commentError.message);
              }
            }
```

## 📊 Workflow Steps

### 1. **Trigger**
```yaml
on:
  push:
    branches:
      - main
    paths-ignore:
      - '**.md'
      - 'docs/**'
      - 'README.md'
```

### 2. **Build Process**
```bash
# Install dependencies
npm ci

# Build static files
SKIP_ENV_VALIDATION=true NODE_ENV=production npm run build

# Verify build output
ls -la out/
```

### 3. **SSH Setup**
```bash
# Setup SSH key
mkdir -p ~/.ssh
echo "${{ secrets.deploy_key }}" > ~/.ssh/id_rsa
chmod 600 ~/.ssh/id_rsa
ssh-keyscan github.com >> ~/.ssh/known_hosts
```

### 4. **Deploy Process**
```bash
# Clone live repository
git clone git@github.com:omeans-team/omeans-team-live.git live-repo

# Clean and copy files
git rm -rf . || true
cp -r ../out/* .
touch .nojekyll

# Commit and push
git add .
git commit -m "Deploy static files from main repository - $(date)"
git push origin main --force
```

### 5. **Verification**
```bash
# Verify deployment
sleep 10
curl -s -o /dev/null -w "%{http_code}" https://omeans-team.github.io/omeans-team-live/
```

## 🎯 Expected Results

### **Success Indicators**
```
🔨 Building static files...
✅ Build completed
📁 Checking build output...
✅ index.html found
🔑 Setting up SSH for deployment...
🚀 Deploying to live repository...
Cloning into 'live-repo'...
✅ Deployment completed
🔍 Verifying deployment...
200
✅ Deployment summary issue created: #123
```

### **Live Site**
- **URL**: https://omeans-team.github.io/omeans-team-live/
- **Status**: Active and updated
- **Assets**: CSS, JS, images load correctly

## 🚨 Troubleshooting

### **Build Errors**
```bash
# Error: TypeError: Cannot read properties of null (reading 'useContext')
# Solution: Use SKIP_ENV_VALIDATION=true
SKIP_ENV_VALIDATION=true NODE_ENV=production npm run build
```

### **SSH Authentication Errors**
```bash
# Error: Permission denied (publickey)
# Solution: Check SSH key setup
1. Verify public key in live repository deploy keys
2. Verify private key in source repository secrets
3. Check key permissions (600)
```

### **Base Path Issues**
```bash
# Error: 404 on CSS/JS files
# Solution: Check next.config.ts
basePath: '/omeans-team-live',
assetPrefix: '/omeans-team-live/',
```

### **GitHub API Errors**
```bash
# Error: Resource not accessible by integration
# Solution: Add permissions
permissions:
  issues: write
  pull-requests: write
```

## 🔒 Security Best Practices

### 1. **SSH Key Management**
- Generate unique keys per project
- Use deploy keys (not personal SSH keys)
- Set proper file permissions (600)
- Rotate keys regularly

### 2. **Repository Permissions**
- Private source repository
- Public live repository
- Minimal required permissions
- No sensitive data in live repository

### 3. **Secrets Management**
- Use repository secrets (not environment secrets)
- Rotate secrets regularly
- Monitor secret usage

## 📈 Monitoring

### **GitHub Actions**
- Monitor workflow runs
- Check build logs
- Verify deployment success
- Review error messages

### **Live Site**
- Test site functionality
- Check asset loading
- Verify responsive design
- Monitor performance

### **Repository Health**
- Check commit history
- Monitor issue creation
- Review deployment frequency
- Track build times

## 🎯 Best Practices

### 1. **Commit Strategy**
```bash
# Use descriptive commit messages
git commit -m "feat: add new dashboard component"
git commit -m "fix: resolve mobile layout issues"
git commit -m "docs: update deployment documentation"
```

### 2. **Branch Strategy**
```bash
# Main branch for production
main/                      # ✅ Auto deploy
feature/new-feature/       # ❌ No deploy
hotfix/urgent-fix/         # ❌ No deploy
```

### 3. **File Organization**
```bash
# Keep sensitive files in private repo
src/                       # ✅ Source code
public/                    # ✅ Static assets
.env.local                 # ❌ Never commit
secrets/                   # ❌ Never commit
```

## 📚 References

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-export)
- [GitHub Actions SSH](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [SSH Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys)

---

**🚀 Sistem deployment otomatis yang aman dan efisien!**
