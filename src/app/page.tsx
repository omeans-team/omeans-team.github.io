"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for client-side only components
const MobileNavigation = dynamic(() => Promise.resolve(({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (open: boolean) => void; 
}) => {
  return (
    <>
      <button 
        className="md:hidden text-white p-2"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
          <div className="flex flex-col space-y-4 pt-4">
            <a 
              href="#features" 
              className="nav-link text-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              FEATURES
            </a>
            <a 
              href="#team" 
              className="nav-link text-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              TEAM
            </a>
            <a 
              href="#services" 
              className="nav-link text-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              SERVICES
            </a>
            <a 
              href="#contact" 
              className="nav-link text-center py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </a>
            <button className="button-primary text-sm px-4 py-2 mx-auto mt-2">
              GET STARTED
            </button>
          </div>
        </div>
      )}
    </>
  );
}), { ssr: false });

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


const Home = React.memo(function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [scrollPercentage, setScrollPercentage] = useState(0)
  const [blackHoleSize, setBlackHoleSize] = useState(50)
  const [videoScale, setVideoScale] = useState(1)
  const [videoBlur, setVideoBlur] = useState(0)
  const [showHero, setShowHero] = useState(false)
  const [activeTextIndex, setActiveTextIndex] = useState(-1)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
      // Set video to beginning and pause
      video.currentTime = 0
      video.pause()

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

          // Handle video scrubbing
          if (video.duration > 0) {
            const videoPercentage = Math.min(percentage, 0.6)
            video.currentTime = video.duration * videoPercentage
            if (!video.paused) {
              video.pause()
            }
          }
        })
      }

      let scrollHandler: (() => void) | null = null

      const enableScrollHandling = () => {
        if (!scrollHandler) {
          scrollHandler = handleScroll
          window.addEventListener('scroll', scrollHandler, { passive: true })
        }
      }

      const disableScrollHandling = () => {
        if (scrollHandler) {
          window.removeEventListener('scroll', scrollHandler)
          scrollHandler = null
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

    if (video.readyState >= 2) {
      handleVideoReady()
    } else {
      video.addEventListener('loadeddata', handleVideoReady, { once: true })
    }

    return () => {
      video.removeEventListener('loadeddata', handleVideoReady)
    }
  }, [])

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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="nav-link">FEATURES</a>
              <a href="#team" className="nav-link">TEAM</a>
              <a href="#services" className="nav-link">SERVICES</a>
              <a href="#contact" className="nav-link">CONTACT</a>
            </div>
            
            {/* Mobile Navigation - Client-side only */}
            {hydrated && (
              <MobileNavigation 
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
              />
            )}
            
            <button className="button-primary text-sm px-4 py-2 hidden md:block">
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* Video Scrubber Section */}
      <section ref={sectionRef} className="videoHero">
        <div className="heroVideo">
          <video
            ref={videoRef}
            src="/video-scrubber/vid2.mp4"
            muted
            playsInline
            preload="metadata"
            crossOrigin="anonymous"
            className="heroVideo"
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-24" style={{
        background: 'linear-gradient(to bottom, #000000, #111827)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              POWERFUL FEATURES
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of development tools designed for modern applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-blue-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #2563eb, #7c3aed)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Built with performance in mind. Experience blazing fast development and deployment speeds.
              </p>
            </div>

            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-purple-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #7c3aed, #ec4899)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Innovative</h3>
              <p className="text-gray-400 leading-relaxed">
                Cutting-edge technologies and innovative solutions for modern development challenges.
              </p>
            </div>

            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-green-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #059669, #2563eb)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security with advanced protection and compliance standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              MEET THE TEAM
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              The brilliant minds behind Omeans Engine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-blue-500 hover-glow h-full" style={{
              background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
            }}>
              <div className="w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-2 border-blue-500 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <img 
                  src="https://github.com/omeans-team.png" 
                  alt="Aris Hadisopiyan" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Aris Hadisopiyan</h3>
              <p className="text-blue-400 mb-4 text-center">Game & Web Developer</p>
              <p className="text-gray-400 text-center leading-relaxed">
                Full-stack developer specializing in Unity3D, React, Node.js, Laravel, and Yii2.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-purple-500 hover-glow h-full" style={{
              background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))'
            }}>
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
                background: 'linear-gradient(to right, #7c3aed, #ec4899)'
              }}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Sarah Kim</h3>
              <p className="text-purple-400 mb-4 text-center">UI/UX Designer</p>
              <p className="text-gray-400 text-center leading-relaxed">
                Creative designer focused on user experience and modern design principles.
              </p>
            </div>

            <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-green-500 hover-glow h-full" style={{
              background: 'linear-gradient(to bottom right, rgba(5, 150, 105, 0.2), rgba(37, 99, 235, 0.2))'
            }}>
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
                background: 'linear-gradient(to right, #059669, #2563eb)'
              }}>
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">Mike Johnson</h3>
              <p className="text-green-400 mb-4 text-center">Mobile Developer</p>
              <p className="text-gray-400 text-center leading-relaxed">
                Specialized in React Native and Flutter for cross-platform mobile development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24" style={{
        background: 'linear-gradient(to bottom, #111827, #000000)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              OUR SERVICES
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions for modern development needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-blue-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#2563eb'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Modern, responsive web applications</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-purple-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#7c3aed'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Mobile Apps</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Cross-platform mobile solutions</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-green-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#059669'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">UI/UX Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Beautiful and intuitive interfaces</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-pink-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#ec4899'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Performance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Optimized for speed and efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            GET STARTED
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to experience the power of Omeans Engine? Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="button-primary">
              DOWNLOAD NOW
            </button>
            <button className="button-secondary">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-6">OMEANS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The most powerful and accessible development platform.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Products</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="footer-link">Web Development</a></li>
                <li><a href="#" className="footer-link">Mobile Apps</a></li>
                <li><a href="#" className="footer-link">UI/UX Design</a></li>
                <li><a href="#" className="footer-link">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">Tutorials</a></li>
                <li><a href="#" className="footer-link">Community</a></li>
                <li><a href="#" className="footer-link">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/arishadisopiyan" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Visit Aris Hadisopiyan's LinkedIn profile">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.354 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="https://github.com/omeans-team" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Visit Omeans Team's GitHub repository">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/aya.erisu" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Visit Aya Erisu's Instagram profile">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Omeans Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Story Text - Optimized to only render active text */}
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
    </div>
  );
});

export default Home;
