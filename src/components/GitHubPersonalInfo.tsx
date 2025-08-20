import React from 'react';
import { useGitHubProfile } from '../hooks/useGitHubProfile';
import { formatRelativeTime } from '../utils/formatters';
import LoadingSpinner from './LoadingSpinner';

interface GitHubPersonalInfoProps {
  className?: string;
}

const GitHubPersonalInfo: React.FC<GitHubPersonalInfoProps> = ({ className = '' }) => {
  const { profile, loading, error, refetch, forceRefresh } = useGitHubProfile();

  if (loading) {
    return (
      <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-24 h-4 bg-dark-omeans rounded mr-2"></div>
              <div className="w-32 h-4 bg-dark-omeans rounded"></div>
            </div>
          ))}
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center animate-pulse">
              <div className="w-20 h-4 bg-dark-omeans rounded mr-2"></div>
              <div className="w-40 h-4 bg-dark-omeans rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className={`grid md:grid-cols-2 gap-8 ${className}`}>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Birthday:</span>
            <span className="text-gray-omeans">/ 4th April 1998</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Age:</span>
            <span className="text-gray-omeans">/ 26 Yr</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Residence:</span>
            <span className="text-gray-omeans">/ Indonesia</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Address:</span>
            <span className="text-gray-omeans">/ Jakarta, Indonesia</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">E-mail:</span>
            <span className="text-gray-omeans">/ aris@omeans.com</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Phone:</span>
            <span className="text-gray-omeans">/ +62-812-3456-7890</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Skype:</span>
            <span className="text-gray-omeans">/ aris.hadisopiyan</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Freelance:</span>
            <span className="text-gray-omeans">/ Available</span>
          </div>
        </div>
      </div>
    );
  }

  // Calculate age from created_at
  const calculateAge = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));
    return diffYears;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">GitHub:</span>
            <a 
              href={`https://github.com/${profile.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-omeans hover:text-orange-omeans transition-colors"
            >
              / {profile.login}
            </a>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Member Since:</span>
            <span className="text-gray-omeans">/ {formatDate(profile.created_at)}</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Experience:</span>
            <span className="text-gray-omeans">/ {calculateAge(profile.created_at)} Yr</span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Location:</span>
            <span className="text-gray-omeans">
              / {profile.location && profile.location.trim() ? profile.location : 'Majalengka, West Java, Indonesia'}
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">E-mail:</span>
            <span className="text-gray-omeans">
              / {profile.email && profile.email.trim() ? (
                                 <a 
                   href={`mailto:${profile.email}`}
                   className="hover:text-orange-omeans transition-colors"
                 >
                   {profile.email}
                 </a>
                             ) : (
                 <a 
                   href="mailto:aris.hadisopiyan@gmail.com"
                   className="hover:text-orange-omeans transition-colors"
                 >
                   aris.hadisopiyan@gmail.com
                 </a>
               )}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Website:</span>
            <a 
              href={profile.blog && profile.blog.trim() ? profile.blog : 'https://omeans-team.github.io/'}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-omeans hover:text-orange-omeans transition-colors"
            >
              / {profile.blog && profile.blog.trim() ? profile.blog : 'omeans-team.github.io'}
            </a>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Company:</span>
            <span className="text-gray-omeans">
              / {profile.company && profile.company.trim() ? profile.company : 'Omeans Team'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-bold text-orange-omeans mr-2">Available:</span>
            <span className="text-gray-omeans">
              / {profile.hireable ? 'For Hire' : 'Not Available'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubPersonalInfo;
