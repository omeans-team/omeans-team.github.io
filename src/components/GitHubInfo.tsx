import React from 'react';
import { useGitHubStats } from '../hooks/useGitHubStats';
import { formatNumber, formatRelativeTime } from '../utils/formatters';
import { getCachedData, setCachedData } from '../utils/cache';

interface Repository {
  name: string;
  description: string;
  stargazers_count: number;
  language: string;
  html_url: string;
  updated_at: string;
}

interface GitHubInfoProps {
  username?: string;
}

const GitHubInfo: React.FC<GitHubInfoProps> = ({ username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'omeans-team' }) => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Cache repositories in localStorage
  const getCachedRepos = (): Repository[] => {
    return getCachedData<Repository[]>('github-repos', 1800000) || []; // 30 minutes cache
  };

  const setCachedRepos = (repos: Repository[]) => {
    setCachedData('github-repos', repos);
  };

  React.useEffect(() => {
    const fetchRepos = async () => {
      try {
        // Check cache first
        const cachedRepos = getCachedRepos();
        if (cachedRepos.length > 0) {
          console.log('Using cached repositories');
          setRepos(cachedRepos);
          setLoading(false);
          return;
        }

        console.log('Fetching recent repositories for:', username);
        
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'Omeans-Team-Website'
          }
        });
        
        console.log('Recent repos response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Found recent repositories:', data.length);
          setRepos(data);
          setCachedRepos(data);
        } else if (response.status === 403) {
          console.log('Rate limited, using fallback repositories');
          // Use fallback data for rate limiting
          const fallbackRepos = [
            {
              name: 'omeans-team.github.io',
              description: 'Official website for Omeans Team',
              stargazers_count: 5,
              language: 'TypeScript',
              html_url: 'https://github.com/omeans-team/omeans-team.github.io',
              updated_at: new Date().toISOString()
            },
            {
              name: 'sample-project',
              description: 'Sample project repository',
              stargazers_count: 3,
              language: 'JavaScript',
              html_url: 'https://github.com/omeans-team/sample-project',
              updated_at: new Date(Date.now() - 86400000).toISOString()
            }
          ];
          setRepos(fallbackRepos);
          setCachedRepos(fallbackRepos);
        } else {
          console.error('Failed to fetch recent repositories:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  const formatDate = (dateString: string) => {
    return formatRelativeTime(dateString);
  };

  if (loading) {
    return (
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-white-omeans mb-4">Recent Repositories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg p-4 animate-pulse stats-card">
              <div className="h-4 rounded mb-2"></div>
              <div className="h-3 rounded mb-2"></div>
              <div className="h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-white-omeans mb-4">Recent Repositories</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className=" bg-dark-omeans box-shadow-omeans-out rounded-lg p-4 hover:bg-dark-omeans-hover transition-colors duration-200 group"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-white-omeans font-medium group-hover:text-orange-omeans transition-colors">
                {repo.name}
              </h4>
              <div className="flex items-center space-x-1 text-gray-400">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                </svg>
                                 <span className="text-sm">{formatNumber(repo.stargazers_count)}</span>
              </div>
            </div>
            {repo.description && (
              <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                {repo.description}
              </p>
            )}
            <div className="flex items-center justify-between text-xs text-gray-500">
              {repo.language && (
                <span className="px-2 py-1 bg-dark-omeans rounded">
                  {repo.language}
                </span>
              )}
              <span>Updated {formatDate(repo.updated_at)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default GitHubInfo;
