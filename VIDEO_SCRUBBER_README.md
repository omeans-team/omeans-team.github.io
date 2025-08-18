# Video Scrubber Feature

## Overview
The video scrubber feature has been successfully integrated into the home page. This creates an immersive scrolling experience where the video responds to scroll position with various visual effects.

## Features Implemented

### 1. Video Hero Section
- **Sticky Video**: Video stays fixed while scrolling through the section
- **Scroll-based Transformations**: Video scales, rotates, and blurs based on scroll position
- **Black Hole Effect**: Creates a circular fade effect that grows with scroll
- **German Gothic O**: Animated SVG letter that scales and fades with scroll

### 2. Story Text Overlay
- **Progressive Text**: 6 different story texts that appear at different scroll percentages
- **Smooth Transitions**: Text fades in/out with blur and brightness effects
- **Gradient Text**: Beautiful gradient text styling

### 3. Visual Effects
- **Particle System**: Floating particles with random animations
- **Animated Background**: Multiple gradient overlays
- **Hero Content**: Main title and description that fades out during scroll

## How It Works

### Scroll Percentage Calculation
The component calculates scroll progress within the video section:
```javascript
const scrollProgress = (scrollTop - sectionTop) / (sectionHeight - windowHeight);
const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
```

### Visual Effects Based on Scroll
- **0-10%**: Hero content visible, video at full scale
- **10-20%**: First story text appears
- **20-30%**: Second story text appears
- **30-40%**: Third story text appears
- **40-50%**: Fourth story text appears
- **50-60%**: Fifth story text appears
- **60%+**: Final story text, video fully transformed

### Video Transformations
- **Scale**: Reduces from 1.0 to 0.7
- **Blur**: Increases from 0px to 8px
- **Rotation**: Subtle 3D rotation effect
- **Position**: Moves down and back in 3D space

## Files Modified

### 1. `src/app/page.tsx`
- Added video scrubber section
- Implemented scroll event handling
- Added state management for visual effects
- Integrated story text overlay

### 2. `src/app/page.module.css`
- Added navigation styles
- Added button styles
- Added responsive design

### 3. `src/app/video-scrubber/page.module.css`
- Contains all video scrubber styles
- Particle animations
- Text transitions
- Visual effects

## Usage

1. **Scroll Down**: The video will automatically respond to scroll position
2. **Watch Effects**: Observe the video scaling, blurring, and rotating
3. **Read Story**: Story text will appear progressively as you scroll
4. **Black Hole**: Notice the circular fade effect growing from center

## Technical Details

### State Variables
- `scrollPercentage`: Current scroll progress (0-1)
- `videoScale`: Video scale factor
- `videoBlur`: Video blur amount
- `blackHoleSize`: Size of the black hole effect
- `showHero`: Whether to show hero content
- `activeTextIndex`: Current active story text

### Performance Optimizations
- `will-change` CSS property for smooth animations
- `transform: translateZ(0)` for hardware acceleration
- Debounced scroll event handling
- Efficient state updates

## Browser Compatibility
- Modern browsers with CSS transforms support
- Requires JavaScript enabled
- Video autoplay may be blocked in some browsers

## Customization

### Changing Video
Replace the video source in `page.tsx`:
```javascript
src="/video-scrubber/vid.mp4"
```

### Modifying Story Text
Edit the story text content in the JSX:
```javascript
<h3 className={styles.gradientText}>Your story text here</h3>
```

### Adjusting Effects
Modify the scroll effect calculations in the `handleScroll` function:
```javascript
const scale = 1 - (clampedProgress * 0.3);
const blur = clampedProgress * 8;
```

## Troubleshooting

### Video Not Playing
- Check if video file exists at `/public/video-scrubber/vid.mp4`
- Ensure browser allows autoplay
- Check console for errors

### Effects Not Working
- Verify CSS modules are properly imported
- Check if scroll event listener is attached
- Ensure all state variables are properly initialized

### Performance Issues
- Reduce particle count if needed
- Optimize video file size
- Check for memory leaks in scroll handlers

