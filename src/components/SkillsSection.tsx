"use client";

import React, { useState } from 'react';
import { useGoogleAnalytics } from '@/hooks/useGoogleAnalytics';
import { 
  PackageIcon,
  ZapIcon,
  BookIcon,
  CodeIcon,
  GlobeIcon,
  PaintbrushIcon,
  DatabaseIcon,
  CloudIcon,
  PlayIcon,
  DeviceMobileIcon,
  GitBranchIcon,
  ContainerIcon,
  ImageIcon,
  StarIcon,
  RocketIcon,
  AlertIcon,
  ToolsIcon
} from '@primer/octicons-react';

interface Skill {
  name: string;
  category: string;
  proficiency: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  icon: string;
  color: string;
}

const skills: Skill[] = [
  // Frontend
  { name: 'React', category: 'Frontend', proficiency: 'Expert', icon: 'PackageIcon', color: '#61DAFB' },
  { name: 'Next.js', category: 'Frontend', proficiency: 'Advanced', icon: 'ZapIcon', color: '#000000' },
  { name: 'TypeScript', category: 'Frontend', proficiency: 'Advanced', icon: 'BookIcon', color: '#3178C6' },
  { name: 'JavaScript', category: 'Frontend', proficiency: 'Expert', icon: 'CodeIcon', color: '#F7DF1E' },
  { name: 'HTML5', category: 'Frontend', proficiency: 'Expert', icon: 'GlobeIcon', color: '#E34F26' },
  { name: 'CSS3', category: 'Frontend', proficiency: 'Advanced', icon: 'PaintbrushIcon', color: '#1572B6' },
  { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Advanced', icon: 'PaintbrushIcon', color: '#06B6D4' },
  
  // Backend
  { name: 'Node.js', category: 'Backend', proficiency: 'Advanced', icon: 'CodeIcon', color: '#339933' },
  { name: 'PHP', category: 'Backend', proficiency: 'Advanced', icon: 'CodeIcon', color: '#777BB4' },
  { name: 'Laravel', category: 'Backend', proficiency: 'Advanced', icon: 'CodeIcon', color: '#FF2D20' },
  { name: 'Yii2', category: 'Backend', proficiency: 'Intermediate', icon: 'ZapIcon', color: '#FF0000' },
  { name: 'Express.js', category: 'Backend', proficiency: 'Advanced', icon: 'CodeIcon', color: '#000000' },
  
  // Database
  { name: 'MySQL', category: 'Database', proficiency: 'Advanced', icon: 'DatabaseIcon', color: '#4479A1' },
  { name: 'MongoDB', category: 'Database', proficiency: 'Intermediate', icon: 'DatabaseIcon', color: '#47A248' },
  { name: 'PostgreSQL', category: 'Database', proficiency: 'Intermediate', icon: 'DatabaseIcon', color: '#336791' },
  
  // Game Development
  { name: 'Unity3D', category: 'Game Dev', proficiency: 'Advanced', icon: 'PlayIcon', color: '#000000' },
  { name: 'C#', category: 'Game Dev', proficiency: 'Advanced', icon: 'CodeIcon', color: '#239120' },
  { name: 'Blender', category: 'Game Dev', proficiency: 'Intermediate', icon: 'PaintbrushIcon', color: '#F5792A' },
  
  // Mobile
  { name: 'React Native', category: 'Mobile', proficiency: 'Intermediate', icon: 'DeviceMobileIcon', color: '#61DAFB' },
  { name: 'Flutter', category: 'Mobile', proficiency: 'Beginner', icon: 'DeviceMobileIcon', color: '#02569B' },
  
  // Tools & Others
  { name: 'Git', category: 'Tools', proficiency: 'Advanced', icon: 'GitBranchIcon', color: '#F05032' },
  { name: 'Docker', category: 'Tools', proficiency: 'Intermediate', icon: 'ContainerIcon', color: '#2496ED' },
  { name: 'AWS', category: 'Tools', proficiency: 'Intermediate', icon: 'CloudIcon', color: '#FF9900' },
  { name: 'Figma', category: 'Tools', proficiency: 'Intermediate', icon: 'ImageIcon', color: '#F24E1E' },
];

const proficiencyColors = {
  Beginner: '#EF4444',
  Intermediate: '#F59E0B',
  Advanced: '#10B981',
  Expert: '#3B82F6'
};

const proficiencyLevels = {
  Beginner: 25,
  Intermediate: 50,
  Advanced: 75,
  Expert: 100
};

const SkillsSection: React.FC = () => {
  const { trackEvent, trackButtonClick } = useGoogleAnalytics();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProficiency, setSelectedProficiency] = useState<string>('All');
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);
  const [showAllProficiencies, setShowAllProficiencies] = useState<boolean>(false);

  const categories = ['All', ...Array.from(new Set(skills.map(skill => skill.category)))];
  const proficiencies = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const filteredSkills = skills.filter(skill => {
    const categoryMatch = selectedCategory === 'All' || skill.category === selectedCategory;
    const proficiencyMatch = selectedProficiency === 'All' || skill.proficiency === selectedProficiency;
    return categoryMatch && proficiencyMatch;
  });

  return (
    <section id="skills" className="py-24" style={{
      background: 'linear-gradient(to bottom, #111827, #1f2937)'
    }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            SKILLS & TECHNOLOGIES
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            My technical expertise across various domains and proficiency levels
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium mr-2">Categories:</span>
            <div className="flex flex-wrap gap-2">
              {/* Desktop: Show all categories */}
              <div className="hidden md:flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      trackEvent('filter_change', 'skills', `category_${category.toLowerCase()}`);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              
              {/* Mobile: Show limited categories with "show more" */}
              <div className="md:hidden flex flex-wrap gap-2">
                {categories.slice(0, showAllCategories ? categories.length : 3).map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
                {categories.length > 3 && (
                  <button
                    onClick={() => setShowAllCategories(!showAllCategories)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-green-500 text-white hover:bg-green-600 shadow-lg"
                  >
                    {showAllCategories ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Proficiency Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium mr-2">Level:</span>
            <div className="flex flex-wrap gap-2">
              {/* Desktop: Show all proficiencies */}
              <div className="hidden md:flex flex-wrap gap-2">
                {proficiencies.map(proficiency => (
                  <button
                    key={proficiency}
                    onClick={() => {
                      setSelectedProficiency(proficiency);
                      trackEvent('filter_change', 'skills', `proficiency_${proficiency.toLowerCase()}`);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedProficiency === proficiency
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {proficiency}
                  </button>
                ))}
              </div>
              
              {/* Mobile: Show limited proficiencies with "show more" */}
              <div className="md:hidden flex flex-wrap gap-2">
                {proficiencies.slice(0, showAllProficiencies ? proficiencies.length : 3).map(proficiency => (
                  <button
                    key={proficiency}
                    onClick={() => setSelectedProficiency(proficiency)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedProficiency === proficiency
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {proficiency}
                  </button>
                ))}
                {proficiencies.length > 3 && (
                  <button
                    onClick={() => setShowAllProficiencies(!showAllProficiencies)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                  >
                    {showAllProficiencies ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="glass-effect p-6 rounded-xl hover:border-blue-500 hover-glow group cursor-pointer transition-all duration-300"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {/* Skill Icon */}
              <div className="text-center mb-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor: `${skill.color}20`,
                    border: `2px solid ${skill.color}40`
                  }}
                >
                  {skill.icon === 'PackageIcon' && <PackageIcon size={32} className="text-blue-400" />}
                  {skill.icon === 'ZapIcon' && <ZapIcon size={32} className="text-yellow-400" />}
                  {skill.icon === 'BookIcon' && <BookIcon size={32} className="text-blue-500" />}
                  {skill.icon === 'CodeIcon' && <CodeIcon size={32} className="text-gray-300" />}
                  {skill.icon === 'GlobeIcon' && <GlobeIcon size={32} className="text-blue-400" />}
                  {skill.icon === 'PaintbrushIcon' && <PaintbrushIcon size={32} className="text-cyan-400" />}
                  {skill.icon === 'DatabaseIcon' && <DatabaseIcon size={32} className="text-blue-400" />}
                  {skill.icon === 'CloudIcon' && <CloudIcon size={32} className="text-yellow-500" />}
                  {skill.icon === 'PlayIcon' && <PlayIcon size={32} className="text-green-400" />}
                  {skill.icon === 'DeviceMobileIcon' && <DeviceMobileIcon size={32} className="text-purple-400" />}
                  {skill.icon === 'GitBranchIcon' && <GitBranchIcon size={32} className="text-orange-500" />}
                  {skill.icon === 'ContainerIcon' && <ContainerIcon size={32} className="text-blue-500" />}
                  {skill.icon === 'ImageIcon' && <ImageIcon size={32} className="text-blue-400" />}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{skill.name}</h3>
                                 <span 
                   className="text-xs font-medium px-2 py-1 rounded-full"
                   style={{
                     backgroundColor: `${proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]}20`,
                     color: proficiencyColors[skill.proficiency as keyof typeof proficiencyColors],
                     border: `1px solid ${proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]}40`
                   }}
                 >
                   {skill.proficiency}
                 </span>
              </div>

                             {/* Progress Bar */}
               <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                 <div
                   className="h-2 rounded-full transition-all duration-1000 ease-out"
                   style={{
                     width: `${proficiencyLevels[skill.proficiency as keyof typeof proficiencyLevels]}%`,
                     backgroundColor: proficiencyColors[skill.proficiency as keyof typeof proficiencyColors]
                   }}
                 />
               </div>

              {/* Category Badge */}
              <div className="text-center">
                <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                  {skill.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No skills found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more skills</p>
          </div>
        )}

                 {/* Skills Summary */}
         <div className="mt-16 grid md:grid-cols-4 gap-6">
           {proficiencies.slice(1).map(proficiency => {
             const count = skills.filter(skill => skill.proficiency === proficiency).length;
             return (
               <div key={proficiency} className="glass-effect p-6 rounded-xl text-center">
                 <div 
                   className="text-3xl font-bold mb-2"
                   style={{ color: proficiencyColors[proficiency as keyof typeof proficiencyColors] }}
                 >
                   {count}
                 </div>
                 <div className="text-gray-400 text-sm">{proficiency} Skills</div>
               </div>
             );
           })}
         </div>

        {/* Certifications Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Certifications & Achievements</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass-effect p-6 rounded-xl hover:border-green-500 hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <StarIcon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Unity Certified Developer</h4>
                  <p className="text-gray-400 text-sm">2023</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Certified Unity developer with expertise in 3D game development and C# programming.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl hover:border-blue-500 hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <BookIcon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">React Developer Certification</h4>
                  <p className="text-gray-400 text-sm">2022</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Advanced React development skills with modern hooks and state management.
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl hover:border-purple-500 hover-glow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4">
                  <RocketIcon size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Full-Stack Development</h4>
                  <p className="text-gray-400 text-sm">2021</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                Comprehensive full-stack development skills from frontend to backend.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
