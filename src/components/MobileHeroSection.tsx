"use client";

import React from 'react';

const MobileHeroSection = React.memo(function MobileHeroSection() {
  return (
    <section className="block md:hidden min-h-screen flex items-center justify-center relative" style={{
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b  50%, #334155 100%)'
    }}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      
      {/* Mobile Hero Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 gradient-text">
            OMEANS
          </h1>
          <h2 className="text-xl sm:text-2xl font-light text-gray-300 mb-6">
            ENGINE
          </h2>
        </div>

        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          The most powerful and accessible real-time 3D creation tool.
          <br />
          <span className="text-blue-400">Built by developers, for developers.</span>
        </p>

        <div className="flex flex-col gap-4 justify-center items-center">
          <button className="button-primary w-full max-w-xs">
            DOWNLOAD NOW
          </button>
          <button className="button-secondary w-full max-w-xs">
            LEARN MORE
          </button>
        </div>
        

      </div>

      {/* Mobile Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border border-blue-500/20 rounded-full"></div>
        <div className="absolute top-40 right-20 w-20 h-20 border border-purple-500/20 rounded-full"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 border border-cyan-500/20 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-pink-500/20 rounded-full"></div>
      </div>
    </section>
  );
});

export default MobileHeroSection;
