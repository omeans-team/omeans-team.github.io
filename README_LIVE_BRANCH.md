# 🚀 Live Branch Deployment System

Sistem untuk memisahkan kode development (private) dari static files (public) dengan auto-deployment menggunakan branch terpisah.

## 🎯 Konsep

### 📁 **Branch Structure**
```
main (private)     → Development branch dengan kode rahasia
├── src/           → Source code
├── scripts/       → Build scripts
├── .github/       → GitHub Actions
├── package.json   → Dependencies
└── ...            → Development files

live (public)      → Public branch dengan static files only
├── index.html     → Compiled HTML
├── assets/        → Compiled assets
├── .nojekyll      → GitHub Pages config
└── README.md      → Live branch info
```

### 🔒 **Security Benefits**
- **Main branch**: Private, berisi kode rahasia, API keys, config files
- **Live branch**: Public, hanya berisi static files yang aman
- **Auto-deployment**: Otomatis generate static files saat push ke main

## 🚀 Fitur Utama

### ✨ **Auto-Deployment**
- **GitHub Actions** otomatis build dan deploy saat push ke main
- **Static files** di-generate dari source code
- **Live branch** selalu up-to-date dengan main branch

### 🔒 **Security**
- **Kode rahasia** tetap di main branch (private)
- **Static files** saja yang di-publish ke live branch
- **No sensitive data** di live branch

### 📊 **Monitoring**
- **Deployment summary** otomatis dibuat sebagai issue
- **Build statistics** dengan detail perubahan
- **Status tracking** untuk setiap deployment

## 📋 Setup Instructions

### 1. **Setup Live Branch (One-time)**

#### Linux/Mac:
```bash
npm run setup-live
```

#### Windows:
```batch
npm run setup-live-win
```

### 2. **Configure GitHub Pages**

1. Buka repository settings
2. Navigate ke **Pages** section
3. Set **Source**: Deploy from a branch
4. Set **Branch**: `live`
5. Set **Folder**: `/ (root)`
6. Click **Save**

### 3. **Setup Branch Protection (Recommended)**

1. Buka repository settings
2. Navigate ke **Branches** section
3. Add rule untuk `live` branch:
   - ✅ **Require pull request reviews before merging**
   - ✅ **Restrict pushes that create files**
   - ❌ **Allow force pushes** (Disabled)
   - ❌ **Allow deletions** (Disabled)

## 🔧 Workflow

### **Development Workflow:**
```bash
# 1. Work on main branch
git checkout main
# Make changes to source code

# 2. Build and test locally
npm run build
npm run dev

# 3. Commit and push
git add .
git commit -m "Add new feature"
git push origin main

# 4. GitHub Actions automatically:
#    - Builds static files
#    - Deploys to live branch
#    - Creates deployment summary
```

### **What Happens on Push:**

1. **GitHub Actions** triggered pada push ke main
2. **Build process** menjalankan `npm run build`
3. **Static files** di-generate ke `out/` directory
4. **Live branch** di-update dengan static files baru
5. **Deployment summary** issue dibuat otomatis

## 📁 File Structure

### **Main Branch (Private):**
```
omeans-team.github.io/
├── src/                    # Source code
├── scripts/                # Build scripts
├── .github/                # GitHub Actions
│   └── workflows/
│       ├── auto-create-issue.yml
│       └── deploy-to-live.yml
├── package.json            # Dependencies
├── next.config.ts          # Next.js config
├── tailwind.config.js      # Tailwind config
└── README.md               # Development docs
```

### **Live Branch (Public):**
```
omeans-team.github.io/
├── index.html              # Compiled HTML
├── _next/                  # Next.js static files
├── assets/                 # Compiled assets
├── .nojekyll               # GitHub Pages config
└── README.md               # Live branch info
```

## 🔗 URLs

### **Development:**
- **Repository:** https://github.com/omeans-team/omeans-team.github.io
- **Main Branch:** https://github.com/omeans-team/omeans-team.github.io/tree/main
- **Actions:** https://github.com/omeans-team/omeans-team.github.io/actions

### **Production:**
- **Live Site:** https://omeans-team.github.io/omeans-team.github.io/
- **Live Branch:** https://github.com/omeans-team/omeans-team.github.io/tree/live

## ⚙️ NPM Scripts

```bash
npm run setup-live          # Setup live branch (Linux/Mac)
npm run setup-live-win      # Setup live branch (Windows)
npm run build               # Build static files
npm run dev                 # Development server
npm run deploy              # Manual deployment
```

## 📊 Deployment Summary

Setiap deployment akan membuat issue dengan format:

```markdown
## 🚀 Live Branch Deployment Summary

**Branch:** `live` (public static files)
**Source:** `main` (private development)
**Commit:** `abc1234`
**Author:** Your Name
**Date:** 2024-01-15 10:30:00

### 📊 Build Statistics
- **Files Changed:** 5 files
- **Additions:** +150 lines
- **Deletions:** -20 lines
- **Total Changes:** 170 lines

### 🔗 Links
- **Live Site:** https://omeans-team.github.io/omeans-team.github.io/
- **Source Code:** https://github.com/omeans-team/omeans-team.github.io/tree/main
- **Live Branch:** https://github.com/omeans-team/omeans-team.github.io/tree/live

### 📝 Changes Made
```
Add new homepage feature
```

---
*This deployment was automatically generated from the main branch.*
```

## 🚨 Troubleshooting

### **Build Failed:**
1. Cek log di GitHub Actions
2. Pastikan semua dependencies terinstall
3. Test build lokal: `npm run build`

### **Live Branch Not Updated:**
1. Cek GitHub Actions workflow
2. Pastikan branch protection tidak memblokir
3. Verify `out/` directory ada setelah build

### **GitHub Pages Not Working:**
1. Pastikan source branch set ke `live`
2. Cek `.nojekyll` file ada di live branch
3. Wait beberapa menit untuk deployment

### **Permission Issues:**
1. Pastikan GitHub Actions memiliki permission write
2. Cek repository settings > Actions > General
3. Verify workflow permissions

## 🔒 Security Best Practices

### **Main Branch Protection:**
- ✅ Require pull request reviews
- ✅ Restrict direct pushes
- ✅ Require status checks
- ✅ Require signed commits (optional)

### **Live Branch Protection:**
- ✅ Restrict pushes that create files
- ❌ Allow force pushes (Disabled)
- ❌ Allow deletions (Disabled)
- ✅ Require pull request reviews

### **Secrets Management:**
- 🔐 Store API keys di GitHub Secrets
- 🔐 Use environment variables
- 🔐 Never commit secrets to any branch

## 📚 Referensi

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Next.js Static Export](https://nextjs.org/docs/advanced-features/static-html-export)
- [Branch Protection Rules](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule)

## 🎯 Keuntungan

1. **Security** - Kode rahasia tetap private
2. **Automation** - Deploy otomatis saat push
3. **Separation** - Development dan production terpisah
4. **Monitoring** - Tracking deployment dengan issue
5. **Reliability** - Build process yang konsisten
6. **Scalability** - Mudah di-scale untuk project besar

---

**Happy Secure Deployment! 🚀🔒**
