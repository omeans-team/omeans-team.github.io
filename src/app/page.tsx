"use client";

import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import GitHubStats from '../components/GitHubStats';
import GitHubInfo from '../components/GitHubInfo';
import GitHubPersonalInfo from '../components/GitHubPersonalInfo';
import GitHubProfileCard from '../components/GitHubProfileCard';
import GitHubProfileStats from '../components/GitHubProfileStats';
import ToolsDropdown from '../components/ToolsDropdown';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ContactSection from '../components/ContactSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import FeaturesSection from '../components/FeaturesSection';
import TeamSection from '../components/TeamSection';
import FooterSection from '../components/FooterSection';
import VideoHeroSection from '../components/VideoHeroSection';
import MobileHeroSection from '../components/MobileHeroSection';
import { clearCacheByPrefix } from '../utils/cache';
import RocketAnimation from '@/components/RocketAnimation';

// Mobile Navigation Component
const MobileNavigation = ({ 
  mobileMenuOpen, 
  setMobileMenuOpen 
}: { 
  mobileMenuOpen: boolean; 
  setMobileMenuOpen: (open: boolean) => void; 
}) => {
  return (
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
  );
};




const Home = React.memo(function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('about')

  // Debug: Log active section changes
  useEffect(() => {
    console.log('Active section changed to:', activeSection)
  }, [activeSection])

  // Backup scroll listener untuk memastikan deteksi section berfungsi
  useEffect(() => {
      const handleScroll = () => {
      const sections = ['about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height

          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            if (activeSection !== sectionId) {
              console.log(`Scroll detected: ${sectionId} is now active`)
              setActiveSection(sectionId)
            }
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [activeSection])

  // Intersection Observer untuk mendeteksi section yang sedang terlihat
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'contact']
    const observers: IntersectionObserver[] = []

    // Delay untuk memastikan DOM sudah siap
    const timeoutId = setTimeout(() => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  console.log(`Section ${sectionId} is now visible`)
                  setActiveSection(sectionId)
                } else {
                  console.log(`Section ${sectionId} is no longer visible`)
                }
              })
            },
            {
              threshold: 0.5, // Section dianggap terlihat ketika 50% terlihat
              rootMargin: '-10% 0px -10% 0px' // Margin yang lebih kecil untuk deteksi yang lebih akurat
            }
          )
          observer.observe(element)
          observers.push(observer)
          console.log(`Observer attached to section: ${sectionId}`)
    } else {
          console.warn(`Section with id "${sectionId}" not found`)
    }
      })
    }, 500) // Increased delay to ensure all components are mounted

    // Cleanup observers
    return () => {
      clearTimeout(timeoutId)
      observers.forEach(observer => observer.disconnect())
    }
  }, [])



  return (
    <div className="min-h-screen text-white videoScrubber pb-20 md:pb-0">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        backgroundColor: 'rgba(22, 22, 22, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('about');
              }}
              className="nav-link text-xl md:text-2xl font-bold cursor-pointer"
            >
              OMEANS
            </button>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="nav-link">ABOUT</a>
              <a href="#skills" className="nav-link">SKILLS</a>
              <a href="#projects" className="nav-link">PROJECTS</a>
              <a href="#team" className="nav-link">TEAM</a>
              <a href="#contact" className="nav-link">CONTACT</a>
              <ToolsDropdown />
            </div>
            
            {/* Mobile Navigation */}
            <MobileNavigation 
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />
            
            <button className="button-primary text-sm px-4 py-2 hidden md:block">
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* Video Hero Section - Desktop Only */}
      <VideoHeroSection />

      {/* Mobile Hero Section - Mobile Only */}
      <MobileHeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Skills Section */}
      <SkillsSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Projects Section */}
      <ProjectsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* Team Section */}
      <TeamSection />

      {/* Contact Section */}
      <ContactSection />
<RocketAnimation />

      {/* Footer */}
      <FooterSection />

      {/* Mobile Bottom Navigation - Fixed in bottom area */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 z-30">
        <div className="flex items-center justify-around px-2 py-3">
          <button 
            onClick={() => {
              setActiveSection('about');
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 relative focus:outline-none ${
              activeSection === 'about' ? 'bg-blue-500/10' : ''
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeSection === 'about' ? 'bg-blue-500/20' : 'group-hover:bg-blue-500/20'
            }`}>
              <svg className={`w-5 h-5 transition-colors ${
                activeSection === 'about' ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className={`text-xs transition-colors mt-1 font-medium ${
              activeSection === 'about' ? 'text-blue-400' : 'text-gray-400 group-hover:text-blue-400'
            }`}>About</span>
            {/* Active Indicator */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full transition-opacity duration-300 ${
              activeSection === 'about' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
          </button>
          
          <button 
            onClick={() => {
              setActiveSection('skills');
              document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 relative focus:outline-none ${
              activeSection === 'skills' ? 'bg-green-500/10' : ''
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeSection === 'skills' ? 'bg-green-500/20' : 'group-hover:bg-green-500/20'
            }`}>
              <svg className={`w-5 h-5 transition-colors ${
                activeSection === 'skills' ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
            </div>
            <span className={`text-xs transition-colors mt-1 font-medium ${
              activeSection === 'skills' ? 'text-green-400' : 'text-gray-400 group-hover:text-green-400'
            }`}>Skills</span>
            {/* Active Indicator */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full transition-opacity duration-300 ${
              activeSection === 'skills' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
          </button>
          
          <button 
            onClick={() => {
              setActiveSection('projects');
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 relative focus:outline-none ${
              activeSection === 'projects' ? 'bg-purple-500/10' : ''
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeSection === 'projects' ? 'bg-purple-500/20' : 'group-hover:bg-purple-500/20'
            }`}>
              <svg className={`w-5 h-5 transition-colors ${
                activeSection === 'projects' ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            </div>
            <span className={`text-xs transition-colors mt-1 font-medium ${
              activeSection === 'projects' ? 'text-purple-400' : 'text-gray-400 group-hover:text-purple-400'
            }`}>Projects</span>
            {/* Active Indicator */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-400 rounded-full transition-opacity duration-300 ${
              activeSection === 'projects' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
          </button>
          
          <button 
            onClick={() => {
              setActiveSection('contact');
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 relative focus:outline-none ${
              activeSection === 'contact' ? 'bg-orange-500/10' : ''
            }`}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-xl transition-all duration-300 ${
              activeSection === 'contact' ? 'bg-orange-500/20' : 'group-hover:bg-orange-500/20'
            }`}>
              <svg className={`w-5 h-5 transition-colors ${
                activeSection === 'contact' ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            </div>
            <span className={`text-xs transition-colors mt-1 font-medium ${
              activeSection === 'contact' ? 'text-orange-400' : 'text-gray-400 group-hover:text-orange-400'
            }`}>Contact</span>
            {/* Active Indicator */}
            <div className={`absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-orange-400 rounded-full transition-opacity duration-300 ${
              activeSection === 'contact' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}></div>
          </button>
          
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 group relative focus:outline-none"
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-xl group-hover:bg-red-500/20 transition-all duration-300">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </div>
            <span className="text-xs text-gray-400 group-hover:text-red-400 transition-colors mt-1 font-medium">Menu</span>
            {/* Active Indicator */}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
          </div>

      {/* Mobile Menu - Fixed in bottom area only */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40">
          {/* Menu Content - Slides up from bottom navigation area */}
          <div className="bg-gray-900 rounded-t-3xl transform transition-transform duration-300 ease-out border-t border-gray-700">
            {/* Drag Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-600 rounded-full"></div>
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
              <h2 className="text-lg font-bold text-white">Menu</h2>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            
            {/* Menu Content - Auto height based on content */}
            <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-3">
                <a 
                  href="#services" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                  </svg>
                  <span className="text-white font-medium">Services</span>
                </a>
                
                <a 
                  href="#features" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="text-white font-medium">Features</span>
                </a>
                
                <a 
                  href="#team" 
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                  <span className="text-white font-medium">Team</span>
                </a>
                
                <div className="border-t border-gray-700 pt-4 mt-4">
                  <h3 className="text-sm font-medium text-gray-400 mb-3">Tools</h3>
                  <div className="space-y-2">
                    <button 
                      onClick={() => {
                        clearCacheByPrefix('github');
                        window.location.reload();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span className="text-white text-sm">Refresh Data</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="text-white text-sm">Force Refresh</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        console.log('Clear cache clicked');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span className="text-white text-sm">Clear Cache</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        console.log('Settings clicked');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-white text-sm">Settings</span>
                    </button>
                    
                    <button 
                      onClick={() => {
                        console.log('Help clicked');
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                    >
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-white text-sm">Help</span>
                    </button>
                  </div>
              </div>
            </div>
          </div>
          
            {/* Bottom Padding for Safe Area */}
            <div className="h-4"></div>
          </div>
        </div>
      )}

    </div>
  );
});

export default Home;
