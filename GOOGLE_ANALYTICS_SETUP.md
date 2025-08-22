# Setup Google Analytics untuk GitHub Pages

## Langkah-langkah Setup Google Analytics

### 1. Buat Google Analytics Account
1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Klik "Start measuring"
3. Masuk dengan akun Google Anda
4. Ikuti wizard setup untuk membuat property baru

### 2. Dapatkan Measurement ID
1. Setelah property dibuat, Anda akan mendapatkan Measurement ID
2. Format: `G-XXXXXXXXXX` (dimulai dengan G-)
3. Salin ID ini

### 3. Update Website
1. Buka file `src/app/layout.tsx`
2. Ganti `G-XXXXXXXXXX` dengan Measurement ID Anda yang sebenarnya
3. Contoh:
   ```tsx
   <GoogleAnalytics GA_MEASUREMENT_ID="G-ABC123DEF4" />
   ```

### 4. Deploy ke GitHub Pages
1. Commit dan push perubahan ke repository
2. GitHub Pages akan otomatis rebuild website
3. Tunggu beberapa menit untuk deployment selesai

### 5. Verifikasi Setup
1. Buka website Anda
2. Buka Developer Tools (F12)
3. Cek di tab Network apakah ada request ke `googletagmanager.com`
4. Di Google Analytics, cek Real-time reports untuk memastikan data masuk

## Fitur yang Tersedia

- **Page Views**: Melacak halaman yang dikunjungi
- **User Sessions**: Melacak sesi pengguna
- **Traffic Sources**: Dari mana pengunjung berasal
- **Device Information**: Device yang digunakan pengunjung
- **Geographic Data**: Lokasi pengunjung
- **Real-time Reports**: Data real-time

## Tips Tambahan

### Environment Variables (Opsional)
Untuk keamanan yang lebih baik, Anda bisa menggunakan environment variables:

1. Buat file `.env.local` di root project:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. Update `layout.tsx`:
   ```tsx
   <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'} />
   ```

### Custom Events (Opsional)
Anda bisa menambahkan custom events untuk tracking yang lebih detail:

```tsx
// Contoh tracking button click
const handleButtonClick = () => {
  gtag('event', 'button_click', {
    'event_category': 'engagement',
    'event_label': 'contact_button'
  });
};
```

## Troubleshooting

### Data tidak muncul di Google Analytics?
1. Pastikan Measurement ID benar
2. Tunggu 24-48 jam untuk data pertama muncul
3. Cek apakah ada ad blocker yang menghalangi tracking
4. Verifikasi website sudah di-deploy dengan benar

### Error di console?
1. Pastikan format Measurement ID benar (G-XXXXXXXXXX)
2. Cek apakah ada error di Network tab
3. Pastikan tidak ada conflict dengan script lain

## Privacy & GDPR

- Google Analytics menggunakan cookies untuk tracking
- Pertimbangkan untuk menambahkan cookie consent banner
- Sesuaikan dengan regulasi privacy di wilayah Anda
