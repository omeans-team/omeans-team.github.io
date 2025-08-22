"use client";

import React from 'react';
import { 
  GlobeIcon,
  DeviceMobileIcon,
  PaintbrushIcon,
  ZapIcon
} from '@primer/octicons-react';

const services = [
  {
    title: 'Web Development',
    description: 'Modern, responsive web applications',
    icon: 'GlobeIcon',
    color: '#2563eb',
    hoverColor: 'blue'
  },
  {
    title: 'Mobile Apps',
    description: 'Cross-platform mobile solutions',
    icon: 'DeviceMobileIcon',
    color: '#7c3aed',
    hoverColor: 'purple'
  },
  {
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive interfaces',
    icon: 'PaintbrushIcon',
    color: '#059669',
    hoverColor: 'green'
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and efficiency',
    icon: 'ZapIcon',
    color: '#ec4899',
    hoverColor: 'pink'
  }
];

const ServicesSection: React.FC = () => {
  return (
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
          {services.map((service, index) => (
            <div 
              key={service.title}
              className={`glass-effect p-6 lg:p-8 rounded-xl hover:border-${service.hoverColor}-500 hover-glow h-full transition-all duration-300`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  backgroundColor: service.color
                }}
              >
                {service.icon === 'GlobeIcon' && <GlobeIcon size={24} className="text-white" />}
                {service.icon === 'DeviceMobileIcon' && <DeviceMobileIcon size={24} className="text-white" />}
                {service.icon === 'PaintbrushIcon' && <PaintbrushIcon size={24} className="text-white" />}
                {service.icon === 'ZapIcon' && <ZapIcon size={24} className="text-white" />}
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
