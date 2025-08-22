"use client";

import React from 'react';
import { 
  PaintbrushIcon,
  DeviceMobileIcon
} from '@primer/octicons-react';

const teamMembers = [
  {
    name: 'Aris Hadisopiyan',
    role: 'Game & Web Developer',
    description: 'Full-stack developer specializing in Unity3D, React, Node.js, Laravel, and Yii2.',
    image: 'https://github.com/omeans-team.png',
    hoverColor: 'blue',
    gradient: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
    iconGradient: 'bg-gradient-to-r from-blue-600 to-purple-600',
    roleColor: 'text-blue-400',
    hasImage: true
  },
  {
    name: 'Sarah Kim',
    role: 'UI/UX Designer',
    description: 'Creative designer focused on user experience and modern design principles.',
    icon: 'PaintbrushIcon',
    hoverColor: 'purple',
    gradient: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
    iconGradient: 'linear-gradient(to right, #7c3aed, #ec4899)',
    roleColor: 'text-purple-400',
    hasImage: false
  },
  {
    name: 'Mike Johnson',
    role: 'Mobile Developer',
    description: 'Specialized in React Native and Flutter for cross-platform mobile development.',
    icon: 'DeviceMobileIcon',
    hoverColor: 'green',
    gradient: 'linear-gradient(to bottom right, rgba(5, 150, 105, 0.2), rgba(37, 99, 235, 0.2))',
    iconGradient: 'linear-gradient(to right, #059669, #2563eb)',
    roleColor: 'text-green-400',
    hasImage: false
  }
];

const TeamSection: React.FC = () => {
  return (
    <section id="team" className="py-24">
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
          {teamMembers.map((member, index) => (
            <div 
              key={member.name}
              className={`p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-${member.hoverColor}-500 hover-glow h-full transition-all duration-300`}
              style={{
                background: member.gradient,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className={`w-24 h-24 rounded-full mx-auto mb-6 overflow-hidden border-2 border-${member.hoverColor}-500 flex items-center justify-center`}
                style={{
                  background: member.hasImage ? member.iconGradient : member.iconGradient
                }}
              >
                {member.hasImage ? (
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <>
                    {member.icon === 'PaintbrushIcon' && <PaintbrushIcon size={48} className="text-white" />}
                    {member.icon === 'DeviceMobileIcon' && <DeviceMobileIcon size={48} className="text-white" />}
                  </>
                )}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{member.name}</h3>
              <p className={`${member.roleColor} mb-4 text-center`}>{member.role}</p>
              <p className="text-gray-400 text-center leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
