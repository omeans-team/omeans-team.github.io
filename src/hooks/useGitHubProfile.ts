import { useState, useEffect } from 'react';
import { getCachedData, setCachedData } from '../utils/cache';

interface GitHubProfile {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  location: string;
  email: string;
  blog: string;
  twitter_username: string;
  company: string;
  hireable: boolean;
}

interface UseGitHubProfileReturn {
  profile: GitHubProfile | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  forceRefresh: () => void;
}

export function useGitHubProfile(): UseGitHubProfileReturn {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cache profile data in localStorage
  const getCachedProfile = (): GitHubProfile | null => {
    return getCachedData<GitHubProfile>('github-profile', 7200000); // 2 hours cache
  };

  const setCachedProfile = (profile: GitHubProfile) => {
    setCachedData('github-profile', profile);
  };

  const fetchProfile = async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      
      // Check cache first (unless force refresh)
      if (!forceRefresh) {
        const cachedProfile = getCachedProfile();
        if (cachedProfile) {
          console.log('Using cached profile');
          setProfile(cachedProfile);
          setLoading(false);
          return;
        }
      }
      
      // Get username from environment or use default
      const username = process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'omeans-team';
      
      console.log('Environment variable NEXT_PUBLIC_GITHUB_USERNAME:', process.env.NEXT_PUBLIC_GITHUB_USERNAME);
      console.log('Using username:', username);
      console.log('Fetching GitHub profile for:', username);
      
      // Prepare headers
      const headers: Record<string, string> = {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Omeans-Team-Website'
      };

      // Add token if available (for higher rate limit)
      const token = process.env.GITHUB_TOKEN;
      if (token) {
        headers['Authorization'] = `token ${token}`;
        console.log('Using GitHub token for higher rate limit');
      }

      // Fetch profile directly from GitHub API
      const response = await fetch(`https://api.github.com/users/${username}`, {
        headers
      });
      
      console.log('Profile response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('GitHub API error:', errorText);
        
        // If rate limited, use fallback data
        if (response.status === 403) {
          console.log('Rate limited, using fallback profile');
          const fallbackProfile: GitHubProfile = {
            login: 'omeans-team',
            name: 'Aris Hadisopiyan',
            bio: 'Professional web development team',
            avatar_url: 'https://avatars.githubusercontent.com/u/47584746?v=4',
            public_repos: 119,
            public_gists: 1,
            followers: 4,
            following: 2,
            created_at: '2019-02-13T03:40:04Z',
            updated_at: new Date().toISOString(),
            location: 'Majalengka, West Java, Indonesia',
            email: 'aris.hadisopiyan@gmail.com', // Email from GitHub profile
            blog: 'https://omeans-team.github.io/',
            twitter_username: '',
            company: '',
            hireable: true
          };
          setProfile(fallbackProfile);
          setCachedProfile(fallbackProfile);
          setLoading(false);
          return;
        }
        
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Fetched profile data:', data);
      console.log('Profile login:', data.login);
      console.log('Profile name:', data.name);
      console.log('Profile email:', data.email);
      console.log('Profile location:', data.location);
      setProfile(data);
      setCachedProfile(data);
    } catch (err) {
      console.error('Error in fetchProfile:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      // Set fallback profile data
      const fallbackProfile: GitHubProfile = {
        login: 'omeans-team',
        name: 'Aris Hadisopiyan',
        bio: 'Professional web development team',
        avatar_url: 'https://avatars.githubusercontent.com/u/47584746?v=4',
        public_repos: 119,
        public_gists: 1,
        followers: 4,
        following: 2,
        created_at: '2019-02-13T03:40:04Z',
        updated_at: new Date().toISOString(),
        location: 'Majalengka, West Java, Indonesia',
        email: 'aris.hadisopiyan@gmail.com', // Email from GitHub profile
        blog: 'https://omeans-team.github.io/',
        twitter_username: '',
        company: '',
        hireable: true
      };
      setProfile(fallbackProfile);
      setCachedProfile(fallbackProfile);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    error,
    refetch: () => fetchProfile(false),
    forceRefresh: () => fetchProfile(true)
  };
}
