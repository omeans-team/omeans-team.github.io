import React from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import LoadingSpinner from './LoadingSpinner';
import { formatNumber } from '../utils/formatters';

interface StatCardProps {
  value: number;
  label: string;
  loading: boolean;
  icon?: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ value, label, loading, icon }) => {
  return (
    <div className="stats-card group hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-2">
        {icon && <div className="text-white-omeans opacity-80">{icon}</div>}
        <div className="text-3xl font-bold text-white-omeans">
          {loading ? (
            <div className="flex items-center space-x-2">
              <LoadingSpinner size="sm" />
              <span className="text-lg">Loading...</span>
            </div>
          ) : (
            formatNumber(value)
          )}
        </div>
      </div>
      <div className="text-gray-omeans text-sm">{label}</div>
    </div>
  );
};

const GitHubStats: React.FC = () => {
  const { stats, loading, error } = useGitHubStats();

  const statsData = [
    {
      value: stats?.totalRepos || 0,
      label: 'Repositories',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      value: stats?.totalCommits || 0,
      label: 'Git Commits',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
      )
    },
    {
      value: stats?.totalLines || 0,
      label: 'Code Lines',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
        </svg>
      )
    },
    {
      value: stats?.totalStars || 0,
      label: 'GitHub Stars',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
        </svg>
      )
    }
  ];

  return (
    <div className="mt-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statsData.map((stat, index) => (
          <StatCard
            key={index}
            value={stat.value}
            label={stat.label}
            loading={loading}
            icon={stat.icon}
          />
        ))}
      </div>
      
      {error && (
        <div className="col-span-full text-center mt-4">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default GitHubStats;
