export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section with Video Background Effect */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom right, rgba(30, 58, 138, 0.2), rgba(88, 28, 135, 0.2), #000000)'
        }}>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1), transparent 50%)'
          }}></div>
          <div className="absolute inset-0" style={{
            background: 'radial-gradient(circle at 80% 20%, rgba(147, 51, 234, 0.1), transparent 50%)'
          }}></div>
        </div>
        
        {/* Floating Particles Effect */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
          <div className="mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 gradient-text">
              OMEANS
            </h1>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 mb-8">
              ENGINE
            </h2>
          </div>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            The most powerful and accessible real-time 3D creation tool.
            <br />
            <span className="text-blue-400">Built by developers, for developers.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="button-primary">
              DOWNLOAD NOW
            </button>
            <button className="button-secondary">
              LEARN MORE
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(55, 65, 81, 0.5)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl md:text-2xl font-bold text-white">OMEANS</div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="nav-link">FEATURES</a>
              <a href="#team" className="nav-link">TEAM</a>
              <a href="#services" className="nav-link">SERVICES</a>
              <a href="#contact" className="nav-link">CONTACT</a>
            </div>
            <button className="button-primary text-sm px-4 py-2">
              GET STARTED
            </button>
          </div>
        </div>
      </nav>

      {/* Features Section */}
      <section id="features" className="py-24" style={{
        background: 'linear-gradient(to bottom, #000000, #111827)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              POWERFUL FEATURES
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Experience the next generation of development tools designed for modern applications
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-blue-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #2563eb, #7c3aed)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Lightning Fast</h3>
              <p className="text-gray-400 leading-relaxed">
                Built with performance in mind. Experience blazing fast development and deployment speeds.
              </p>
            </div>

            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-purple-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #7c3aed, #ec4899)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Innovative</h3>
              <p className="text-gray-400 leading-relaxed">
                Cutting-edge technologies and innovative solutions for modern development challenges.
              </p>
            </div>

            <div className="glass-effect p-8 lg:p-10 rounded-xl hover:border-green-500 hover-glow h-full">
              <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6" style={{
                background: 'linear-gradient(to right, #059669, #2563eb)'
              }}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Secure</h3>
              <p className="text-gray-400 leading-relaxed">
                Enterprise-grade security with advanced protection and compliance standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              MEET THE TEAM
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              The brilliant minds behind Omeans Engine
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="group relative h-full">
              <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-blue-500 hover-glow h-full" style={{
                background: 'linear-gradient(to bottom right, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))'
              }}>
                <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
                  background: 'linear-gradient(to right, #2563eb, #7c3aed)'
                }}>
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Alex Chen</h3>
                <p className="text-blue-400 mb-4 text-center">Lead Developer</p>
                <p className="text-gray-400 text-center leading-relaxed">
                  Full-stack developer with expertise in React, Node.js, and cloud technologies.
                </p>
              </div>
            </div>

            <div className="group relative h-full">
              <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-purple-500 hover-glow h-full" style={{
                background: 'linear-gradient(to bottom right, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))'
              }}>
                <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
                  background: 'linear-gradient(to right, #7c3aed, #ec4899)'
                }}>
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Sarah Kim</h3>
                <p className="text-purple-400 mb-4 text-center">UI/UX Designer</p>
                <p className="text-gray-400 text-center leading-relaxed">
                  Creative designer focused on user experience and modern design principles.
                </p>
              </div>
            </div>

            <div className="group relative h-full">
              <div className="p-8 lg:p-10 rounded-xl border border-gray-700 hover:border-green-500 hover-glow h-full" style={{
                background: 'linear-gradient(to bottom right, rgba(5, 150, 105, 0.2), rgba(37, 99, 235, 0.2))'
              }}>
                <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center" style={{
                  background: 'linear-gradient(to right, #059669, #2563eb)'
                }}>
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8c0 2.208-1.79 4-3.998 4-2.208 0-3.998-1.792-3.998-4s1.79-4 3.998-4c2.208 0 3.998 1.792 3.998 4z"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 text-center">Mike Johnson</h3>
                <p className="text-green-400 mb-4 text-center">Mobile Developer</p>
                <p className="text-gray-400 text-center leading-relaxed">
                  Specialized in React Native and Flutter for cross-platform mobile development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24" style={{
        background: 'linear-gradient(to bottom, #111827, #000000)'
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
              OUR SERVICES
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Comprehensive solutions for modern development needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-blue-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#2563eb'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Web Development</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Modern, responsive web applications</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-purple-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#7c3aed'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Mobile Apps</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Cross-platform mobile solutions</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-green-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#059669'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">UI/UX Design</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Beautiful and intuitive interfaces</p>
            </div>

            <div className="glass-effect p-6 lg:p-8 rounded-xl hover:border-pink-500 hover-glow h-full">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{
                backgroundColor: '#ec4899'
              }}>
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Performance</h3>
              <p className="text-gray-400 text-sm leading-relaxed">Optimized for speed and efficiency</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text">
            GET STARTED
          </h2>
          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Ready to experience the power of Omeans Engine? Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="button-primary">
              DOWNLOAD NOW
            </button>
            <button className="button-secondary">
              CONTACT US
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-white mb-6">OMEANS</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                The most powerful and accessible development platform.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Products</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="footer-link">Web Development</a></li>
                <li><a href="#" className="footer-link">Mobile Apps</a></li>
                <li><a href="#" className="footer-link">UI/UX Design</a></li>
                <li><a href="#" className="footer-link">Consulting</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Resources</h4>
              <ul className="space-y-3 text-sm text-gray-400">
                <li><a href="#" className="footer-link">Documentation</a></li>
                <li><a href="#" className="footer-link">Tutorials</a></li>
                <li><a href="#" className="footer-link">Community</a></li>
                <li><a href="#" className="footer-link">Support</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="social-link">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a href="#" className="social-link">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Omeans Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
