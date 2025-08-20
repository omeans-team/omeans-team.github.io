import React, { useState, useRef, useEffect } from 'react';
import { clearCacheByPrefix } from '../utils/cache';

interface ToolsDropdownProps {
  className?: string;
}

const ToolsDropdown: React.FC<ToolsDropdownProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRefresh = () => {
    // Clear GitHub cache and reload page
    clearCacheByPrefix('github');
    window.location.reload();
  };

  const handleForceRefresh = () => {
    // Clear all cache and reload page
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Tools Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="nav-link flex items-center space-x-1 hover:text-blue-400 transition-all duration-300"
        title="Tools & Utilities"
      >
        <span>TOOLS</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-2">
            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200 group"
              title="Refresh GitHub data and clear cache"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-400 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Refresh Data</div>
                <div className="text-xs text-gray-400">Clear GitHub cache & reload</div>
              </div>
            </button>

            {/* Force Refresh Button */}
            <button
              onClick={handleForceRefresh}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-md transition-colors duration-200 group"
              title="Force refresh all data and clear all cache"
            >
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-400 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Force Refresh</div>
                <div className="text-xs text-gray-400">Clear all cache & reload</div>
              </div>
            </button>

            {/* Divider */}
            <div className="border-t border-gray-700 my-2"></div>

            {/* Cache Status */}
            <div className="px-4 py-2">
              <div className="text-xs text-gray-400 mb-1">Cache Status</div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-300">GitHub data cached</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolsDropdown;
