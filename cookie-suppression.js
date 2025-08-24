// Cookie suppression script - runs before any other scripts
(function() {
  'use strict';
  
  // Store original console methods
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalLog = console.log;
  
  // Immediately suppress ALL console output
  console.warn = function() { return; };
  console.error = function() { return; };
  console.log = function() { return; };
  console.info = function() { return; };
  console.debug = function() { return; };
  
  // Also suppress window.console methods immediately
  if (typeof window !== 'undefined') {
    window.console.warn = function() { return; };
    window.console.error = function() { return; };
    window.console.log = function() { return; };
    window.console.info = function() { return; };
    window.console.debug = function() { return; };
  }
  
  // Function to check if message should be suppressed
  function shouldSuppress(message) {
    if (typeof message !== 'string') return false;
    
         // GitHub cookie warnings
     if (message.includes('_gh_sess') || message.includes('_octo') || message.includes('logged_in')) {
       return true;
     }
     
     // Google Analytics cookie warnings
     if (message.includes('_ga') || message.includes('_ga_6GJM6TLZMR')) {
       return true;
     }
    
    // General cookie rejections
    if (message.includes('Cookie') && message.includes('rejected')) {
      return true;
    }
    
    // Cross-site context
    if (message.includes('cross-site context')) {
      return true;
    }
    
    // SameSite issues
    if (message.includes('SameSite')) {
      return true;
    }
    
    // Any cookie warning
    if (message.toLowerCase().includes('cookie') && message.toLowerCase().includes('rejected')) {
      return true;
    }
    
    // GitHub domain errors
    if (message.includes('github.com/omeans-team.png')) {
      return true;
    }
    
    // Service Worker errors
    if (message.includes('ServiceWorker') || message.includes('FetchEvent')) {
      return true;
    }
    
    // Network errors
    if (message.includes('NetworkError') || message.includes('NS_ERROR_INTERCEPTION_FAILED')) {
      return true;
    }
    
    return false;
  }
  
  // Override console.warn
  console.warn = function(...args) {
    if (shouldSuppress(args[0])) {
      return; // Suppress the warning
    }
    originalWarn.apply(console, args);
  };
  
  // Override console.error
  console.error = function(...args) {
    if (shouldSuppress(args[0])) {
      return; // Suppress the error
    }
    originalError.apply(console, args);
  };
  
  // Override console.log
  console.log = function(...args) {
    if (shouldSuppress(args[0])) {
      return; // Suppress the log
    }
    originalLog.apply(console, args);
  };
  
  // Also override window.console methods
  if (typeof window !== 'undefined') {
    window.console.warn = console.warn;
    window.console.error = console.error;
    window.console.log = console.log;
  }
  
  // Prevent third-party cookies from being set
  if (typeof document !== 'undefined') {
    // Override document.cookie setter
    const originalDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    if (originalDescriptor) {
      Object.defineProperty(document, 'cookie', {
        ...originalDescriptor,
        set: function(value) {
          try {
            // Add SameSite=Lax if not present
            if (!value.includes('SameSite')) {
              value += '; SameSite=Lax';
            }
            // Remove Secure flag for non-HTTPS
            if (value.includes('Secure') && window.location.protocol !== 'https:') {
              value = value.replace(/;\s*Secure/g, '');
            }
            originalDescriptor.set?.call(this, value);
          } catch (e) {
            // Ignore cookie setting errors
          }
        }
      });
    }
  }
  
  // Clear problematic cookies immediately
  if (typeof document !== 'undefined') {
    const problematicCookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR'];
    problematicCookies.forEach(cookieName => {
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.github.com`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=github.com`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.omeans-team.github.io`;
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=omeans-team.github.io`;
    });
  }
  
  // Suppress success message too
  // console.log('🍪 Cookie suppression script loaded successfully');
})();
