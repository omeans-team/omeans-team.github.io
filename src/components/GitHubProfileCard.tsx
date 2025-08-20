import React from 'react';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import LoadingSpinner from './LoadingSpinner';

interface GitHubProfileCardProps {
  className?: string;
}

const GitHubProfileCard: React.FC<GitHubProfileCardProps> = ({ className = '' }) => {
  const { profile, loading, error } = useGitHubProfile();

  if (loading) {
    return (
      <div className={`bg-dark-omeans rounded-lg p-6 ${className}`}>
        <div className="space-y-2">
          <div className="h-6 bg-dark-omeans rounded animate-pulse"></div>
          <div className="h-4 bg-dark-omeans rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-dark-omeans rounded w-1/2 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={`bg-dark-omeans rounded-lg p-6 ${className}`}>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white-omeans mb-2">Omeans Team</h3>
          <p className="text-gray-omeans text-sm mb-4">Professional web development team</p>
          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <span>📍 Jakarta, Indonesia</span>
            <span>🏢 Omeans Team</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-dark-omeans rounded-lg p-6 ${className}`}>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-white-omeans mb-2">
          {profile.name || profile.login}
        </h3>
        {profile.bio && (
          <p className="text-gray-omeans text-sm mb-4">{profile.bio}</p>
        )}
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          {profile.location && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              {profile.location}
            </span>
          )}
          {profile.company && (
            <span className="flex items-center">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10z"/>
              </svg>
              {profile.company}
            </span>
          )}
          {profile.hireable && (
            <span className="flex items-center text-green-400">
              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              Available for hire
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubProfileCard;
