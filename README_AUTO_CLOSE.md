# 🔒 Auto Close Issues on Push

Fitur ini melengkapi sistem auto-create issue dengan kemampuan untuk menutup issue otomatis ketika ada push baru. Ini memastikan bahwa hanya ada satu issue aktif yang merepresentasikan update terbaru.

## 🚀 Cara Kerja

Ketika Anda melakukan push ke repository, sistem akan otomatis:
1. **Menutup issue lama** - Semua issue auto-generated yang sudah ada akan ditutup
2. **Membuat issue baru** - Issue baru dibuat untuk update terbaru
3. **Menambahkan komentar** - Setiap issue yang ditutup akan mendapat komentar penjelasan

## 📋 Opsi Implementasi

### Opsi 1: GitHub Actions (Direkomendasikan) ⭐

**File:** `.github/workflows/auto-create-issue.yml` (sudah diupdate)

**Cara kerja:**
- Otomatis menutup issue lama sebelum membuat yang baru
- Berjalan di cloud GitHub
- Tidak memerlukan token lokal
- Menambahkan komentar penjelasan di setiap issue yang ditutup

**Workflow steps:**
1. **Close Previous Issues** - Menutup semua issue auto-generated yang terbuka
2. **Create New Issue** - Membuat issue baru untuk update terbaru

### Opsi 2: Local Script (Manual)

**Files:**
- `scripts/close-issues-on-push.sh` (Linux/Mac)
- `scripts/close-issues-on-push.bat` (Windows)

**Cara kerja:**
- Jalankan script untuk menutup issue manual
- Kontrol penuh atas kapan issue ditutup
- Bisa dikustomisasi sesuai kebutuhan

## 🔧 Cara Menggunakan

### GitHub Actions (Otomatis)
```bash
# Langsung push dan sistem akan otomatis:
# 1. Menutup issue lama
# 2. Membuat issue baru
git add .
git commit -m "Update homepage with new features"
git push origin main
```

### Local Script (Manual)
```bash
# Set token (sudah diset)
export GITHUB_TOKEN="your_github_token_here"

# Menutup issue manual
npm run close-issues

# Atau test
npm run test-close
```

### Windows
```batch
# Set token
set GITHUB_TOKEN=your_github_token_here

# Menutup issue manual
npm run close-issues-win

# Atau test
npm run test-close-win
```

## 📝 Format Komentar Penutupan

Setiap issue yang ditutup akan mendapat komentar:

```markdown
## ✅ Issue Closed Automatically

This issue has been automatically closed due to a new push to the `main` branch.

**Commit:** `abc1234`
**Author:** Your Name
**Date:** 2024-01-15 10:30:00

**Reason:** New update has been pushed, making this issue outdated.

---
*This comment was automatically added by GitHub Actions.*
```

## 🏷️ Label yang Diproses

Sistem hanya akan menutup issue dengan label:
- `auto-generated` - Menandakan issue dibuat otomatis

## ⚙️ NPM Scripts

### Linux/Mac:
```bash
npm run close-issues          # Menutup issue auto-generated
npm run test-close           # Test penutupan issue
```

### Windows:
```bash
npm run close-issues-win     # Menutup issue auto-generated
npm run test-close-win       # Test penutupan issue
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

### Issue tidak tertutup otomatis:
1. **GitHub Actions:** Cek tab Actions di repository
2. **Local Script:** Pastikan token valid dan ada permission
3. **Label:** Pastikan issue memiliki label `auto-generated`

### Error "Permission denied":
1. Pastikan token memiliki scope yang benar
2. Untuk private repo, gunakan scope `repo`
3. Untuk public repo, gunakan scope `public_repo`

### Error "Not found":
1. Pastikan nama repository benar
2. Pastikan token memiliki akses ke repository

## 📊 Workflow Lengkap

### Sebelum Push:
```
Issue #1: 🔄 Update: Add homepage features (OPEN)
Issue #2: 🔄 Update: Fix navigation bug (OPEN)
```

### Setelah Push:
```
Issue #1: 🔄 Update: Add homepage features (CLOSED) + komentar
Issue #2: 🔄 Update: Fix navigation bug (CLOSED) + komentar
Issue #3: 🔄 Update: Add auto-close feature (OPEN) ← Issue baru
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

1. **Kebersihan Repository** - Hanya ada satu issue aktif
2. **Tracking Terbaru** - Selalu merepresentasikan update terbaru
3. **Dokumentasi Otomatis** - Setiap penutupan terdokumentasi
4. **Konsistensi** - Format yang seragam untuk semua issue
5. **Efisiensi** - Tidak perlu menutup manual

---

**Happy Coding! 🚀**
