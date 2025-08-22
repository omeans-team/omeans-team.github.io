# Google Analytics Integration untuk Omeans Team Website

## 🎯 Overview

Website Omeans Team sudah terintegrasi dengan Google Analytics 4 (GA4) untuk melacak traffic dan interaksi pengguna. Fitur ini membantu memahami perilaku pengunjung dan mengoptimalkan website.

## 📊 Fitur yang Tersedia

### 1. **Automatic Page Tracking**
- Setiap halaman yang dikunjungi otomatis ter-track
- Data real-time tersedia di Google Analytics dashboard

### 2. **Custom Event Tracking**
- **Form Submissions**: Contact form submissions
- **Button Clicks**: Send message button
- **External Links**: Demo dan GitHub repository links
- **User Interactions**: Filter dan navigasi

### 3. **Data yang Dilacak**
- Page views dan session duration
- Traffic sources (Google, social media, direct)
- Device information (desktop, mobile, tablet)
- Geographic location
- User behavior flow

## 🚀 Cara Setup

### Langkah 1: Buat Google Analytics Account
1. Kunjungi [Google Analytics](https://analytics.google.com/)
2. Klik "Start measuring"
3. Masuk dengan akun Google
4. Buat property baru untuk website Anda

### Langkah 2: Dapatkan Measurement ID
1. Setelah property dibuat, dapatkan Measurement ID
2. Format: `G-XXXXXXXXXX` (dimulai dengan G-)
3. Contoh: `G-ABC123DEF4`

### Langkah 3: Update Website
1. Buka file `src/app/layout.tsx`
2. Ganti `G-XXXXXXXXXX` dengan Measurement ID Anda:

```tsx
<GoogleAnalytics GA_MEASUREMENT_ID="G-ABC123DEF4" />
```

### Langkah 4: Deploy
1. Commit dan push perubahan
2. GitHub Pages akan otomatis rebuild
3. Tunggu beberapa menit untuk deployment selesai

## 📈 Cara Menggunakan

### 1. **Melihat Data Real-time**
1. Buka [Google Analytics](https://analytics.google.com/)
2. Pilih property website Anda
3. Klik "Reports" → "Realtime" → "Overview"
4. Data akan muncul dalam 24-48 jam

### 2. **Melihat Reports**
- **Audience**: Demografi pengunjung
- **Acquisition**: Sumber traffic
- **Behavior**: Halaman yang paling sering dikunjungi
- **Conversions**: Goals dan events

### 3. **Custom Events yang Sudah Di-track**

#### Contact Form
```tsx
// Form submission tracking
trackFormSubmission('contact_form');

// Button click tracking
trackButtonClick('send_message', 'contact_form');
```

#### Project Links
```tsx
// External link tracking
trackExternalLink('https://github.com/omeans-team/project');
trackExternalLink('https://demo.omeans.com');
```

## 🔧 Customization

### Menambahkan Event Tracking Baru

#### 1. Import Hook
```tsx
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
```

#### 2. Gunakan dalam Component
```tsx
const { trackEvent, trackButtonClick } = useGoogleAnalytics();

// Custom event
trackEvent('video_play', 'engagement', 'hero_video');

// Button click
trackButtonClick('download_resume', 'header');
```

#### 3. Available Functions
```tsx
// Basic event tracking
trackEvent(action, category, label?, value?);

// Page view tracking
trackPageView('/about');

// Button click tracking
trackButtonClick(buttonName, location?);

// Form submission tracking
trackFormSubmission(formName);

// Download tracking
trackDownload(fileName);

// External link tracking
trackExternalLink(url);
```

### Environment Variables (Opsional)

Untuk keamanan yang lebih baik:

1. Buat file `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123DEF4
```

2. Update `layout.tsx`:
```tsx
<GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX'} />
```

## 📱 Mobile Tracking

Google Analytics otomatis melacak:
- Device type (mobile, desktop, tablet)
- Operating system
- Browser information
- Screen resolution

## 🌍 International Tracking

Data yang dilacak:
- Country/region
- City
- Language preference
- Time zone

## 🔒 Privacy & GDPR

### Cookie Consent
Website menggunakan cookies untuk tracking. Pertimbangkan untuk menambahkan cookie consent banner:

```tsx
// Contoh cookie consent
const [cookieConsent, setCookieConsent] = useState(false);

// Hanya track jika user consent
{cookieConsent && <GoogleAnalytics GA_MEASUREMENT_ID="G-XXXXXXXXXX" />}
```

### Data Retention
- Google Analytics menyimpan data selama 26 bulan (default)
- Bisa diatur di Google Analytics settings

## 🛠️ Troubleshooting

### Data tidak muncul?
1. **Pastikan Measurement ID benar**
2. **Tunggu 24-48 jam** untuk data pertama
3. **Cek ad blocker** - mungkin memblokir tracking
4. **Verifikasi deployment** - pastikan website sudah update

### Error di console?
1. **Format Measurement ID** - harus G-XXXXXXXXXX
2. **Network errors** - cek tab Network di DevTools
3. **Script conflicts** - pastikan tidak ada conflict

### Real-time data tidak muncul?
1. **Buka website** di browser
2. **Refresh halaman** beberapa kali
3. **Cek Real-time reports** di Google Analytics
4. **Pastikan tidak ada ad blocker**

## 📊 Metrics yang Berguna

### Traffic Metrics
- **Users**: Jumlah pengunjung unik
- **Sessions**: Jumlah sesi
- **Page Views**: Jumlah halaman yang dilihat
- **Bounce Rate**: Persentase user yang langsung keluar

### Engagement Metrics
- **Session Duration**: Rata-rata waktu di website
- **Pages per Session**: Rata-rata halaman per sesi
- **Event Count**: Jumlah interaksi

### Conversion Metrics
- **Contact Form Submissions**: Berapa yang mengisi form
- **External Link Clicks**: Berapa yang klik link demo/GitHub
- **Button Interactions**: Engagement dengan CTA

## 🎯 Best Practices

### 1. **Regular Monitoring**
- Cek data setiap minggu
- Monitor trends dan patterns
- Identifikasi halaman yang performa baik/buruk

### 2. **Goal Setting**
- Set up goals di Google Analytics
- Track conversion rates
- Monitor user journey

### 3. **A/B Testing**
- Test different CTAs
- Monitor button placement
- Optimize based on data

### 4. **Content Optimization**
- Identifikasi konten yang populer
- Optimize halaman yang bounce rate tinggi
- Improve user experience

## 📞 Support

Jika ada masalah dengan Google Analytics:

1. **Cek dokumentasi Google Analytics**
2. **Verifikasi setup** sesuai panduan ini
3. **Test di browser incognito** (tanpa ad blocker)
4. **Hubungi tim development** jika masih bermasalah

---

**Note**: Google Analytics membutuhkan waktu 24-48 jam untuk menampilkan data lengkap. Real-time data tersedia segera setelah setup.
