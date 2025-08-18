# YouTube Video Scrubber

A modern, interactive video scrubber that works with YouTube videos for frame-by-frame scrolling control.

## Features

### 🎥 YouTube Video Scrubber (`/youtube-scrubber`)
- **Basic YouTube Integration**: Embeds YouTube videos using iframe
- **URL Input**: Enter any YouTube URL to load different videos
- **Visual Effects**: Same cinematic effects as the original video scrubber
- **Responsive Design**: Works on all device sizes
- **URL Validation**: Validates YouTube URLs before loading

### 🚀 Advanced YouTube Scrubber (`/youtube-scrubber-advanced`)
- **YouTube IFrame API**: Full control over video playback
- **Real-time Scrubbing**: True frame-by-frame control based on scroll position
- **Video Timeline Control**: Seamlessly seek to any position in the video
- **Progress Tracking**: Real-time display of current time and progress
- **Performance Optimized**: Throttled updates for smooth performance

## How It Works

### Basic Version
1. Enter a YouTube URL in the input field
2. Click "Load Video" to embed the video
3. Scroll to see cinematic effects and visual transformations
4. The video plays normally with YouTube's default controls

### Advanced Version
1. Enter a YouTube URL in the input field
2. Click "Load Video" to load the video with API control
3. **Scroll to scrub**: The video timeline is controlled by your scroll position
4. **Frame-by-frame control**: Each scroll movement updates the video position
5. **Real-time feedback**: See current time and progress percentage

## Technical Implementation

### YouTube IFrame API Integration
```javascript
// Initialize YouTube player with API control
playerRef.current = new window.YT.Player(iframeRef.current, {
  height: '100%',
  width: '100%',
  videoId: videoId,
  playerVars: {
    autoplay: 0,
    controls: 0,
    disablekb: 1,
    enablejsapi: 1,
    fs: 0,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    origin: window.location.origin,
  },
  events: {
    onReady: (event) => {
      setIsPlayerReady(true);
      setVideoDuration(event.target.getDuration());
      event.target.pauseVideo();
    }
  }
});
```

### Scroll-to-Video Mapping
```javascript
// Map scroll percentage to video time
const targetTime = (scrollPercentage * videoDuration);
if (Math.abs(targetTime - currentPlayerTime) > 0.5) {
  playerRef.current.seekTo(targetTime, true);
  setCurrentTime(targetTime);
}
```

## URL Formats Supported

The scrubber supports various YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`

## Visual Effects

Both versions include the same cinematic effects as the original video scrubber:

### 🎭 Cinematic Text Overlays
- Animated text that appears and disappears based on scroll position
- Smooth transitions with blur and brightness effects
- Gradient text styling

### 🌌 Black Hole Effect
- Dynamic black hole that grows and shrinks with scroll
- Creates a cinematic focus effect
- Disappears at 60% scroll progress

### 🎬 Video Transformations
- **Perspective Effect**: Video tilts and scales during scroll
- **Blur Effect**: Video blurs at the end of the scroll sequence
- **3D Transformations**: RotateX, translateZ, and scale effects

### ✨ Particle System
- Floating particles with deterministic animation
- Creates ambient visual atmosphere
- Performance optimized with fixed particle count

## Performance Optimizations

### Scroll Throttling
```javascript
let ticking = false;
const handleScroll = () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      // Update logic here
      ticking = false;
    });
    ticking = true;
  }
};
```

### Video Seeking Optimization
- Only seek when difference is significant (>0.5 seconds)
- Prevents excessive API calls
- Maintains smooth performance

## Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ⚠️ Requires JavaScript enabled
- ⚠️ Requires YouTube IFrame API access

## Usage Examples

### Basic Usage
1. Navigate to `/youtube-scrubber`
2. Enter: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
3. Click "Load Video"
4. Scroll to experience effects

### Advanced Usage
1. Navigate to `/youtube-scrubber-advanced`
2. Enter any YouTube URL
3. Click "Load Video"
4. **Scroll to scrub through the video timeline**
5. Watch the progress indicator update in real-time

## Customization

### Adding New Visual Effects
```javascript
// Add new effect based on scroll percentage
if (percentage >= 0.5 && percentage < 0.7) {
  // Your custom effect here
  setCustomEffect(true);
}
```

### Modifying Video Controls
```javascript
// Custom video control functions
const customSeek = (time) => {
  if (playerRef.current) {
    playerRef.current.seekTo(time, true);
  }
};
```

## Troubleshooting

### Common Issues

1. **Video doesn't load**
   - Check if the YouTube URL is valid
   - Ensure the video is publicly accessible
   - Check browser console for errors

2. **Scrubbing not working (Advanced version)**
   - Verify YouTube IFrame API is loaded
   - Check if `enablejsapi=1` is in the URL
   - Ensure video has loaded completely

3. **Performance issues**
   - Reduce particle count in `generateParticles()`
   - Increase scroll throttling threshold
   - Check for other heavy scripts on the page

### Debug Information
The advanced version includes console logging for debugging:
- Scroll percentage and video time
- Player state changes
- API errors

## Future Enhancements

- [ ] Support for YouTube playlists
- [ ] Custom video controls overlay
- [ ] Multiple video synchronization
- [ ] Export scrubbing sessions
- [ ] Mobile touch controls
- [ ] Keyboard shortcuts

## Contributing

Feel free to contribute to this project by:
- Reporting bugs
- Suggesting new features
- Submitting pull requests
- Improving documentation

## License

This project is part of the Omeans Team portfolio and follows the same licensing terms.
