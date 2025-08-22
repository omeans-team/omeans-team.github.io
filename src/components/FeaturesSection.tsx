"use client";

import React from 'react';
import { 
  ZapIcon,
  StarIcon,
  ShieldIcon
} from '@primer/octicons-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built with performance in mind. Experience blazing fast development and deployment speeds.',
    icon: 'ZapIcon',
    gradient: 'linear-gradient(to right, #2563eb, #7c3aed)',
    hoverColor: 'blue'
  },
  {
    title: 'Innovative',
    description: 'Cutting-edge technologies and innovative solutions for modern development challenges.',
    icon: 'StarIcon',
    gradient: 'linear-gradient(to right, #7c3aed, #ec4899)',
    hoverColor: 'purple'
  },
  {
    title: 'Secure',
    description: 'Enterprise-grade security with advanced protection and compliance standards.',
    icon: 'ShieldIcon',
    gradient: 'linear-gradient(to right, #059669, #2563eb)',
    hoverColor: 'green'
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section id="features" className="py-24" style={{
      background: 'linear-gradient(to bottom, #111827, #1f2937)'
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
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`glass-effect p-8 lg:p-10 rounded-xl hover:border-${feature.hoverColor}-500 hover-glow h-full transition-all duration-300`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-6"
                style={{
                  background: feature.gradient
                }}
              >
                {feature.icon === 'ZapIcon' && <ZapIcon size={32} className="text-white" />}
                {feature.icon === 'StarIcon' && <StarIcon size={32} className="text-white" />}
                {feature.icon === 'ShieldIcon' && <ShieldIcon size={32} className="text-white" />}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
