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
1. File `.github/workflows/deploy.yml` sudah dibuat dengan konfigurasi yang benar
2. Pastikan repository settings sudah dikonfigurasi dengan benar:

**Konfigurasi Repository Settings:**
1. Buka repository GitHub Anda
2. Pergi ke **Settings** > **Pages**
3. Di bagian **Source**, pilih **"GitHub Actions"**
4. Klik **"Configure"** jika diminta
5. Pilih workflow **"Deploy to GitHub Pages"**

**Workflow yang digunakan:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
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
    
    - name: Build project
      run: npm run export
    
    - name: Setup Pages
      uses: actions/configure-pages@v4
    
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build-and-deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
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

### Error Permission Denied (403):
**Penyebab:** GitHub Actions tidak memiliki permission untuk push ke repository
**Solusi:**
1. Pastikan repository settings menggunakan **"GitHub Actions"** sebagai source
2. Buka **Settings** > **Pages** > Pilih **"GitHub Actions"**
3. Pastikan workflow menggunakan `actions/deploy-pages@v4` (bukan peaceiris)

### Jika halaman tidak muncul:
1. Pastikan file `.nojekyll` ada di root
2. Tunggu beberapa menit untuk GitHub Pages update
3. Cek Actions tab untuk error
4. Pastikan repository bersifat **Public**

### Jika assets tidak load:
1. Pastikan `next.config.ts` memiliki `output: 'export'`
2. Pastikan `trailingSlash: true` di config
3. Cek console browser untuk error

### Jika workflow gagal:
1. Cek tab **Actions** di repository
2. Pastikan Node.js version 18+ digunakan
3. Pastikan semua dependencies terinstall dengan benar

## URL Setelah Deploy

Setelah deploy berhasil, website akan tersedia di:
`https://[username].github.io/[repository-name]/` 