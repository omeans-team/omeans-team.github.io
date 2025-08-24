// Ultra-aggressive cookie suppression script
(function() {
  'use strict';
  
     // Safe console suppression - only suppress problematic messages
   const originalConsole = {
     warn: console.warn,
     error: console.error,
     log: console.log,
     info: console.info,
     debug: console.debug
   };
   
   // Suppress only problematic console output
   console.warn = function(...args) {
     const message = args.join(' ');
     if (message.includes('Cookie') || message.includes('__TAG_ASSISTANT') || message.includes('googletagmanager')) {
       return;
     }
     return originalConsole.warn.apply(console, args);
   };
   
   console.error = function(...args) {
     const message = args.join(' ');
     if (message.includes('Cookie') || message.includes('__TAG_ASSISTANT') || message.includes('googletagmanager')) {
       return;
     }
     return originalConsole.error.apply(console, args);
   };
   
   // Keep other console methods for debugging
   console.log = originalConsole.log;
   console.info = originalConsole.info;
   console.debug = originalConsole.debug;
   
   // Also handle window.console safely
   if (typeof window !== 'undefined') {
     window.console.warn = console.warn;
     window.console.error = console.error;
     window.console.log = console.log;
     window.console.info = console.info;
     window.console.debug = console.debug;
   }
  
  // Override document.cookie setter to prevent cookie creation
  if (typeof document !== 'undefined') {
    const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie');
    if (originalCookieDescriptor && originalCookieDescriptor.set) {
      Object.defineProperty(document, 'cookie', {
        get: originalCookieDescriptor.get,
        set: function(value) {
                     // Block problematic cookies completely
           const blockedCookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR', '__TAG_ASSISTANT', '__TAG_ASSISTANT_*'];
          const shouldBlock = blockedCookies.some(cookie => value.includes(cookie));
          if (shouldBlock) {
            return; // Don't set the cookie at all
          }
          return originalCookieDescriptor.set.call(this, value);
        }
      });
    }
  }
  
     // Clear problematic cookies safely
   if (typeof document !== 'undefined') {
           const cookies = ['_gh_sess', '_octo', 'logged_in', '_ga', '_ga_6GJM6TLZMR', '__TAG_ASSISTANT', '__TAG_ASSISTANT_*'];
     const domains = ['', '.github.com', 'github.com', '.omeans-team.github.io', 'omeans-team.github.io', '.avatars.githubusercontent.com', 'avatars.githubusercontent.com'];
     
     const clearCookies = () => {
       cookies.forEach(cookie => {
         domains.forEach(domain => {
           try {
             const domainPart = domain ? '; domain=' + domain : '';
             document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/' + domainPart;
             document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict' + domainPart;
             document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax' + domainPart;
             document.cookie = cookie + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure' + domainPart;
           } catch (e) {
             // Ignore individual cookie clearing errors
           }
         });
       });
     };
     
     // Clear immediately
     clearCookies();
     
     // Clear every 5 seconds (less aggressive)
     setInterval(clearCookies, 5000);
   }
  
     // Continuously suppress console methods safely
   const suppressConsole = () => {
     try {
       console.warn = function(...args) {
         const message = args.join(' ');
         if (message.includes('Cookie') || message.includes('__TAG_ASSISTANT') || message.includes('googletagmanager')) {
           return;
         }
         return originalConsole.warn.apply(console, args);
       };
       
       console.error = function(...args) {
         const message = args.join(' ');
         if (message.includes('Cookie') || message.includes('__TAG_ASSISTANT') || message.includes('googletagmanager')) {
           return;
         }
         return originalConsole.error.apply(console, args);
       };
       
       if (typeof window !== 'undefined') {
         window.console.warn = console.warn;
         window.console.error = console.error;
       }
     } catch (e) {
       // Ignore errors
     }
   };
   
   // Suppress immediately and continuously
   suppressConsole();
   setTimeout(suppressConsole, 0);
   setInterval(suppressConsole, 1000);
})();
