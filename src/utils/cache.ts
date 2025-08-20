/**
 * Cache utility functions for managing localStorage data
 */

interface CacheData<T> {
  data: T;
  timestamp: number;
}

/**
 * Get cached data if it exists and is not expired
 */
export function getCachedData<T>(key: string, maxAge: number = 3600000): T | null {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed: CacheData<T> = JSON.parse(cached);
      const now = Date.now();
      
      if (now - parsed.timestamp < maxAge) {
        return parsed.data;
      } else {
        // Remove expired cache
        localStorage.removeItem(key);
      }
    }
  } catch (error) {
    console.error(`Error reading cached data for key "${key}":`, error);
  }
  return null;
}

/**
 * Set data in cache with timestamp
 */
export function setCachedData<T>(key: string, data: T): void {
  try {
    const cacheData: CacheData<T> = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(key, JSON.stringify(cacheData));
  } catch (error) {
    console.error(`Error setting cached data for key "${key}":`, error);
  }
}

/**
 * Clear specific cache entry
 */
export function clearCache(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing cache for key "${key}":`, error);
  }
}

/**
 * Clear all cache entries that start with a prefix
 */
export function clearCacheByPrefix(prefix: string): void {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error(`Error clearing cache with prefix "${prefix}":`, error);
  }
}

/**
 * Get cache info (age, size)
 */
export function getCacheInfo(key: string): { age: number; exists: boolean } | null {
  try {
    const cached = localStorage.getItem(key);
    if (cached) {
      const parsed: CacheData<any> = JSON.parse(cached);
      const age = Date.now() - parsed.timestamp;
      return { age, exists: true };
    }
    return { age: 0, exists: false };
  } catch (error) {
    console.error(`Error getting cache info for key "${key}":`, error);
    return null;
  }
}
