# 🚀 Integrasi GitHub untuk Website Omeans Team

Fitur ini mengintegrasikan data statistik website dengan GitHub API untuk menampilkan data yang real-time dan akurat dari repository GitHub.

## ✨ Fitur yang Tersedia

### 📊 Statistik Real-time
- **Repositories**: Jumlah repository yang dimiliki
- **Git Commits**: Total commit yang telah dibuat
- **Code Lines**: Estimasi jumlah baris kode
- **GitHub Stars**: Total bintang yang diterima

### 📋 Informasi Repository
- Daftar repository terbaru
- Deskripsi repository
- Bahasa pemrograman yang digunakan
- Jumlah bintang per repository
- Tanggal update terakhir

## 🛠️ Cara Setup

### 1. Buat GitHub Personal Access Token

1. Buka [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. Klik "Generate new token (classic)"
3. Beri nama token (misal: "Website Stats")
4. Pilih scope yang diperlukan:
   - `public_repo` (untuk repository publik)
   - `repo` (untuk repository private)
5. Klik "Generate token"
6. Copy token yang dihasilkan

### 2. Konfigurasi Environment Variables

1. Copy file `env.example` menjadi `.env.local`
2. Edit file `.env.local` dan isi dengan data Anda:

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=your_github_username
```

### 3. Restart Development Server

```bash
npm run dev
```

## 📁 Struktur File

```
src/
├── app/
│   └── api/
│       └── github-stats/
│           └── route.ts          # API route untuk GitHub stats
├── components/
│   ├── GitHubStats.tsx           # Komponen statistik utama
│   ├── GitHubInfo.tsx            # Komponen info repository
│   └── LoadingSpinner.tsx        # Komponen loading
└── hooks/
    └── useGitHubStats.ts         # Custom hook untuk data GitHub
```

## 🔧 Cara Kerja

### API Route (`/api/github-stats`)
- Mengambil data dari GitHub API
- Menghitung statistik total dari semua repository
- Mengembalikan data dalam format JSON
- Memiliki fallback data jika API gagal

### Custom Hook (`useGitHubStats`)
- Mengelola state loading, error, dan data
- Memanggil API route
- Menyediakan fungsi refetch untuk refresh data

### Components
- **GitHubStats**: Menampilkan statistik dengan animasi loading
- **GitHubInfo**: Menampilkan repository terbaru
- **LoadingSpinner**: Loading spinner yang menarik

## 📊 Struktur Data

```typescript
interface GitHubStats {
  totalRepos: number;    // Jumlah repository
  totalCommits: number;  // Total commit
  totalLines: number;    // Estimasi baris kode
  totalStars: number;    // Total bintang
}
```

## ⚡ Rate Limiting

GitHub API memiliki rate limit:
- **Unauthenticated**: 60 requests/hour
- **Authenticated**: 5,000 requests/hour

Untuk menghindari rate limiting, sistem menggunakan:
- Caching data
- Fallback data jika API gagal
- Error handling yang graceful

## 🎨 Customization

### Mengubah Username
Edit `.env.local`:
```env
GITHUB_USERNAME=username_baru
```

### Menambah Statistik Baru
1. Edit `src/app/api/github-stats/route.ts`
2. Tambah logika untuk mengambil data baru
3. Update interface `GitHubStats`
4. Edit `src/components/GitHubStats.tsx` untuk menampilkan data baru

### Styling
Edit CSS di `src/app/globals.css` untuk mengubah tampilan:
```css
.stats-card {
  /* Custom styling */
}
```

## 🚨 Troubleshooting

### Error "Failed to fetch GitHub stats"
- Pastikan `GITHUB_TOKEN` sudah benar
- Cek apakah token masih valid
- Pastikan username GitHub benar

### Data tidak muncul
- Cek console browser untuk error
- Pastikan API route berjalan di `/api/github-stats`
- Coba refresh halaman

### Rate limit exceeded
- Tunggu beberapa menit
- Gunakan token dengan scope yang lebih spesifik
- Pertimbangkan menggunakan GitHub App untuk production

## 🔒 Security Notes

- Jangan commit `.env.local` ke repository
- Gunakan token dengan scope minimal yang diperlukan
- Rotate token secara berkala
- Monitor penggunaan API

## 🚀 Production Deployment

Untuk deployment ke production:

1. Set environment variables di hosting platform
2. Pastikan domain sudah di-whitelist di GitHub (jika diperlukan)
3. Monitor rate limiting
4. Pertimbangkan menggunakan caching layer

## 📝 Contoh Penggunaan

```tsx
import GitHubStats from '../components/GitHubStats';
import GitHubInfo from '../components/GitHubInfo';

function MyPage() {
  return (
    <div>
      <GitHubStats />
      <GitHubInfo username="omeans-team" />
    </div>
  );
}
```

## 🤝 Contributing

Untuk berkontribusi pada fitur ini:

1. Fork repository
2. Buat branch baru
3. Implementasi fitur
4. Test dengan GitHub API
5. Submit pull request

## 📄 License

Fitur ini menggunakan GitHub API dan mengikuti [GitHub API Terms of Service](https://docs.github.com/en/rest/overview/terms-of-service).
