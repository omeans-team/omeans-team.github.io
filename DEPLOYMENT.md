# GitHub Pages Deployment Guide

## Cara Deploy ke GitHub Pages

### 1. Build Project
```bash
npm run export
```

### 2. Upload ke GitHub Pages

#### Opsi A: Manual Upload
1. Buka repository GitHub Anda
2. Pergi ke Settings > Pages
3. Pilih "Deploy from a branch"
4. Pilih branch `main` dan folder `/ (root)`
5. Upload semua file dari folder `out/` ke root repository

#### Opsi B: GitHub Actions (Recommended)
1. Buat file `.github/workflows/deploy.yml` dengan konten berikut:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build project
      run: npm run export
    
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

### 3. Konfigurasi GitHub Pages
1. Buka repository GitHub Anda
2. Pergi ke Settings > Pages
3. Pilih "Deploy from a branch"
4. Pilih branch `gh-pages` (jika menggunakan GitHub Actions) atau `main`
5. Klik Save

## File yang Akan Di-deploy

Hanya file berikut yang akan di-deploy:
- `index.html` (Home page)
- `_next/` (Static assets)
- `.nojekyll` (Disable Jekyll)
- `favicon.ico`
- `public/` files

## Troubleshooting

### Jika halaman tidak muncul:
1. Pastikan file `.nojekyll` ada di root
2. Tunggu beberapa menit untuk GitHub Pages update
3. Cek Actions tab untuk error

### Jika assets tidak load:
1. Pastikan `next.config.ts` memiliki `output: 'export'`
2. Pastikan `trailingSlash: true` di config
3. Cek console browser untuk error

## URL Setelah Deploy

Setelah deploy berhasil, website akan tersedia di:
`https://[username].github.io/[repository-name]/` 