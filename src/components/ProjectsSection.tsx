"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  GlobeIcon, 
  DeviceMobileIcon, 
  DeviceDesktopIcon, 
  CodeIcon,
  StarIcon,
  RepoIcon,
  RocketIcon,
  BookIcon,
  ZapIcon,
  DatabaseIcon,
  CloudIcon,
  ShieldIcon,
  SyncIcon,
  PackageIcon,
  PaintbrushIcon,
  ImageIcon,
  ToolsIcon,
  PlayIcon,
  GitBranchIcon,
  ContainerIcon,
  CreditCardIcon,
  KeyIcon,
  AlertIcon
} from '@primer/octicons-react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'Web' | 'Mobile' | 'Game' | 'Desktop' | 'API';
  technologies: string[];
  liveDemo?: string;
  githubRepo?: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'Omeans Engine Portfolio',
    description: 'Modern portfolio website built with Next.js, TypeScript, and Tailwind CSS. Features GitHub integration, interactive animations, and responsive design.',
    image: '/logo.png',
    category: 'Web',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'React'],
    liveDemo: 'https://omeans-team.github.io',
    githubRepo: 'https://github.com/omeans-team/omeans-team.github.io',
    featured: true
  },
  {
    id: '2',
    title: 'Unity3D Game Project',
    description: '3D adventure game developed with Unity3D and C#. Features advanced AI, physics simulation, and immersive gameplay mechanics.',
    image: '/video-scrubber/hero.jpg',
    category: 'Game',
    technologies: ['Unity3D', 'C#', 'Blender', 'Photoshop'],
    githubRepo: 'https://github.com/omeans-team/game-project',
    featured: true
  },
  {
    id: '3',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with Laravel backend and React frontend. Includes payment integration, inventory management, and admin dashboard.',
    image: '/video-scrubber/ice.jpg',
    category: 'Web',
    technologies: ['Laravel', 'React', 'MySQL', 'Stripe API'],
    liveDemo: 'https://ecommerce-demo.omeans.com',
    githubRepo: 'https://github.com/omeans-team/ecommerce-platform',
    featured: false
  },
  {
    id: '4',
    title: 'Mobile Task Manager',
    description: 'Cross-platform mobile app for task management built with React Native. Features offline sync, push notifications, and cloud backup.',
    image: '/video-scrubber/hero.jpg',
    category: 'Mobile',
    technologies: ['React Native', 'Firebase', 'Redux', 'AsyncStorage'],
    liveDemo: 'https://expo.dev/@omeans-team/task-manager',
    githubRepo: 'https://github.com/omeans-team/task-manager-app',
    featured: false
  },
  {
    id: '5',
    title: 'REST API Service',
    description: 'Scalable REST API built with Node.js and Express. Features JWT authentication, rate limiting, and comprehensive documentation.',
    image: '/video-scrubber/ice.jpg',
    category: 'API',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveDemo: 'https://api.omeans.com/docs',
    githubRepo: 'https://github.com/omeans-team/rest-api',
    featured: false
  },
  {
    id: '6',
    title: 'Desktop Music Player',
    description: 'Cross-platform desktop application for music playback with advanced audio processing and playlist management.',
    image: '/video-scrubber/hero.jpg',
    category: 'Desktop',
    technologies: ['Electron', 'React', 'Web Audio API', 'SQLite'],
    githubRepo: 'https://github.com/omeans-team/music-player',
    featured: false
  }
];

const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTechnology, setSelectedTechnology] = useState<string>('All');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState<boolean>(false);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());
  const [showAllTechnologies, setShowAllTechnologies] = useState<boolean>(false);
  const [showAllCategories, setShowAllCategories] = useState<boolean>(false);

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  const technologies = ['All', ...Array.from(new Set(projects.flatMap(project => project.technologies)))];

  const filteredProjects = projects.filter(project => {
    const categoryMatch = selectedCategory === 'All' || project.category === selectedCategory;
    const technologyMatch = selectedTechnology === 'All' || project.technologies.includes(selectedTechnology);
    const featuredMatch = !showFeaturedOnly || project.featured;
    return categoryMatch && technologyMatch && featuredMatch;
  });

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            PROJECTS SHOWCASE
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
            A collection of my best work across different technologies and platforms
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium mr-2">Category:</span>
            <div className="flex flex-wrap gap-2">
              {/* Desktop: Show all categories */}
              <div className="hidden md:flex flex-wrap gap-2">
                {categories.map(category => (
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

          {/* Technology Filter */}
          <div className="flex flex-wrap gap-2">
            <span className="text-gray-300 font-medium mr-2">Technology:</span>
            <div className="flex flex-wrap gap-2">
              {/* Desktop: Show more technologies */}
              <div className="hidden md:flex flex-wrap gap-2">
                {technologies.slice(0, showAllTechnologies ? technologies.length : 3).map(technology => (
                  <button
                    key={technology}
                    onClick={() => setSelectedTechnology(technology)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTechnology === technology
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {technology}
                  </button>
                ))}
                {technologies.length > 12 && (
                  <button
                    onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                  >
                    {showAllTechnologies ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
              
              {/* Mobile: Show limited technologies */}
              <div className="md:hidden flex flex-wrap gap-2">
                {technologies.slice(0, showAllTechnologies ? technologies.length : 3).map(technology => (
                  <button
                    key={technology}
                    onClick={() => setSelectedTechnology(technology)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedTechnology === technology
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {technology}
                  </button>
                ))}
                {technologies.length > 3 && (
                  <button
                    onClick={() => setShowAllTechnologies(!showAllTechnologies)}
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 bg-orange-500 text-white hover:bg-orange-600 shadow-lg"
                  >
                    {showAllTechnologies ? 'Show Less' : 'Show More'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center gap-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                showFeaturedOnly ? 'bg-green-500' : 'bg-gray-600'
              }`}>
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showFeaturedOnly ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </div>
              <span className="ml-3 text-gray-300 text-sm font-medium">Featured Only</span>
            </label>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`glass-effect rounded-xl overflow-hidden hover:border-blue-500 hover-glow group cursor-pointer transition-all duration-300 ${
                project.featured ? 'ring-2 ring-yellow-500 ring-opacity-50' : ''
              }`}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
                             {/* Project Image */}
               <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                 {!imageErrors.has(project.id) ? (
                   <Image
                     src={project.image}
                     alt={project.title}
                     fill
                     className="object-cover transition-transform duration-300 group-hover:scale-105"
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     onError={() => {
                       setImageErrors(prev => new Set(prev).add(project.id));
                     }}
                   />
                                   ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                      <div className="text-center text-gray-200">
                                                 <div className="text-6xl mb-3 opacity-80 flex justify-center">
                           {project.category === 'Web' && <GlobeIcon size={48} className="text-blue-400" />}
                           {project.category === 'Game' && <PlayIcon size={48} className="text-green-400" />}
                           {project.category === 'Mobile' && <DeviceMobileIcon size={48} className="text-purple-400" />}
                           {project.category === 'Desktop' && <DeviceDesktopIcon size={48} className="text-orange-400" />}
                           {project.category === 'API' && <CodeIcon size={48} className="text-red-400" />}
                         </div>
                        <div className="text-sm font-semibold opacity-90 mb-1">{project.title}</div>
                                                 <div className="text-xs opacity-70 flex items-center justify-center gap-1">
                           <RepoIcon size={12} />
                           {project.category} Project
                         </div>
                      </div>
                    </div>
                  )}
                 
                 {/* Overlay with project info */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="absolute bottom-4 left-4 right-4">
                     <h4 className="text-white font-semibold text-sm mb-1">{project.title}</h4>
                     <p className="text-gray-200 text-xs line-clamp-2">{project.description}</p>
                   </div>
                 </div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                    ⭐ Featured
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  {project.category}
                </div>

                                 {/* Hover Overlay */}
                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                   <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                     {project.liveDemo && (
                       <a
                         href={project.liveDemo}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                         onClick={(e) => e.stopPropagation()}
                       >
                                                   <RocketIcon size={16} />
                          Live Demo
                       </a>
                     )}
                     {project.githubRepo && (
                       <a
                         href={project.githubRepo}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
                         onClick={(e) => e.stopPropagation()}
                       >
                                                   <RepoIcon size={16} />
                          GitHub
                       </a>
                     )}
                   </div>
                 </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                                 {/* Technologies */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {project.technologies.map(tech => (
                     <span
                       key={tech}
                       className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded flex items-center gap-1"
                     >
                                               <span className="flex items-center">
                          {tech === 'Next.js' && <ZapIcon size={12} className="text-yellow-400" />}
                          {tech === 'React' && <PackageIcon size={12} className="text-blue-400" />}
                          {tech === 'TypeScript' && <BookIcon size={12} className="text-blue-500" />}
                          {tech === 'JavaScript' && <CodeIcon size={12} className="text-yellow-300" />}
                          {tech === 'Node.js' && <CodeIcon size={12} className="text-green-500" />}
                          {tech === 'Python' && <CodeIcon size={12} className="text-blue-600" />}
                          {tech === 'Laravel' && <CodeIcon size={12} className="text-red-500" />}
                          {tech === 'MySQL' && <DatabaseIcon size={12} className="text-blue-400" />}
                          {tech === 'MongoDB' && <DatabaseIcon size={12} className="text-green-400" />}
                          {tech === 'Firebase' && <CloudIcon size={12} className="text-orange-400" />}
                          {tech === 'Unity3D' && <PlayIcon size={12} className="text-gray-400" />}
                          {tech === 'C#' && <CodeIcon size={12} className="text-purple-500" />}
                          {tech === 'React Native' && <DeviceMobileIcon size={12} className="text-blue-400" />}
                          {tech === 'Electron' && <DeviceDesktopIcon size={12} className="text-blue-500" />}
                          {tech === 'Tailwind CSS' && <PaintbrushIcon size={12} className="text-cyan-400" />}
                          {tech === 'Git' && <GitBranchIcon size={12} className="text-orange-500" />}
                          {tech === 'Docker' && <ContainerIcon size={12} className="text-blue-500" />}
                          {tech === 'AWS' && <CloudIcon size={12} className="text-yellow-500" />}
                          {tech === 'Stripe API' && <CreditCardIcon size={12} className="text-purple-500" />}
                          {tech === 'JWT' && <KeyIcon size={12} className="text-green-400" />}
                          {tech === 'Redux' && <SyncIcon size={12} className="text-purple-400" />}
                          {tech === 'Express' && <CodeIcon size={12} className="text-gray-400" />}
                          {tech === 'Blender' && <PaintbrushIcon size={12} className="text-orange-400" />}
                          {tech === 'Photoshop' && <ImageIcon size={12} className="text-blue-400" />}
                          {tech === 'AsyncStorage' && <DatabaseIcon size={12} className="text-gray-400" />}
                          {tech === 'Web Audio API' && <PlayIcon size={12} className="text-green-400" />}
                          {tech === 'SQLite' && <DatabaseIcon size={12} className="text-blue-400" />}
                          {!['Next.js', 'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Laravel', 'MySQL', 'MongoDB', 'Firebase', 'Unity3D', 'C#', 'React Native', 'Electron', 'Tailwind CSS', 'Git', 'Docker', 'AWS', 'Stripe API', 'JWT', 'Redux', 'Express', 'Blender', 'Photoshop', 'AsyncStorage', 'Web Audio API', 'SQLite'].includes(tech) && <ToolsIcon size={12} className="text-gray-400" />}
                        </span>
                       {tech}
                     </span>
                   ))}
                 </div>

                                 {/* Action Buttons */}
                 <div className="flex gap-2">
                   {project.liveDemo && (
                     <a
                       href={project.liveDemo}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 bg-blue-500 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                     >
                                               <RocketIcon size={16} />
                        View Demo
                     </a>
                   )}
                   {project.githubRepo && (
                     <a
                       href={project.githubRepo}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="flex-1 bg-gray-700 text-white text-center py-2 px-4 rounded-lg text-sm font-medium hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
                     >
                                               <BookIcon size={16} />
                        View Code
                     </a>
                   )}
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-300 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your filters to see more projects</p>
          </div>
        )}

        {/* Project Statistics */}
        <div className="mt-16 grid md:grid-cols-4 gap-6">
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {projects.length}
            </div>
            <div className="text-gray-400 text-sm">Total Projects</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {projects.filter(p => p.featured).length}
            </div>
            <div className="text-gray-400 text-sm">Featured Projects</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {Array.from(new Set(projects.flatMap(p => p.technologies))).length}
            </div>
            <div className="text-gray-400 text-sm">Technologies Used</div>
          </div>
          <div className="glass-effect p-6 rounded-xl text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">
              {Array.from(new Set(projects.map(p => p.category))).length}
            </div>
            <div className="text-gray-400 text-sm">Project Categories</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="glass-effect p-8 rounded-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interested in working together?
            </h3>
            <p className="text-gray-400 mb-6">
              Let's discuss your next project and bring your ideas to life with cutting-edge technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="button-primary"
              >
                Get In Touch
              </a>
              <a
                href="https://github.com/omeans-team"
                target="_blank"
                rel="noopener noreferrer"
                className="button-secondary"
              >
                View More on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
