/**
 * Format number with k for thousands
 * Examples: 1000 -> "1k", 1500 -> "1.5k", 1000000 -> "1000k"
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toLocaleString();
};

/**
 * Format number with custom precision
 * Examples: 1234.5678 -> "1.2k" (precision: 1), "1.23k" (precision: 2)
 */
export const formatNumberWithPrecision = (num: number, precision: number = 1): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(precision).replace(/\.0+$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(precision).replace(/\.0+$/, '') + 'k';
  }
  return num.toLocaleString();
};

/**
 * Format bytes to human readable format
 * Examples: 1024 -> "1 KB", 1048576 -> "1 MB"
 */
export const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format date to relative time
 * Examples: "2 hours ago", "3 days ago", "1 month ago"
 */
export const formatRelativeTime = (date: Date | string): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - targetDate.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};
