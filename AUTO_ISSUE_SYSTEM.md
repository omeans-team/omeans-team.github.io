# 🤖 Smart Auto Issue Management System

## 📋 Overview

Sistem ini secara otomatis membuat dan menutup issue berdasarkan push ke repository GitHub. Sistem ini menggunakan **Smart Detection** untuk mendeteksi tipe perubahan kode dan memberikan label yang sesuai.

## 🚀 Fitur Utama

### ✅ **Auto Create Issues**
- Otomatis membuat issue setiap push
- Smart detection tipe perubahan
- Auto-assign ke user yang push
- Label otomatis berdasarkan tipe perubahan
- **Status: Open → Auto Complete** (5 detik delay)

### ✅ **Auto Close Issues**
- Menutup issue auto-generated yang sudah ada
- Menambahkan komentar penutupan dengan status
- Menandai sebagai "Auto Close Complete"

### ✅ **Auto Complete Process**
- Issue dibuat dengan status "🔄 Processing..."
- Setelah 5 detik otomatis berubah menjadi "✅ Complete"
- Status issue berubah dari "open" ke "closed"
- Menambahkan komentar "Issue Auto Complete"

### ✅ **Smart Label Detection**
- 20+ tipe perubahan yang dapat dideteksi
- Label berdasarkan file extension dan commit message
- Rekomendasi otomatis berdasarkan tipe perubahan

## 🏷️ Label yang Dapat Dideteksi

### 🐛 **Bug & Issues**
```bash
# Deteksi: fix, bug, error, issue, problem, crash, fail, broken, resolve
git commit -m "fix critical bug in login system"
# Labels: bug, auto-generated, update, push
```

### 🚀 **Improvements**
```bash
# Deteksi: improve, enhance, better, upgrade, update, modernize, polish
git commit -m "improve performance of dashboard"
# Labels: improvement, auto-generated, update, push
```

### ✨ **Features**
```bash
# Deteksi: feature, add, new, implement, create, introduce, enable
git commit -m "add new user dashboard feature"
# Labels: enhancement, auto-generated, update, push
```

### 🔀 **Merge Conflicts**
```bash
# Deteksi: conflict, merge, resolve, rebase, merge-conflict
git commit -m "resolve merge conflict in main branch"
# Labels: merge-conflict, auto-generated, update, push
```

### 🍒 **Cherry-pick**
```bash
# Deteksi: cherry-pick, cherrypick, backport, port
git commit -m "cherry-pick: add API endpoint from feature branch"
# Labels: cherry-pick, auto-generated, update, push
```

### 🚨 **Hotfix**
```bash
# Deteksi: hotfix, urgent, critical, emergency, patch
git commit -m "hotfix: resolve security vulnerability"
# Labels: hotfix, security, bug, auto-generated, update, push
```

### 💥 **Breaking Changes**
```bash
# Deteksi: breaking, major, incompatible, deprecate, remove
git commit -m "breaking: remove deprecated API endpoints"
# Labels: breaking-change, auto-generated, update, push
```

### 📦 **Dependencies**
```bash
# Deteksi: dependency, package, npm, yarn, pip, maven, gradle
git commit -m "update npm dependencies to latest versions"
# Labels: dependencies, auto-generated, update, push
```

### 🔄 **CI/CD**
```bash
# Deteksi: ci, cd, pipeline, workflow, deploy, build, release
git commit -m "update CI/CD pipeline configuration"
# Labels: ci-cd, auto-generated, update, push
```

### ♿ **Accessibility**
```bash
# Deteksi: accessibility, a11y, aria, screen-reader, wcag
git commit -m "improve accessibility with ARIA labels"
# Labels: accessibility, auto-generated, update, push
```

### 📱 **Mobile**
```bash
# Deteksi: mobile, responsive, touch, swipe, gesture
git commit -m "add mobile responsive design"
# Labels: mobile, auto-generated, update, push
```

### 🔌 **API**
```bash
# Deteksi: api, endpoint, rest, graphql, swagger, openapi
git commit -m "add new REST API endpoint for users"
# Labels: api, auto-generated, update, push
```

### 🎯 **UI/UX**
```bash
# Deteksi: ui, ux, design, interface, user, experience, layout
git commit -m "improve UI/UX design for better user experience"
# Labels: ui-ux, auto-generated, update, push
```

### 📊 **Data**
```bash
# Deteksi: data, analytics, metrics, logging, monitoring
git commit -m "add data analytics dashboard"
# Labels: data, auto-generated, update, push
```

### 🛠️ **DevOps**
```bash
# Deteksi: devops, infrastructure, docker, kubernetes, aws, azure
git commit -m "update Docker configuration for production"
# Labels: devops, auto-generated, update, push
```

## 🔧 Konfigurasi

### 📁 File Workflow
```yaml
# .github/workflows/auto-create-issue.yml
name: Smart Auto Create and Close Issues on Push

on:
  push:
    branches:
      - main
      - master
    paths-ignore:
      - '**.md'
      - '.github/**'
      - 'docs/**'
```

### 🔑 Permissions
```yaml
permissions:
  contents: write
  pages: write
  id-token: write
  actions: write
  issues: write
  pull-requests: write
```

## 📊 Cara Kerja

### 1. **Trigger**
- Push ke branch `main` atau `master`
- Mengabaikan file markdown dan dokumentasi

### 2. **Detection**
- Analisis file yang berubah
- Deteksi berdasarkan ekstensi file
- Deteksi berdasarkan commit message

### 3. **Label Generation**
- Generate label berdasarkan tipe perubahan
- Tambahkan label default: `auto-generated`, `update`, `push`

### 4. **Issue Management**
- Tutup issue auto-generated yang sudah ada
- Buat issue baru dengan label yang sesuai
- Auto-assign ke user yang push

### 5. **Comment Generation**
- Analisis topik berdasarkan tipe perubahan
- File type analysis
- Rekomendasi berdasarkan perubahan

## 🧪 Testing

### Test Case 1: Bug Fix
```bash
git commit -m "fix critical bug in login system"
# Expected: Labels [bug, auto-generated, update, push]
```

### Test Case 2: Feature + Improvement
```bash
git commit -m "add new dashboard feature and improve performance"
# Expected: Labels [enhancement, improvement, auto-generated, update, push]
```

### Test Case 3: Hotfix + Security
```bash
git commit -m "hotfix: resolve security vulnerability in auth"
# Expected: Labels [hotfix, security, bug, auto-generated, update, push]
```

### Test Case 4: Cherry-pick + API
```bash
git commit -m "cherry-pick: add new API endpoint for user data"
# Expected: Labels [cherry-pick, api, enhancement, auto-generated, update, push]
```

## 📝 Output Example

### Issue Title
```
🔄 Update: fix critical bug in login system
```

### Issue Body (Initial - Open Status)
```markdown
## 📝 Update Summary

### 🎯 Main Topics
- 🐛 Bug fixes

### 📁 File Type Analysis
- **TS**: 2 file(s)
- **CSS**: 1 file(s)

### 💡 Recommendations
- 🔍 Consider security testing
- 📋 Review access controls

**Commit:** `a1b2c3d`
**Author:** John Doe
**Date:** 8/22/2025, 6:47:49 PM

### 📋 Changes Made
fix critical bug in login system

### 📁 Files Modified
```
src/components/Login.tsx
src/styles/login.css
```

### 📊 Statistics
- **Additions:** +15 lines
- **Deletions:** -5 lines
- **Total Changes:** 20 lines
- **Files Changed:** 2 files

### 🔗 Related Links
- **Commit:** [a1b2c3d](https://github.com/user/repo/commit/a1b2c3d)
- **Branch:** `main`
- **Repository:** [user/repo](https://github.com/user/repo)

---
*This issue was automatically created by GitHub Actions on push to main branch.*

**Status:** 🔄 Processing... (Will auto-complete in 5 seconds)
```

### Issue Body (After Auto Complete - Closed Status)
```markdown
## 📝 Update Summary

### 🎯 Main Topics
- 🐛 Bug fixes

### 📁 File Type Analysis
- **TS**: 2 file(s)
- **CSS**: 1 file(s)

### 💡 Recommendations
- 🔍 Consider security testing
- 📋 Review access controls

**Commit:** `a1b2c3d`
**Author:** John Doe
**Date:** 8/22/2025, 6:47:49 PM

### 📋 Changes Made
fix critical bug in login system

### 📁 Files Modified
```
src/components/Login.tsx
src/styles/login.css
```

### 📊 Statistics
- **Additions:** +15 lines
- **Deletions:** -5 lines
- **Total Changes:** 20 lines
- **Files Changed:** 2 files

### 🔗 Related Links
- **Commit:** [a1b2c3d](https://github.com/user/repo/commit/a1b2c3d)
- **Branch:** `main`
- **Repository:** [user/repo](https://github.com/user/repo)

---
*This issue was automatically created by GitHub Actions on push to main branch.*

**Status:** ✅ Complete
```

### Labels Applied
```
bug, auto-generated, update, push
```

## 🔄 Auto Complete Process

### **Step 1: Issue Creation (Open)**
```markdown
**Status:** 🔄 Processing... (Will auto-complete in 5 seconds)
```

### **Step 2: Auto Complete (After 5 seconds)**
```markdown
**Status:** ✅ Complete
```

### **Complete Comment**
```markdown
## ✅ Issue Auto Complete

This issue has been automatically completed.

**Status:** Auto Complete ✅
**Triggered by:** Push to `main` branch
**Commit:** `a1b2c3d`
**Author:** John Doe
**Completion Time:** 8/22/2025, 6:47:54 PM

**Change Types Detected:** bugfix, frontend

**Reason:** Changes have been successfully processed and deployed.

---
*This comment was automatically added by GitHub Actions.*
```

## 🔄 Auto Close Process (For Existing Issues)

### Close Comment
```markdown
## ✅ Issue Auto Close Complete

This issue has been automatically closed due to a new push to the `main` branch.

**Status:** Auto Close Complete ✅
**Triggered by:** New push
**Commit:** `a1b2c3d`
**Author:** John Doe
**Date:** 8/22/2025, 6:47:49 PM

**Reason:** New update has been pushed, making this issue outdated.

**Change Types Detected:** bugfix, frontend

---
*This comment was automatically added by GitHub Actions.*
```

## 🎯 Best Practices

### 1. **Commit Message Convention**
```bash
# Gunakan kata kunci yang jelas
git commit -m "fix: resolve login authentication bug"
git commit -m "feat: add new user dashboard"
git commit -m "improve: enhance performance of data loading"
```

### 2. **File Naming**
```bash
# Gunakan nama file yang deskriptif
LoginComponent.tsx          # Deteksi: frontend
api-endpoints.js           # Deteksi: api
security-config.yaml       # Deteksi: security
```

### 3. **Branch Strategy**
```bash
# Workflow hanya trigger di main/master
main/                      # ✅ Auto issue creation
feature/new-dashboard/     # ❌ Tidak trigger
hotfix/security-fix/       # ❌ Tidak trigger
```

## 🚨 Troubleshooting

### Issue Tidak Terbuat
1. **Cek branch**: Pastikan push ke `main` atau `master`
2. **Cek paths-ignore**: File yang diubah tidak dalam ignore list
3. **Cek permissions**: Repository memiliki permissions yang cukup

### Label Tidak Tepat
1. **Cek commit message**: Gunakan kata kunci yang sesuai
2. **Cek file extension**: Pastikan ekstensi file dikenali
3. **Cek patterns**: Review regex patterns di workflow

### GitHub API Error
1. **Cek token**: Pastikan `GITHUB_TOKEN` valid
2. **Cek permissions**: Tambahkan permissions yang diperlukan
3. **Cek rate limit**: GitHub API memiliki rate limit

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub REST API](https://docs.github.com/en/rest)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Issue Labels](https://docs.github.com/en/issues/using-labels-and-milestones-to-track-work/managing-labels)

## 🤝 Contributing

Untuk menambah tipe perubahan baru:

1. **Update patterns** di fungsi `detectChangeType`
2. **Update labelMap** di fungsi `generateLabels`
3. **Update topics** di fungsi `generateComment`
4. **Update recommendations** sesuai kebutuhan
5. **Test** dengan commit message yang sesuai

---

**🎉 Sistem ini membuat manajemen issue menjadi otomatis dan cerdas!**
