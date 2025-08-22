# Contoh Penggunaan Google Analytics di Komponen

## 📋 Daftar Komponen yang Sudah Di-track

### 1. **ContactSection** ✅
- Form submission tracking
- Button click tracking

### 2. **ProjectsSection** ✅
- External link tracking (Demo & GitHub)
- Project interaction tracking

### 3. **SkillsSection** ✅
- Filter interaction tracking
- Category & proficiency filter tracking

## 🔧 Contoh Implementasi di Komponen Lain

### 1. **VideoHeroSection** - Video Play Tracking

```tsx
"use client";

import React, { useState, useRef } from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const VideoHeroSection: React.FC = () => {
  const { trackEvent } = useGoogleAnalytics();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    trackEvent('video_play', 'engagement', 'hero_video');
  };

  const handlePause = () => {
    setIsPlaying(false);
    trackEvent('video_pause', 'engagement', 'hero_video');
  };

  const handleEnded = () => {
    trackEvent('video_complete', 'engagement', 'hero_video');
  };

  return (
    <video
      ref={videoRef}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      // ... other props
    >
      {/* video content */}
    </video>
  );
};
```

### 2. **GitHubProfileCard** - Profile Interaction Tracking

```tsx
"use client";

import React from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const GitHubProfileCard: React.FC = () => {
  const { trackButtonClick, trackExternalLink } = useGoogleAnalytics();

  const handleProfileClick = () => {
    trackButtonClick('view_profile', 'github_card');
  };

  const handleRepoClick = (repoName: string) => {
    trackButtonClick('view_repo', 'github_card');
    trackEvent('repo_click', 'engagement', repoName);
  };

  const handleFollowClick = () => {
    trackButtonClick('follow_user', 'github_card');
  };

  return (
    <div onClick={handleProfileClick}>
      {/* Profile content */}
      <button onClick={handleFollowClick}>Follow</button>
      <a 
        href="https://github.com/username/repo"
        onClick={() => handleRepoClick('repo-name')}
      >
        View Repository
      </a>
    </div>
  );
};
```

### 3. **ServicesSection** - Service Interest Tracking

```tsx
"use client";

import React from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const ServicesSection: React.FC = () => {
  const { trackEvent, trackButtonClick } = useGoogleAnalytics();

  const handleServiceClick = (serviceName: string) => {
    trackEvent('service_click', 'engagement', serviceName);
  };

  const handleContactClick = (serviceName: string) => {
    trackButtonClick('contact_service', 'services');
    trackEvent('service_contact', 'conversion', serviceName);
  };

  return (
    <div>
      {services.map(service => (
        <div 
          key={service.id}
          onClick={() => handleServiceClick(service.name)}
        >
          <h3>{service.name}</h3>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleContactClick(service.name);
            }}
          >
            Get Quote
          </button>
        </div>
      ))}
    </div>
  );
};
```

### 4. **FooterSection** - Social Media Tracking

```tsx
"use client";

import React from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const FooterSection: React.FC = () => {
  const { trackExternalLink, trackButtonClick } = useGoogleAnalytics();

  const handleSocialClick = (platform: string) => {
    trackExternalLink(`https://${platform}.com/username`);
    trackEvent('social_click', 'engagement', platform);
  };

  const handleNewsletterSignup = () => {
    trackEvent('newsletter_signup', 'conversion', 'footer');
  };

  return (
    <footer>
      <div className="social-links">
        <a 
          href="https://github.com/username"
          onClick={() => handleSocialClick('github')}
        >
          GitHub
        </a>
        <a 
          href="https://linkedin.com/in/username"
          onClick={() => handleSocialClick('linkedin')}
        >
          LinkedIn
        </a>
        <a 
          href="https://twitter.com/username"
          onClick={() => handleSocialClick('twitter')}
        >
          Twitter
        </a>
      </div>
      
      <form onSubmit={handleNewsletterSignup}>
        <input type="email" placeholder="Subscribe to newsletter" />
        <button type="submit">Subscribe</button>
      </form>
    </footer>
  );
};
```

### 5. **MobileHeroSection** - Mobile Interaction Tracking

```tsx
"use client";

import React from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';

const MobileHeroSection: React.FC = () => {
  const { trackButtonClick, trackEvent } = useGoogleAnalytics();

  const handleScrollToSection = (sectionName: string) => {
    trackButtonClick('scroll_to_section', 'mobile_hero');
    trackEvent('section_navigation', 'engagement', sectionName);
  };

  const handleDownloadCV = () => {
    trackButtonClick('download_cv', 'mobile_hero');
    trackEvent('file_download', 'conversion', 'cv_pdf');
  };

  return (
    <div>
      <button onClick={() => handleScrollToSection('projects')}>
        View Projects
      </button>
      <button onClick={() => handleScrollToSection('contact')}>
        Contact Me
      </button>
      <button onClick={handleDownloadCV}>
        Download CV
      </button>
    </div>
  );
};
```

## 📊 Event Categories yang Disarankan

### Engagement Events
- `video_play`, `video_pause`, `video_complete`
- `scroll_to_section`, `section_navigation`
- `filter_change`, `search_performed`
- `social_click`, `external_link_click`

### Conversion Events
- `form_submit`, `newsletter_signup`
- `contact_request`, `service_quote`
- `file_download`, `cv_download`
- `follow_user`, `profile_view`

### User Behavior Events
- `page_view`, `time_on_page`
- `button_click`, `link_click`
- `hover_interaction`, `scroll_depth`
- `mobile_interaction`, `desktop_interaction`

## 🎯 Best Practices untuk Tracking

### 1. **Event Naming Convention**
```tsx
// ✅ Good
trackEvent('button_click', 'engagement', 'contact_form_submit');
trackEvent('form_submit', 'conversion', 'newsletter_signup');

// ❌ Bad
trackEvent('click', 'action', 'button');
trackEvent('submit', 'form', 'newsletter');
```

### 2. **Consistent Categories**
```tsx
// Use consistent categories across components
const categories = {
  engagement: 'engagement',
  conversion: 'conversion',
  navigation: 'navigation',
  interaction: 'interaction'
};
```

### 3. **Meaningful Labels**
```tsx
// ✅ Descriptive labels
trackEvent('filter_change', 'skills', 'category_frontend');
trackEvent('button_click', 'projects', 'view_demo_portfolio');

// ❌ Generic labels
trackEvent('click', 'button', 'demo');
trackEvent('filter', 'skills', 'frontend');
```

### 4. **Value Tracking (Optional)**
```tsx
// Track numeric values when relevant
trackEvent('purchase', 'ecommerce', 'premium_plan', 99.99);
trackEvent('time_spent', 'engagement', 'video_watch', 120); // seconds
```

## 🔍 Debugging Tips

### 1. **Console Logging**
```tsx
const { trackEvent } = useGoogleAnalytics();

const handleClick = () => {
  console.log('Tracking event:', 'button_click', 'engagement', 'contact_form');
  trackEvent('button_click', 'engagement', 'contact_form');
};
```

### 2. **Google Analytics Debug Mode**
```tsx
// Add to GoogleAnalytics component for debugging
{process.env.NODE_ENV === 'development' && (
  <Script id="ga-debug">
    {`
      window.gtag('config', '${GA_MEASUREMENT_ID}', {
        debug_mode: true
      });
    `}
  </Script>
)}
```

### 3. **Real-time Testing**
1. Open Google Analytics Real-time reports
2. Perform actions on your website
3. Check if events appear immediately
4. Verify event parameters are correct

## 📈 Analytics Dashboard Setup

### 1. **Custom Events Report**
- Go to Google Analytics → Reports → Engagement → Events
- Create custom reports for your specific events
- Set up event goals for conversion tracking

### 2. **User Journey Analysis**
- Track user flow through your website
- Identify drop-off points
- Optimize conversion funnels

### 3. **A/B Testing Integration**
- Use Google Optimize with Analytics
- Test different button placements
- Measure conversion improvements

---

**Note**: Pastikan semua tracking events konsisten dan bermakna untuk analisis yang akurat.
