# 🔄 Auto Create Issue on Push

Fitur ini memungkinkan Anda untuk membuat issue otomatis di GitHub setiap kali melakukan push ke repository. Ini sangat berguna untuk tracking perubahan dan dokumentasi otomatis.

## 🚀 Cara Kerja

Ketika Anda melakukan push ke repository, sistem akan otomatis:
1. Mendeteksi push event
2. Mengumpulkan informasi commit (hash, message, author, files yang berubah)
3. Membuat issue baru dengan detail lengkap
4. Menambahkan label otomatis untuk kategorisasi

## 📋 Opsi Implementasi

### Opsi 1: GitHub Actions (Direkomendasikan) ⭐

**Keuntungan:**
- Otomatis penuh - tidak perlu setup manual
- Berjalan di cloud GitHub
- Tidak memerlukan token lokal
- Mudah dikonfigurasi

**Setup:**
1. File workflow sudah dibuat di `.github/workflows/auto-create-issue.yml`
2. Pastikan repository memiliki akses write untuk GitHub Actions
3. Push ke branch `main` atau `master` akan memicu pembuatan issue

**Konfigurasi:**
```yaml
# Di .github/workflows/auto-create-issue.yml
on:
  push:
    branches:
      - main
      - master
    paths-ignore:  # Skip file tertentu
      - '**.md'
      - '.github/**'
      - 'docs/**'
```

### Opsi 2: Local Script (Manual)

**Keuntungan:**
- Kontrol penuh atas kapan issue dibuat
- Bisa dikustomisasi sesuai kebutuhan
- Tidak memerlukan GitHub Actions

**Setup:**

#### Untuk Linux/Mac:
```bash
# 1. Buat script executable
chmod +x scripts/create-issue-on-push.sh

# 2. Set GitHub token
export GITHUB_TOKEN="your_github_token_here"

# 3. Jalankan setelah push
./scripts/create-issue-on-push.sh
```

#### Untuk Windows:
```batch
# 1. Set GitHub token
set GITHUB_TOKEN=your_github_token_here

# 2. Jalankan setelah push
scripts\create-issue-on-push.bat
```

## 🔧 Konfigurasi GitHub Token

### Membuat Personal Access Token:
1. Buka GitHub Settings → Developer settings → Personal access tokens
2. Klik "Generate new token (classic)"
3. Beri nama token (misal: "Auto Issue Creator")
4. Pilih scope: `repo` (untuk private repo) atau `public_repo` (untuk public repo)
5. Copy token yang dihasilkan

### Menggunakan Token:

#### Environment Variable:
```bash
# Linux/Mac
export GITHUB_TOKEN="ghp_your_token_here"

# Windows
set GITHUB_TOKEN=ghp_your_token_here
```

#### Atau pass sebagai argument:
```bash
./scripts/create-issue-on-push.sh ghp_your_token_here
```

## 📝 Format Issue yang Dibuat

Setiap issue akan memiliki format:

```markdown
## 📝 Update Summary

**Commit:** `abc1234`
**Author:** Your Name
**Date:** 2024-01-15 10:30:00

### 📋 Changes Made
Update homepage with new features

### 📁 Files Modified
```
src/app/page.tsx
src/components/Header.tsx
```

### 📊 Statistics
- **Additions:** +50 lines
- **Deletions:** -10 lines
- **Total Changes:** 60 lines

### 🔗 Related Links
- **Commit:** [abc1234](https://github.com/omeans-team/omeans-team.github.io/commit/abc1234)
- **Branch:** `main`
- **Repository:** [omeans-team/omeans-team.github.io](https://github.com/omeans-team/omeans-team.github.io)

---
*This issue was automatically created by GitHub Actions on push to main branch.*
```

## 🏷️ Label Otomatis

Issue akan otomatis diberi label:
- `auto-generated` - Menandakan issue dibuat otomatis
- `update` - Menandakan ini adalah update
- `push` - Menandakan dipicu oleh push

## ⚙️ Kustomisasi

### Mengubah Format Issue

Edit file `.github/workflows/auto-create-issue.yml` bagian `issueBody`:

```javascript
const issueBody = 'Custom format here...';
```

### Mengubah Label

Edit bagian `labels`:

```javascript
labels: ['custom-label-1', 'custom-label-2']
```

### Mengubah Trigger

Edit bagian `on.push`:

```yaml
on:
  push:
    branches:
      - main
      - develop  # Tambah branch lain
    paths:  # Atau gunakan paths untuk file tertentu
      - 'src/**'
      - 'components/**'
```

## 🚨 Troubleshooting

### Issue tidak terbuat otomatis:
1. **GitHub Actions:** Cek tab Actions di repository
2. **Local Script:** Pastikan token valid dan ada permission
3. **Branch:** Pastikan push ke branch yang dikonfigurasi

### Error "Permission denied":
1. Pastikan token memiliki scope yang benar
2. Untuk private repo, gunakan scope `repo`
3. Untuk public repo, gunakan scope `public_repo`

### Error "Not found":
1. Pastikan nama repository benar
2. Pastikan token memiliki akses ke repository

## 📊 Monitoring

### GitHub Actions:
- Cek tab Actions di repository
- Lihat log untuk debugging
- Monitor workflow runs

### Local Script:
- Cek output terminal
- Lihat file `temp_response.json` (Windows) untuk detail error

## 🔒 Keamanan

- **Token:** Jangan share token ke publik
- **Environment Variables:** Gunakan environment variables untuk token
- **Repository Access:** Batasi token hanya untuk repository yang diperlukan
- **Scope:** Gunakan scope minimal yang diperlukan

## 📚 Referensi

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub API Documentation](https://docs.github.com/en/rest)
- [Personal Access Tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

---

**Happy Coding! 🚀**
