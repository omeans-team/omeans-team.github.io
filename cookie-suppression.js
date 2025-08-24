// Ultra-aggressive cookie suppression script
(function() {
  'use strict';
  
  // Immediately suppress ALL console output
  const noop = function() { return; };
  
  // Override console methods
  console.warn = noop;
  console.error = noop;
  console.log = noop;
  console.info = noop;
  console.debug = noop;
  
  // Override window.console methods
  if (typeof window !== 'undefined') {
    window.console.warn = noop;
    window.console.error = noop;
    window.console.log = noop;
    window.console.info = noop;
    window.console.debug = noop;
  }
  
  // Override document.cookie setter to prevent cookie creation
  if (typeof document !== 'undefined') {
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    if (originalCookieDescriptor && originalCookieDescriptor.set) {
      Object.defineProperty(document, 'cookie', {
        get: originalCookieDescriptor.get,
        set: function(value) {
                     // Block problematic cookies completely
           const blockedCookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR', '__TAG_ASSISTANT'];
          const shouldBlock = blockedCookies.some(cookie => value.includes(cookie));
          if (shouldBlock) {
            return; // Don't set the cookie at all
          }
          return originalCookieDescriptor.set.call(this, value);
        }
      });
    }
  }
  
  // Clear problematic cookies immediately and continuously
  if (typeof document !== 'undefined') {
    const cookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR', '__TAG_ASSISTANT'];
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
    
    // Clear immediately
    clearCookies();
    
    // Clear every 100ms
    setInterval(clearCookies, 100);
  }
  
  // Continuously suppress console methods
  const suppressConsole = () => {
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
  };
  
  // Suppress immediately and continuously
  suppressConsole();
  setTimeout(suppressConsole, 0);
  setInterval(suppressConsole, 10);
})();
