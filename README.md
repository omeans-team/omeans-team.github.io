# Omeans Team - GitHub Pages

Website portfolio Omeans Team dengan video scrubber yang interaktif.

## 🚀 Quick Deploy ke GitHub Pages

### Opsi 1: Manual Deployment
```bash
# Build project
npm run export

# Upload semua file dari folder 'out/' ke GitHub repository
```

### Opsi 2: GitHub Actions (Recommended)
1. Push kode ke repository GitHub
2. GitHub Actions akan otomatis build dan deploy
3. Website akan tersedia di: `https://[username].github.io/[repository-name]/`

## 📁 Struktur Project

```
src/
├── app/
│   ├── page.tsx              # Home page (akan di-deploy)
│   ├── video-scrubber/       # Video scrubber page
│   ├── youtube-scrubber/     # YouTube scrubber page
│   └── youtube-scrubber-advanced/ # Advanced YouTube scrubber
├── globals.css
└── layout.tsx
```

## 🎯 Yang Akan Di-deploy

Hanya **Home page** (`/`) yang akan di-deploy ke GitHub Pages:
- ✅ Home page dengan video scrubber
- ✅ Navigation dan styling
- ✅ Responsive design
- ❌ Video scrubber pages (tidak di-deploy)
- ❌ YouTube scrubber pages (tidak di-deploy)

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run export

# Deploy script
./deploy.sh
```

## 📖 Dokumentasi

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Panduan lengkap deployment
- [VIDEO_SCRUBBER_README.md](./VIDEO_SCRUBBER_README.md) - Dokumentasi video scrubber
- [YOUTUBE_SCRUBBER_README.md](./YOUTUBE_SCRUBBER_README.md) - Dokumentasi YouTube scrubber

## 🌐 Live Demo

Setelah deploy, website akan tersedia di:
`https://[username].github.io/[repository-name]/`

## 📝 License

© 2024 Omeans Team. All rights reserved.
