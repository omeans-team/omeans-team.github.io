"use client";

import React from 'react';
import GitHubPersonalInfo from './GitHubPersonalInfo';
import GitHubProfileCard from './GitHubProfileCard';
import GitHubProfileStats from './GitHubProfileStats';
import GitHubStats from './GitHubStats';
import GitHubInfo from './GitHubInfo';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Profile Image */}
          <div className="lg:col-span-1">
            <div className="relative w-64 h-64 mx-auto lg:mx-0">
              <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-lg">
                <img 
                  src="https://github.com/omeans-team.png" 
                  alt="Aris Hadisopiyan - Programmer" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* About Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">
                About Me
              </h2>
              <p className="text-xl text-red-400 mb-6 font-medium">
                A Lead Full-Stack Developer & Game Developer based in Indonesia
              </p>
              <p className="text-gray-400 leading-relaxed text-lg mb-6">
                I <span className="text-red-400 underline font-medium">design and develop</span> services for customers of all sizes, specializing in creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through the bold interface and meaningful interactions.
              </p>
            </div>

            {/* GitHub Personal Details */}
            <GitHubPersonalInfo />
          </div>
        </div>

        {/* GitHub Profile Card */}
        <div className="mt-12">
          <GitHubProfileCard />
        </div>
        
        {/* GitHub Profile Stats */}
        <div className="mt-8">
          <GitHubProfileStats />
        </div>

        {/* Stats Cards */}
        <GitHubStats />
        
        {/* GitHub Info */}
        <GitHubInfo username="omeans-team" />
      </div>
    </section>
  );
};

export default AboutSection;
