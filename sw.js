// Service Worker untuk intercept GitHub requests
const CACHE_NAME = 'omeans-team-cache-v1';
const GITHUB_DOMAINS = [
  'github.com',
  'avatars.githubusercontent.com',
  'api.github.com'
];

// Install event
self.addEventListener('install', (event) => {
  console.log('Service Worker installed');
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Fetch event - intercept GitHub requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Check if request is to GitHub domains
  const isGitHubRequest = GITHUB_DOMAINS.some(domain => 
    url.hostname.includes(domain)
  );
  
  if (isGitHubRequest) {
    event.respondWith(handleGitHubRequest(event.request));
  }
});

// Handle GitHub requests
async function handleGitHubRequest(request) {
  try {
    // Skip invalid URLs
    if (request.url.includes('github.com/omeans-team.png')) {
      console.log('Skipping invalid GitHub URL:', request.url);
      return new Response('', {
        status: 404,
        statusText: 'Not Found'
      });
    }
    
    // Create new request without cookies
    const newRequest = new Request(request.url, {
      method: request.method,
      headers: {
        ...Object.fromEntries(request.headers.entries()),
        'Cookie': '', // Remove cookies
      },
      credentials: 'omit', // Don't send cookies
      mode: 'cors'
    });
    
    // Fetch without cookies
    const response = await fetch(newRequest);
    
    // Clone response untuk caching
    const responseClone = response.clone();
    
    // Cache successful responses
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request.url, responseClone);
    }
    
    return response;
  } catch (error) {
    console.log('GitHub request failed, trying cache:', error);
    
    // Try to get from cache
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(request.url);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return fallback for images
    if (request.url.includes('avatars.githubusercontent.com')) {
      return new Response('', {
        status: 404,
        statusText: 'Not Found'
      });
    }
    
    // Return empty response for other GitHub requests
    return new Response('', {
      status: 404,
      statusText: 'Not Found'
    });
  }
}

// Clear cache
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME);
  }
});
