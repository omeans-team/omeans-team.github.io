"use client";

import { useEffect, useRef, useState, useMemo } from 'react';

// Deterministic random number generator with fixed precision
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  const result = x - Math.floor(x);
  return Math.round(result * 10000) / 10000;
}

// Generate deterministic particle data with fixed precision
function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const seed = i * 12345;
    const left = seededRandom(seed);
    const top = seededRandom(seed + 1);
    const delay = seededRandom(seed + 2);
    const duration = seededRandom(seed + 3);
    const opacity = seededRandom(seed + 4);

    particles.push({
      id: i,
      left: `${(left * 100).toFixed(2)}%`,
      top: `${(top * 100).toFixed(2)}%`,
      animationDelay: `${(delay * 6).toFixed(2)}s`,
      animationDuration: `${(4 + duration * 4).toFixed(2)}s`,
      opacity: (0.7 + opacity * 0.3).toFixed(4),
    });
  }
  return particles;
}

export default function YouTubeScrubber() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const [blackHoleSize, setBlackHoleSize] = useState(50);
  const [videoScale, setVideoScale] = useState(1);
  const [videoBlur, setVideoBlur] = useState(0);
  const [showHero, setShowHero] = useState(false);
  const [activeTextIndex, setActiveTextIndex] = useState(-1);
  const [youtubeUrl, setYoutubeUrl] = useState('https://www.youtube.com/embed/itvR7TQnWl0?si=SoHAh5AeuOQ0HSN_');
  const [isUrlValid, setIsUrlValid] = useState(true);

  // Generate particles deterministically
  const particles = useMemo(() => generateParticles(15), []);

  // Function to extract YouTube video ID from URL
  const extractYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to validate and format YouTube URL
  const formatYouTubeUrl = (url: string) => {
    const videoId = extractYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
    }
    return null;
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setYoutubeUrl(url);
    
    if (url.trim() === '') {
      setIsUrlValid(true);
      return;
    }
    
    const formattedUrl = formatYouTubeUrl(url);
    setIsUrlValid(!!formattedUrl);
  };

  // Handle URL submission
  const handleUrlSubmit = () => {
    const formattedUrl = formatYouTubeUrl(youtubeUrl);
    if (formattedUrl) {
      setYoutubeUrl(formattedUrl);
      setIsUrlValid(true);
    } else {
      setIsUrlValid(false);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Throttle function untuk mengurangi frekuensi update
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const distance = window.scrollY - section.offsetTop;
          const total = section.clientHeight - window.innerHeight;

          let percentage = distance / total;
          percentage = Math.max(0, percentage);
          percentage = Math.min(percentage, 1.0);

          setScrollPercentage(percentage);

          // Calculate active text index for cinematic effects
          let newActiveIndex = -1;
          if (percentage >= 0 && percentage < 0.1) newActiveIndex = 0;
          else if (percentage >= 0.1 && percentage < 0.2) newActiveIndex = 1;
          else if (percentage >= 0.2 && percentage < 0.3) newActiveIndex = 2;
          else if (percentage >= 0.3 && percentage < 0.4) newActiveIndex = 3;
          else if (percentage >= 0.4 && percentage < 0.5) newActiveIndex = 4;
          else if (percentage >= 0.5 && percentage < 0.6) newActiveIndex = 5;

          if (newActiveIndex !== activeTextIndex) {
            setActiveTextIndex(newActiveIndex);
          }

          // Show hero image when scroll reaches 100%
          if (percentage >= 0.8) {
            setShowHero(true);
          } else {
            setShowHero(false);
          }

          // Calculate black hole size - starts at 50% and reaches 100% at 60% scroll, then disappears
          let holeSize = 50;
          if (percentage <= 0.6) {
            // From 0% to 60%, scale from 50% to 100%
            holeSize = Math.min(100, 50 + (percentage * 83.33)); // 83.33 = 50/0.6 to reach 100% at 60% scroll
          }
          setBlackHoleSize(holeSize);

          // Calculate video perspective based on scroll percentage
          let perspective = 1;
          let perspectiveOrigin = 'center bottom';
          if (percentage >= 0.7 && percentage <= 0.9) {
            // Between 70% and 90%, apply perspective effect
            const perspectiveProgress = (percentage - 0.7) / (0.9 - 0.7); // 0 to 1
            perspective = 1 - (perspectiveProgress * 0.4); // 1 to 0.6
          } else if (percentage > 0.9) {
            // From 90% onwards, maintain the final perspective (0.6)
            perspective = 0.6;
          }
          setVideoScale(perspective);

          // Calculate video blur based on scroll percentage
          let blur = 0;
          if (percentage >= 0.8) {
            // From 70% onwards, apply blur effect
            blur = 15; // Fixed blur amount
          }
          setVideoBlur(blur);

          // Debug logging
          console.log(`Scroll: ${(percentage * 100).toFixed(1)}%, Perspective: ${perspective.toFixed(3)}, Blur: ${blur.toFixed(1)}px, State: ${percentage > 0.9 ? 'Maintained' : percentage >= 0.7 ? 'Transitioning' : 'Normal'}`);

          // Debug black hole
          console.log(`Black Hole visible: ${percentage < 0.6}, Size: ${holeSize.toFixed(1)}%`);

          // Apply transform to iframe
          if (iframeRef.current && iframeRef.current.style) {
            iframeRef.current.style.transform = `translateZ(0) perspective(1000px) scale(${perspective}) rotateX(${(1 - perspective) * 20}deg) translateZ(${(1 - perspective) * -200}px) translateY(${(1 - perspective) * 20}vh) scaleX(${1 + (1 - perspective)})`;
            iframeRef.current.style.filter = `blur(${blur}px)`;
            console.log('Applied transform:', iframeRef.current.style.transform);
            console.log('Applied filter:', iframeRef.current.style.filter);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activeTextIndex]);

  return (
    <div className="min-h-screen bg-black text-white videoScrubber">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl md:text-2xl font-bold text-white">OMEANS</div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="nav-link">HOME</a>
              <a href="/video-scrubber" className="nav-link">VIDEO SCRUBBER</a>
              <a href="/youtube-scrubber" className="nav-link">YOUTUBE SCRUBBER</a>
            </div>
            <button className="button-primary text-sm px-4 py-2">
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* YouTube URL Input */}
      <div className="fixed top-20 left-0 right-0 z-40 p-4" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
      }}>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={youtubeUrl}
                onChange={handleUrlChange}
                placeholder="Enter YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                  isUrlValid 
                    ? 'border-blue-500 bg-gray-800 text-white' 
                    : 'border-red-500 bg-red-900/20 text-red-200'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {!isUrlValid && youtubeUrl.trim() !== '' && (
                <p className="text-red-400 text-sm mt-2">Please enter a valid YouTube URL</p>
              )}
            </div>
            <button
              onClick={handleUrlSubmit}
              className="button-primary px-6 py-3 whitespace-nowrap"
            >
              Load Video
            </button>
          </div>
        </div>
      </div>

      {/* YouTube Video Scrubber Section */}
      <section ref={sectionRef} className="videoHero" style={{ marginTop: '120px' }}>
        <div className="heroVideo">
          <iframe
            ref={iframeRef}
            src={youtubeUrl}
            title="YouTube Video Scrubber"
            className="heroVideo"
            style={{
              transform: `translateZ(0) perspective(1000px) scale(${videoScale}) rotateX(${(1 - videoScale) * 20}deg) translateZ(${(1 - videoScale) * -200}px) translateY(${(1 - videoScale) * 20}vh) scaleX(${1 + (1 - videoScale)})`,
              transformOrigin: 'center bottom',
              transition: 'transform 0.1s ease-out, filter 0.1s ease-out',
              willChange: 'transform, filter',
              filter: `blur(${videoBlur}px)`,
              border: 'none',
              width: '100%',
              height: '100%'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />

          {/* Animated Background */}
          <div className="animatedBackground">
            <div className="gradientOverlay"></div>
            <div className="radialGradient1"></div>
            <div className="radialGradient2"></div>
          </div>

          {/* Floating Particles Effect */}
          <div className="particlesContainer">
            {particles.map((particle) => (
              <div
                key={particle.id}
                className="particle"
                style={{
                  left: particle.left,
                  top: particle.top,
                  animationDelay: particle.animationDelay,
                  animationDuration: particle.animationDuration,
                  opacity: particle.opacity,
                }}
              ></div>
            ))}
          </div>

          {scrollPercentage < 0.6 && (
            <div
              className="blackHole"
              style={{
                '--hole-size': `${blackHoleSize}%`
              } as React.CSSProperties}
            />
          )}

          {/* Hero Image Overlay */}
          {showHero && (
            <div className="heroOverlay">
              {/* Hero Content Overlay */}
              <div className="heroContentOverlay">
                {/* Hero Content */}
                <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
                  <div className="mb-12">
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
                      YOUTUBE
                    </h1>
                    <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8">
                      VIDEO SCRUBBER
                    </h2>
                  </div>

                  <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                    Frame-by-frame scrolling with YouTube videos.
                    <br />
                    <span className="text-blue-400">Scroll to scrub through the video.</span>
                  </p>

                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <button className="button-primary">
                      TRY IT NOW
                    </button>
                    <button className="button-secondary">
                      LEARN MORE
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {scrollPercentage < 0.6 && (
            <div
              className="germanGothicO"
              style={{
                opacity: 1 - (scrollPercentage * 1.67), // Hilang pada 60% scroll
                transform: `translate(-50%, -50%) scale(${1 + (scrollPercentage * 2)})` // Semakin besar saat scroll
              }}
            >
              <svg
                viewBox="0 0 100 100"
                width="500"
                height="500"
                style={{ display: 'block' }}
              >
                {/* YouTube Play Button */}
                <circle cx="50" cy="50" r="45" fill="red" opacity="0.9" />
                <polygon points="35,25 35,75 70,50" fill="white" />
              </svg>
            </div>
          )}
        </div>
      </section>

      {/* Story Text - Moved outside video container */}
      <div className="story">
        {/* Story Text 1 */}
        <div className={`storyText ${activeTextIndex === 0 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0 && scrollPercentage < 0.1 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0 && scrollPercentage < 0.1 ? 0 : 40}px) scale(${scrollPercentage >= 0 && scrollPercentage < 0.1 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0 && scrollPercentage < 0.1 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0 && scrollPercentage < 0.1 ? 0 : 3}px) brightness(${scrollPercentage >= 0 && scrollPercentage < 0.1 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">YouTube Video Scrubber&hellip;</h3>
        </div>
        
        {/* Story Text 2 */}
        <div className={`storyText ${activeTextIndex === 1 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 0 : 40}px) scale(${scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 0 : 3}px) brightness(${scrollPercentage >= 0.1 && scrollPercentage < 0.2 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">&hellip;frame-by-frame scrolling.</h3>
        </div>
        
        {/* Story Text 3 */}
        <div className={`storyText ${activeTextIndex === 2 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 0 : 40}px) scale(${scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 0 : 3}px) brightness(${scrollPercentage >= 0.2 && scrollPercentage < 0.3 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">Scroll to control the video timeline.</h3>
        </div>
        
        {/* Story Text 4 */}
        <div className={`storyText ${activeTextIndex === 3 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 0 : 40}px) scale(${scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 0 : 3}px) brightness(${scrollPercentage >= 0.3 && scrollPercentage < 0.4 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">Experience cinematic</h3>
        </div>
        
        {/* Story Text 5 */}
        <div className={`storyText ${activeTextIndex === 4 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 0 : 40}px) scale(${scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 0 : 3}px) brightness(${scrollPercentage >= 0.4 && scrollPercentage < 0.5 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">video interactions.</h3>
        </div>
        
        {/* Story Text 6 */}
        <div className={`storyText ${activeTextIndex === 5 ? 'active' : ''}`} style={{ 
          opacity: scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 1 : 0,
          transform: `translateY(${scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 0 : 40}px) scale(${scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 1 : 0.9}) rotateX(${scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 0 : 5}deg)`,
          transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          filter: `blur(${scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 0 : 3}px) brightness(${scrollPercentage >= 0.5 && scrollPercentage < 0.6 ? 1 : 0.8})`
        }}>
          <h3 className="gradientText">Powered by YouTube API.</h3>
        </div>
      </div>
    </div>
  );
}
