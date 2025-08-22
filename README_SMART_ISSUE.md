# 🧠 Smart Auto Issue Management

Sistem canggih untuk mengelola issue otomatis dengan fitur AI-powered detection dan smart labeling berdasarkan tipe perubahan, auto-assign, dan komentar kontekstual.

## 🚀 Fitur Utama

### ✨ **Smart Detection**
- **Auto-detect change types** berdasarkan ekstensi file dan commit message
- **Intelligent labeling** berdasarkan tipe perubahan yang terdeteksi
- **Context-aware comments** dengan rekomendasi spesifik

### 👤 **Auto Assignment**
- **Auto-assign** issue kepada user yang melakukan push
- **Smart user detection** berdasarkan commit author

### 🏷️ **Smart Labeling**
Sistem akan otomatis menambahkan label berdasarkan tipe perubahan:

| Tipe Perubahan | Label | Deteksi |
|----------------|-------|---------|
| Frontend | `frontend` | `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.html`, `.vue` |
| Backend | `backend` | `.py`, `.java`, `.cpp`, `.php`, `.go`, `.rb` |
| Database | `database` | `.sql`, `.db`, `.sqlite` |
| Configuration | `configuration` | `.json`, `.yaml`, `.yml`, `.toml` |
| Documentation | `documentation` | `.md`, `.txt`, `.rst` |
| Assets | `assets` | `.png`, `.jpg`, `.svg`, `.mp4`, `.pdf` |
| Security | `security` | `security`, `auth`, `password`, `token` |
| Performance | `performance` | `performance`, `optimization`, `cache` |
| Bug Fix | `bug` | `fix`, `bug`, `error`, `issue` |
| Feature | `enhancement` | `feature`, `add`, `new`, `implement` |
| Refactor | `refactor` | `refactor`, `cleanup`, `restructure` |
| Testing | `testing` | `test`, `spec`, `unit`, `integration` |

### 💬 **Smart Comments**
Komentar otomatis dengan:
- **Topic analysis** berdasarkan tipe perubahan
- **File type analysis** dengan statistik
- **Recommendations** spesifik untuk setiap tipe perubahan
- **Status tracking** dengan "Auto Close Complete"

## 📋 Opsi Implementasi

### Opsi 1: GitHub Actions (Direkomendasikan) ⭐

**File:** `.github/workflows/auto-create-issue.yml`

**Fitur:**
- ✅ Smart change type detection
- ✅ Auto-assign berdasarkan user push
- ✅ Intelligent labeling
- ✅ Context-aware comments
- ✅ Auto close dengan status tracking

### Opsi 2: Local Script (Manual)

**File:** `scripts/smart-create-issue.sh`

**Fitur:**
- ✅ Semua fitur GitHub Actions
- ✅ Kontrol penuh atas kapan dijalankan
- ✅ Kustomisasi lanjutan

## 🔧 Cara Menggunakan

### GitHub Actions (Otomatis)
```bash
# Langsung push dan sistem akan otomatis:
# 1. Detect change types
# 2. Close existing issues dengan status
# 3. Create new issue dengan smart features
git add .
git commit -m "Add security authentication feature"
git push origin main
```

### Local Script (Manual)
```bash
# Set token
export GITHUB_TOKEN="your_github_token_here"

# Jalankan smart issue management
npm run smart-issue
```

## 📝 Format Issue yang Dibuat

### Issue Baru:
```markdown
## 📝 Update Summary

### 🎯 Main Topics
- 🔒 Security improvements
- ⚙️ Backend changes

### 📁 File Type Analysis
- **JS**: 3 file(s)
- **TS**: 2 file(s)
- **JSON**: 1 file(s)

### 💡 Recommendations
- 🔍 Consider security testing
- 📋 Review access controls

**Commit:** `abc1234`
**Author:** Your Name
**Date:** 2024-01-15 10:30:00

### 📋 Changes Made
Add security authentication feature

### 📁 Files Modified
```
src/auth/login.js
src/auth/security.ts
config/auth.json
```

### 📊 Statistics
- **Additions:** +150 lines
- **Deletions:** -20 lines
- **Total Changes:** 170 lines
- **Files Changed:** 3 files

### 🔗 Related Links
- **Commit:** [abc1234](https://github.com/...)
- **Repository:** [omeans-team/omeans-team.github.io](https://github.com/...)

---
*This issue was automatically created by GitHub Actions on push to main branch.*
```

### Komentar Penutupan:
```markdown
## ✅ Issue Auto Close Complete

This issue has been automatically closed due to a new push to the `main` branch.

**Status:** Auto Close Complete ✅
**Triggered by:** New push
**Commit:** `def5678`
**Author:** Your Name
**Date:** 2024-01-15 11:00:00

**Reason:** New update has been pushed, making this issue outdated.

**Change Types Detected:** security, backend, feature

---
*This comment was automatically added by GitHub Actions.*
```

## 🎯 Deteksi Tipe Perubahan

### Berdasarkan Ekstensi File:
- **Frontend:** `.js`, `.jsx`, `.ts`, `.tsx`, `.css`, `.scss`, `.html`, `.vue`, `.svelte`
- **Backend:** `.py`, `.java`, `.cpp`, `.c`, `.cs`, `.php`, `.rb`, `.go`, `.rs`, `.swift`, `.kt`
- **Database:** `.sql`, `.db`, `.sqlite`, `.mdb`
- **Config:** `.json`, `.yaml`, `.yml`, `.toml`, `.ini`, `.conf`, `.config`
- **Docs:** `.md`, `.txt`, `.rst`, `.adoc`
- **Assets:** `.png`, `.jpg`, `.jpeg`, `.gif`, `.svg`, `.ico`, `.mp4`, `.mp3`, `.pdf`

### Berdasarkan Commit Message:
- **Security:** `security`, `auth`, `password`, `token`, `key`, `secret`
- **Performance:** `performance`, `optimization`, `cache`, `speed`
- **Bug Fix:** `fix`, `bug`, `error`, `issue`, `problem`
- **Feature:** `feature`, `add`, `new`, `implement`
- **Refactor:** `refactor`, `cleanup`, `restructure`
- **Testing:** `test`, `spec`, `unit`, `integration`

## ⚙️ NPM Scripts

```bash
npm run smart-issue          # Jalankan smart issue management
npm run create-issue         # Buat issue manual (basic)
npm run close-issues         # Tutup issue manual
npm run test-issue           # Test pembuatan issue
npm run test-close           # Test penutupan issue
```

## 🔍 Monitoring

### GitHub Actions:
- Cek tab Actions di repository
- Lihat log untuk debugging
- Monitor workflow runs

### Local Script:
- Cek output terminal
- Lihat response dari GitHub API

## 🚨 Troubleshooting

### Issue tidak terbuat dengan label yang benar:
1. Pastikan commit message mengandung kata kunci yang sesuai
2. Pastikan file yang diubah memiliki ekstensi yang dikenali
3. Cek log untuk melihat tipe perubahan yang terdeteksi

### Auto-assign tidak berfungsi:
1. Pastikan username GitHub sama dengan commit author
2. Pastikan user memiliki akses ke repository

### Label tidak muncul:
1. Pastikan label sudah dibuat di repository
2. Cek permission untuk membuat label

## 📊 Workflow Lengkap

### Sebelum Push:
```
Issue #1: 🔄 Update: Add homepage features (OPEN)
Issue #2: 🔄 Update: Fix navigation bug (OPEN)
```

### Setelah Push dengan Smart Features:
```
Issue #1: 🔄 Update: Add homepage features (CLOSED) + komentar dengan status
Issue #2: 🔄 Update: Fix navigation bug (CLOSED) + komentar dengan status
Issue #3: 🔄 Update: Add security auth (OPEN) ← Issue baru dengan:
  - Labels: auto-generated, update, push, security, backend, enhancement
  - Assigned to: user yang push
  - Smart comment dengan rekomendasi
```

## 🔒 Keamanan

- **Token:** Jangan share token ke publik
- **Environment Variables:** Gunakan environment variables untuk token
- **Repository Access:** Batasi token hanya untuk repository yang diperlukan
- **Scope:** Gunakan scope minimal yang diperlukan

## 📚 Referensi

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Issues API](https://docs.github.com/en/rest/issues/issues)

## 🎯 Keuntungan

1. **Intelligent Detection** - Otomatis mendeteksi tipe perubahan
2. **Smart Labeling** - Label yang relevan dan akurat
3. **Auto Assignment** - Tidak perlu assign manual
4. **Context-Aware Comments** - Komentar yang informatif dan actionable
5. **Status Tracking** - Tracking lengkap dengan status
6. **Recommendations** - Rekomendasi spesifik untuk setiap perubahan
7. **Efficiency** - Menghemat waktu dan effort manual

---

**Happy Smart Coding! 🧠🚀**
