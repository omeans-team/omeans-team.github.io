# Deployment Guide - GitHub Pages

## Langkah-langkah Deployment ke GitHub Pages

### 1. Buat Repository di GitHub

1. Buka [GitHub](https://github.com) dan login
2. Klik tombol "New repository" atau "New"
3. Beri nama repository: `omeans-team.github.io`
4. Pastikan repository bersifat **Public**
5. Jangan centang "Add a README file" (karena sudah ada)
6. Klik "Create repository"

### 2. Hubungkan Repository Lokal dengan GitHub

Setelah repository dibuat, GitHub akan menampilkan instruksi. Jalankan perintah berikut di terminal:

```bash
# Tambahkan remote repository
git remote add origin https://github.com/[USERNAME]/omeans-team.github.io.git

# Push ke branch main
git branch -M main
git push -u origin main
```

Ganti `[USERNAME]` dengan username GitHub Anda.

### 3. Konfigurasi GitHub Pages

1. Buka repository di GitHub
2. Klik tab "Settings"
3. Scroll ke bawah dan klik "Pages" di sidebar kiri
4. Di bagian "Source", pilih "GitHub Actions"
5. Klik "Configure" jika diminta

### 4. Deployment Otomatis

Setelah push pertama, GitHub Actions akan otomatis:
- Build project Next.js
- Deploy ke GitHub Pages
- Website akan tersedia di: `https://[USERNAME].github.io/omeans-team.github.io`

### 5. Update Website

Untuk update website di masa depan:
```bash
# Buat perubahan pada kode
# Commit perubahan
git add .
git commit -m "Update website content"

# Push ke GitHub
git push origin main
```

GitHub Actions akan otomatis rebuild dan deploy website.

## Troubleshooting

### Jika website tidak muncul:
1. Cek tab "Actions" di repository GitHub
2. Pastikan workflow berhasil dijalankan
3. Tunggu beberapa menit untuk deployment selesai

### Jika ada error build:
1. Cek log di GitHub Actions
2. Pastikan semua dependencies terinstall
3. Test build lokal dengan `npm run build`

## URL Website

Website akan tersedia di:
- **Production**: `https://[USERNAME].github.io/omeans-team.github.io`
- **Development**: `http://localhost:3000` (saat `npm run dev`) 