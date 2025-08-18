# Omeans Team - Portfolio Website

A modern, interactive portfolio website featuring an immersive video scrubber experience with cinematic scroll effects.

## ✨ Features

- 🎥 **Interactive Video Scrubber** - Video responds to scroll with cinematic effects
- 🎨 **Modern Design** - Clean, professional portfolio layout
- 📱 **Responsive** - Optimized for all devices
- ⚡ **Performance Optimized** - Fast loading with efficient caching
- ♿ **Accessible** - WCAG compliant with proper ARIA labels

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone repository
git clone https://github.com/omeans-team/omeans-team.github.io.git
cd omeans-team.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build & Deploy
```bash
# Build for production
npm run build

# Export static files
npm run export

# Deploy to GitHub Pages
# Upload contents of 'out/' folder to your repository
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main home page with video scrubber
│   ├── layout.tsx            # Root layout with preload
│   ├── globals.css           # Global styles and animations
│   └── page.module.css       # Component-specific styles
├── public/
│   └── video-scrubber/       # Video assets
├── next.config.ts            # Next.js configuration
└── package.json
```

## 🎯 Current Features

### Home Page (`/`)
- ✅ **Interactive Video Scrubber** - Video responds to scroll with real-time transformations
- ✅ **Cinematic Text Animations** - Progressive story text that appears during scroll
- ✅ **Black Hole Effect** - Dynamic circular fade effect that grows with scroll
- ✅ **Particle System** - Floating particles with smooth animations
- ✅ **Responsive Navigation** - Mobile-first navigation with hamburger menu
- ✅ **Team Section** - Member profiles with avatars and descriptions
- ✅ **Services Showcase** - Feature highlights and capabilities
- ✅ **Contact Information** - Social media links and contact details

### Performance Optimizations
- ✅ **Efficient DOM Structure** - Reduced from 209 to ~150 elements
- ✅ **Optimized Video Loading** - Preload and efficient video handling
- ✅ **Proper Cache Headers** - .htaccess configuration for static assets
- ✅ **Hydration-Safe Components** - SSR/CSR consistency with useHydrated hook
- ✅ **Mobile-First Design** - Responsive across all device sizes

## 🛠️ Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run export       # Export static files
npm run lint         # Run ESLint
```

### Key Technologies
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Hooks** - State management and effects

## 🎥 Video Scrubber Features

### Scroll Timeline
- **0-10%**: "Welcome to Omeans Engine…"
- **10-20%**: "…where innovation meets creativity."
- **20-30%**: "We build the future of development tools."
- **30-40%**: "Powerful, accessible, and"
- **40-50%**: "built for developers."
- **50-60%**: "Experience the next generation of 3D creation."
- **60%+**: Text disappears, video fully transformed

### Video Transformations
- **Scale**: 1.0 → 0.6 (reduces size)
- **Blur**: 0px → 15px (increases blur)
- **Rotation**: 0° → 20° (3D rotation)
- **Position**: Moves down and back in 3D space
- **Perspective**: Creates depth effect

## 🌐 Live Demo

Website: `https://omeans-team.github.io/`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

© 2024 Omeans Team. All rights reserved.

---

**Built with ❤️ by Omeans Team**
