# 🔧 Fix Deployment Error - Permission Denied (403)

## Masalah
```
remote: Permission to omeans-team/omeans-team.github.io.git denied to github-actions[bot].
fatal: unable to access 'https://github.com/omeans-team/omeans-team.github.io.git/': The requested URL returned error: 403
```

## Penyebab
GitHub Actions tidak memiliki permission untuk push ke repository karena menggunakan workflow yang salah.

## Solusi Langkah Demi Langkah

### 1. Update Repository Settings
1. Buka repository GitHub: `https://github.com/omeans-team/omeans-team.github.io`
2. Klik tab **Settings**
3. Di sidebar kiri, klik **Pages**
4. Di bagian **Source**, pilih **"GitHub Actions"**
5. Klik **"Configure"** jika diminta
6. Pilih workflow **"Deploy to GitHub Pages"**

### 2. Pastikan Workflow Benar
File `.github/workflows/deploy.yml` sudah diupdate dengan konfigurasi yang benar:
- Menggunakan `actions/deploy-pages@v4` (bukan peaceiris)
- Memiliki permissions yang tepat
- Menggunakan GitHub Pages environment

### 3. Push Perubahan
```bash
git add .
git commit -m "Fix deployment workflow"
git push origin main
```

### 4. Monitor Deployment
1. Buka tab **Actions** di repository
2. Tunggu workflow **"Deploy to GitHub Pages"** selesai
3. Cek status deployment

### 5. Verifikasi Website
Setelah deployment berhasil, website akan tersedia di:
`https://omeans-team.github.io`

## Workflow yang Digunakan

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

## Troubleshooting

### Jika masih error:
1. Pastikan repository bersifat **Public**
2. Pastikan Anda memiliki akses **Admin** ke repository
3. Cek **Settings** > **Actions** > **General** > Pastikan "Allow GitHub Actions to create and approve pull requests" diaktifkan

### Jika website tidak muncul:
1. Tunggu 5-10 menit setelah deployment selesai
2. Cek URL: `https://omeans-team.github.io`
3. Pastikan tidak ada error di tab **Actions**
