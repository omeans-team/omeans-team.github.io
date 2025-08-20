import React from 'react';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import { formatNumber } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';

interface GitHubProfileStatsProps {
  className?: string;
}

const GitHubProfileStats: React.FC<GitHubProfileStatsProps> = ({ className = '' }) => {
  const { profile, loading, error } = useGitHubProfile();

  if (loading) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-dark-omeans rounded-lg p-4 animate-pulse">
            <div className="h-8 bg-dark-omeans rounded mb-2"></div>
            <div className="h-4 bg-dark-omeans rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
        <div className="bg-dark-omeans rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white-omeans mb-1">25</div>
          <div className="text-sm text-gray-omeans">Repositories</div>
        </div>
        <div className="bg-dark-omeans rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white-omeans mb-1">5</div>
          <div className="text-sm text-gray-omeans">Gists</div>
        </div>
        <div className="bg-dark-omeans rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white-omeans mb-1">45</div>
          <div className="text-sm text-gray-omeans">Followers</div>
        </div>
        <div className="bg-dark-omeans rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-white-omeans mb-1">12</div>
          <div className="text-sm text-gray-omeans">Following</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      <div className="bg-dark-omeans rounded-lg p-4 text-center hover:bg-dark-omeans-hover transition-colors">
        <div className="text-2xl font-bold text-white-omeans mb-1">
          {formatNumber(profile.public_repos)}
        </div>
        <div className="text-sm text-gray-omeans">Repositories</div>
      </div>
      <div className="bg-dark-omeans rounded-lg p-4 text-center hover:bg-dark-omeans-hover transition-colors">
        <div className="text-2xl font-bold text-white-omeans mb-1">
          {formatNumber(profile.public_gists)}
        </div>
        <div className="text-sm text-gray-omeans">Gists</div>
      </div>
      <div className="bg-dark-omeans rounded-lg p-4 text-center hover:bg-dark-omeans-hover transition-colors">
        <div className="text-2xl font-bold text-white-omeans mb-1">
          {formatNumber(profile.followers)}
        </div>
        <div className="text-sm text-gray-omeans">Followers</div>
      </div>
      <div className="bg-dark-omeans rounded-lg p-4 text-center hover:bg-dark-omeans-hover transition-colors">
        <div className="text-2xl font-bold text-white-omeans mb-1">
          {formatNumber(profile.following)}
        </div>
        <div className="text-sm text-gray-omeans">Following</div>
      </div>
    </div>
  );
};

export default GitHubProfileStats;
