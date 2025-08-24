// Block all external requests at HTML level
(function() {
  'use strict';
  
     // Block all external requests immediately
   const blockedDomains = [
     'github.com',
     'api.github.com', 
     'avatars.githubusercontent.com',
     'googletagmanager.com',
     'google-analytics.com',
     'google.com',
     'fonts.gstatic.com',
     'www.googletagmanager.com',
     'tagmanager.google.com'
   ];
  
  // Override fetch before it's used
  if (typeof window !== 'undefined') {
    const originalFetch = window.fetch;
    window.fetch = function(input, init) {
      const url = typeof input === 'string' ? input : input.toString();
      
      // Block requests to problematic domains
      if (blockedDomains.some(domain => url.includes(domain))) {
        console.log('Blocked external request:', url);
        return Promise.resolve(new Response(JSON.stringify({ blocked: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      
      return originalFetch.call(this, input, init);
    };
  }
  
  // Override XMLHttpRequest
  if (typeof XMLHttpRequest !== 'undefined') {
    const originalOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url, async, username, password) {
      const urlString = typeof url === 'string' ? url : url.toString();
      
      // Block requests to problematic domains
      if (blockedDomains.some(domain => urlString.includes(domain))) {
        console.log('Blocked XHR request:', urlString);
        // Create a mock response
        setTimeout(() => {
          if (this.onreadystatechange) {
            Object.defineProperty(this, 'readyState', { value: 4, writable: false });
            Object.defineProperty(this, 'status', { value: 200, writable: false });
            Object.defineProperty(this, 'responseText', { value: JSON.stringify({ blocked: true }), writable: false });
            this.onreadystatechange.call(this, new Event('readystatechange'));
          }
        }, 0);
        return;
      }
      
      return originalOpen.call(this, method, url, async, username, password);
    };
  }
  
  // Override Image constructor
  if (typeof window !== 'undefined' && window.Image) {
    const originalImage = window.Image;
    window.Image = function(width, height) {
      const img = new originalImage(width, height);
      
      const originalSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
      if (originalSrc) {
        Object.defineProperty(img, 'src', {
          get: originalSrc.get,
          set: function(value) {
            // Block external image requests
            if (blockedDomains.some(domain => value.includes(domain))) {
              console.log('Blocked image request:', value);
              return originalSrc.set?.call(this, '/logo.png');
            }
            return originalSrc.set?.call(this, value);
          }
        });
      }
      
      return img;
    };
  }
  
  // Override document.createElement to intercept img tags
  if (typeof document !== 'undefined') {
    const originalCreateElement = document.createElement;
    document.createElement = function(tagName) {
      const element = originalCreateElement.call(this, tagName);
      
      if (tagName.toLowerCase() === 'img') {
        const originalSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
        if (originalSrc) {
          Object.defineProperty(element, 'src', {
            get: originalSrc.get,
            set: function(value) {
              // Block external image requests
              if (blockedDomains.some(domain => value.includes(domain))) {
                console.log('Blocked img src:', value);
                return originalSrc.set?.call(this, '/logo.png');
              }
              return originalSrc.set?.call(this, value);
            }
          });
        }
      }
      
      return element;
    };
  }
  
  // Block all console output
  const noop = function() { return; };
  console.warn = noop;
  console.error = noop;
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  
  if (typeof window !== 'undefined') {
    window.console.warn = noop;
    window.console.error = noop;
    window.console.log = noop;
    window.console.info = noop;
    window.console.debug = noop;
  }
  
  // Clear problematic cookies immediately
  if (typeof document !== 'undefined') {
    const cookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR'];
    const domains = ['', '.github.com', 'github.com', '.omeans-team.github.io', 'omeans-team.github.io', '.avatars.githubusercontent.com', 'avatars.githubusercontent.com'];
    
    const clearCookies = () => {
      cookies.forEach(cookie => {
        domains.forEach(domain => {
          const domainPart = domain ? '; domain=' + domain : '';
          document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/' + domainPart;
          document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict' + domainPart;
          document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax' + domainPart;
          document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure' + domainPart;
        });
      });
    };
    
    // Clear immediately and continuously
    clearCookies();
    setInterval(clearCookies, 100);
  }
})();
