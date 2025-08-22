"use client";

import React, { useRef, useState, useEffect, useMemo } from 'react';

// Custom hook for hydration safety
function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    setHydrated(true);
  }, []);
  
  return hydrated;
}

// Deterministic random number generator with fixed precision
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  const result = x - Math.floor(x);
  return Math.round(result * 10000) / 10000;
}

// Generate deterministic particle data with fixed precision - optimized
function generateParticles(count: number) {
  // Use a more efficient approach with pre-calculated values - optimized for 8 particles
  const particles = new Array(count);
  const particleData = [
    { left: 15.2, top: 23.4, delay: 0.8, duration: 5.2, opacity: 0.85 },
    { left: 67.8, top: 45.1, delay: 2.1, duration: 6.8, opacity: 0.92 },
    { left: 34.5, top: 78.9, delay: 1.3, duration: 4.7, opacity: 0.78 },
    { left: 89.2, top: 12.3, delay: 3.4, duration: 7.1, opacity: 0.88 },
    { left: 23.7, top: 56.8, delay: 0.5, duration: 5.9, opacity: 0.81 },
    { left: 76.4, top: 34.2, delay: 2.8, duration: 6.3, opacity: 0.94 },
    { left: 45.9, top: 67.5, delay: 1.7, duration: 4.2, opacity: 0.76 },
    { left: 12.6, top: 89.1, delay: 0.9, duration: 5.6, opacity: 0.83 }
  ];

  for (let i = 0; i < count; i++) {
    const data = particleData[i] || particleData[i % particleData.length];
    particles[i] = {
      id: i,
      left: `${data.left}%`,
      top: `${data.top}%`,
      animationDelay: `${data.delay}s`,
      animationDuration: `${data.duration}s`,
      opacity: data.opacity,
    };
  }
  return particles;
}

const VideoHeroSection = React.memo(function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [blackHoleSize, setBlackHoleSize] = useState(50)
  const [videoScale, setVideoScale] = useState(1)
  const [videoBlur, setVideoBlur] = useState(0)
  const [showHero, setShowHero] = useState(false)
  const [activeTextIndex, setActiveTextIndex] = useState(-1)
  const hydrated = useHydrated()
  
  // Use ref to track current activeTextIndex to avoid closure issues
  const activeTextIndexRef = useRef(-1)

  // Generate particles deterministically - reduced for better performance
  const particles = useMemo(() => generateParticles(8), []);

  useEffect(() => {
    const video = videoRef.current
    const section = sectionRef.current

    if (!video || !section) return

    // Wait for video to be ready
    const handleVideoReady = () => {
      // Set video to beginning and pause for scrubbing
      video.currentTime = 0
      video.pause()
      
      console.log('Video ready for scrubbing:', {
        duration: video.duration,
        currentTime: video.currentTime,
        paused: video.paused
      })

      // Use Intersection Observer for better performance
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Section is visible, enable scroll handling
              enableScrollHandling()
            } else {
              // Section is not visible, disable scroll handling
              disableScrollHandling()
            }
          })
        },
        { threshold: 0.1 }
      )

      observer.observe(section)

      // Debounced scroll handler with better throttling
      let scrollTimeout: number | null = null
      let lastScrollTime = 0
      const SCROLL_THROTTLE = 16 // ~60fps

      const handleScroll = () => {
        const now = performance.now()
        if (now - lastScrollTime < SCROLL_THROTTLE) {
          return
        }
        lastScrollTime = now

        // Use requestIdleCallback for non-critical updates
        if (scrollTimeout) {
          cancelAnimationFrame(scrollTimeout)
        }

        scrollTimeout = requestAnimationFrame(() => {
          const distance = window.scrollY - section.offsetTop
          const total = section.clientHeight - window.innerHeight

          let percentage = distance / total
          percentage = Math.max(0, percentage)
          percentage = Math.min(percentage, 1.0)

          // Batch state updates to reduce re-renders
          const updates = {
            scrollPercentage: percentage,
            blackHoleSize: percentage <= 0.6 ? Math.min(95, 60 + (percentage * 58.33)) : 60, // Increased hole size for larger transparent area
            showHero: percentage >= 0.8,
            videoScale: percentage >= 0.7 && percentage <= 0.9 
              ? 1 - ((percentage - 0.7) / 0.2) * 0.4 
              : percentage > 0.9 ? 0.6 : 1,
            videoBlur: percentage >= 0.8 ? 15 : 0
          }

          // Calculate active text index
          let newActiveIndex = -1
          if (percentage >= 0 && percentage < 0.1) newActiveIndex = 0
          else if (percentage >= 0.1 && percentage < 0.2) newActiveIndex = 1
          else if (percentage >= 0.2 && percentage < 0.3) newActiveIndex = 2
          else if (percentage >= 0.3 && percentage < 0.4) newActiveIndex = 3
          else if (percentage >= 0.4 && percentage < 0.5) newActiveIndex = 4
          else if (percentage >= 0.5 && percentage < 0.6) newActiveIndex = 5
          else newActiveIndex = -1 // Hide text after 60% scroll

          if (newActiveIndex !== activeTextIndexRef.current) {
            activeTextIndexRef.current = newActiveIndex
            setActiveTextIndex(newActiveIndex)
          }

          // Batch all state updates
          setScrollPercentage(updates.scrollPercentage)
          setBlackHoleSize(updates.blackHoleSize)
          setShowHero(updates.showHero)
          setVideoScale(updates.videoScale)
          setVideoBlur(updates.videoBlur)

          // Apply video transformations directly to avoid style recalculations
          if (video.style) {
            const transform = `translateZ(0) perspective(1000px) scale(${updates.videoScale}) rotateX(${(1 - updates.videoScale) * 20}deg) translateZ(${(1 - updates.videoScale) * -200}px) translateY(${(1 - updates.videoScale) * 20}vh) scaleX(${1 + (1 - updates.videoScale)})`
            video.style.transform = transform
            video.style.filter = `blur(${updates.videoBlur}px)`
          }

          // Handle video scrubbing - sync video frame with scroll position
          if (video.duration > 0) {
            const videoPercentage = Math.min(percentage, 0.6) // Only scrub for first 60% of scroll
            const targetTime = video.duration * videoPercentage
            
            // Only update if there's a significant difference to avoid jitter
            if (Math.abs(video.currentTime - targetTime) > 0.1) {
              video.currentTime = targetTime
              console.log('Video scrubbing:', {
                scrollPercentage: percentage.toFixed(3),
                videoPercentage: videoPercentage.toFixed(3),
                currentTime: video.currentTime.toFixed(2),
                duration: video.duration.toFixed(2)
              })
            }
            
            // Ensure video is paused during scrubbing
            if (!video.paused) {
              video.pause()
            }
          }
        })
      }

      // Throttled scroll handler
      let isScrollHandlingEnabled = false
      const enableScrollHandling = () => {
        if (!isScrollHandlingEnabled) {
          isScrollHandlingEnabled = true
          window.addEventListener('scroll', handleScroll, { passive: true })
        }
      }

      const disableScrollHandling = () => {
        if (isScrollHandlingEnabled) {
          isScrollHandlingEnabled = false
          window.removeEventListener('scroll', handleScroll)
        }
      }

      // Initial call
      handleScroll()

      return () => {
        disableScrollHandling()
        observer.disconnect()
        if (scrollTimeout) {
          cancelAnimationFrame(scrollTimeout)
        }
      }
    }

    // Set up video event listeners
    const handleLoad = () => {
      if (video.readyState >= 2) {
        handleVideoReady()
      }
    }

    video.addEventListener('loadedmetadata', handleVideoReady, { once: true })
    video.addEventListener('canplay', handleVideoReady, { once: true })
    video.addEventListener('loadeddata', handleLoad, { once: true })

    // Fallback if video is already loaded
    if (video.readyState >= 2) {
      handleVideoReady()
    }

    // Cleanup
    return () => {
      video.removeEventListener('loadedmetadata', handleVideoReady)
      video.removeEventListener('canplay', handleVideoReady)
      video.removeEventListener('loadeddata', handleLoad)
    }
  }, [hydrated])

  return (
    <section ref={sectionRef} className="videoHero hidden md:block">
      <div className="heroVideo">
        <video
          ref={videoRef}
          src="/video-scrubber/vid2.mp4"
          muted
          playsInline
          preload="auto"
          className="heroVideo"
          onError={(e) => console.error('Video error:', e)}
          onLoadStart={() => console.log('Video load started')}
          onLoadedData={() => console.log('Video data loaded')}
          onLoadedMetadata={() => console.log('Video metadata loaded')}
          style={{
            transform: hydrated ? `translateZ(0) perspective(1000px) scale(${videoScale}) rotateX(${(1 - videoScale) * 20}deg) translateZ(${(1 - videoScale) * -200}px) translateY(${(1 - videoScale) * 20}vh) scaleX(${1 + (1 - videoScale)})` : 'translateZ(0)',
            transformOrigin: 'center bottom',
            willChange: 'transform, filter',
            filter: hydrated ? `blur(${videoBlur}px)` : 'blur(0px)',
            contain: 'layout style paint'
          }}
        />

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
                willChange: 'transform',
                contain: 'layout style paint'
              }}
            ></div>
          ))}
        </div>

        {hydrated && scrollPercentage < 0.6 && (
          <div
            className="blackHole"
            style={{
              '--hole-size': `${blackHoleSize}%`,
              opacity: 0.7, // Make it less dark
              filter: 'brightness(1.2)' // Make it brighter
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
                    OMEANS
                  </h1>
                  <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8">
                    ENGINE
                  </h2>
                </div>

                <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
                  The most powerful and accessible real-time 3D creation tool.
                  <br />
                  <span className="text-blue-400">Built by developers, for developers.</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <button className="button-primary">
                    DOWNLOAD NOW
                  </button>
                  <button className="button-secondary">
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {hydrated && scrollPercentage < 0.6 && (
          <div
            className="germanGothicO"
            style={{
              opacity: 1 - (scrollPercentage * 1.67), // Hilang pada 60% scroll
              transform: `translate(-50%, -50%) scale(${1 + (scrollPercentage * 2)})` // Semakin besar saat scroll
            }}
          >
            <svg
              viewBox="0 0 100 100"
              width="350"
              height="350"
              style={{ display: 'block' }}
            >
              {/* Simplified Blackletter O - optimized for performance */}
              <g stroke="black" fill="none" strokeLinecap="square">
                {/* Main structure - increased strokeWidth for thickness */}
                <path d="M25 20 L25 80 M75 20 L75 80" strokeWidth="18" />
                <path d="M25 20 L50 10 L75 20 M25 80 L50 90 L75 80" strokeWidth="14" />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Story Text - Integrated with Video Section */}
      {hydrated && activeTextIndex >= 0 && activeTextIndex <= 5 && (
        <div className="story">
          <div className="storyText active" style={{ 
            opacity: 1,
            transform: 'translateY(0) scale(1) rotateX(0deg)',
            transition: 'all 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            filter: 'blur(0px) brightness(1)'
          }}>
            <h3 className="gradientText">
              {activeTextIndex === 0 && "Welcome to Omeans Engine…"}
              {activeTextIndex === 1 && "…where innovation meets creativity."}
              {activeTextIndex === 2 && "We build the future of development tools."}
              {activeTextIndex === 3 && "Powerful, accessible, and"}
              {activeTextIndex === 4 && "built for developers."}
              {activeTextIndex === 5 && "Experience the next generation of 3D creation."}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
});

export default VideoHeroSection;
