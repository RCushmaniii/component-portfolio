import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Code2, Palette, Zap, Search, Filter, Star, GitBranch, Box, Layers, ChevronDown, Menu, X, Github, Twitter, ExternalLink } from 'lucide-react';

const ComponentPortfolioLanding = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse for gradient effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const categories = [
    { id: 'all', name: 'All Components', count: 127, icon: Layers },
    { id: 'animation', name: 'Animations', count: 34, icon: Sparkles },
    { id: 'forms', name: 'Forms & Inputs', count: 28, icon: Box },
    { id: 'navigation', name: 'Navigation', count: 22, icon: GitBranch },
    { id: 'data', name: 'Data Display', count: 19, icon: Code2 },
    { id: 'feedback', name: 'Feedback', count: 24, icon: Zap }
  ];

  const featuredComponents = [
    {
      id: 1,
      name: 'Liquid Morphing Card',
      category: 'animation',
      description: 'Fluid animations with dynamic blob morphing effects',
      tags: ['React', 'Framer Motion', 'WebGL'],
      complexity: 'Advanced',
      popularity: 98
    },
    {
      id: 2,
      name: 'Neural Network Form',
      category: 'forms',
      description: 'AI-powered form validation with predictive inputs',
      tags: ['React', 'TensorFlow.js', 'TypeScript'],
      complexity: 'Expert',
      popularity: 94
    },
    {
      id: 3,
      name: 'Quantum Navigation',
      category: 'navigation',
      description: 'Multi-dimensional navigation with parallax transitions',
      tags: ['React', 'Three.js', 'GSAP'],
      complexity: 'Advanced',
      popularity: 89
    },
    {
      id: 4,
      name: 'Holographic Data Grid',
      category: 'data',
      description: 'Futuristic data visualization with 3D depth effects',
      tags: ['React', 'D3.js', 'WebGL'],
      complexity: 'Advanced',
      popularity: 92
    },
    {
      id: 5,
      name: 'Particle Feedback System',
      category: 'feedback',
      description: 'Interactive particle effects for user feedback',
      tags: ['React', 'Canvas API', 'Physics'],
      complexity: 'Intermediate',
      popularity: 87
    },
    {
      id: 6,
      name: 'Magnetic Button Collection',
      category: 'animation',
      description: 'Buttons with magnetic cursor interactions',
      tags: ['React', 'CSS3', 'JavaScript'],
      complexity: 'Intermediate',
      popularity: 95
    }
  ];

  const filteredComponents = featuredComponents.filter(component => {
    const matchesCategory = activeCategory === 'all' || component.category === activeCategory;
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          component.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Dynamic gradient background that follows mouse */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)',
            left: mousePosition.x - 400,
            top: mousePosition.y - 400,
            transform: 'translate3d(0,0,0)'
          }}
        />
      </div>

      {/* Navigation Header */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Component Storm
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#components" className="text-gray-300 hover:text-white transition-colors">Components</a>
            <a href="#categories" className="text-gray-300 hover:text-white transition-colors">Categories</a>
            <a href="#docs" className="text-gray-300 hover:text-white transition-colors">Documentation</a>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105">
              Get Started
            </button>
            <Github className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Animated background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-400">127 Production-Ready Components</span>
              </div>
              
              {/* Main Heading */}
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6">
                Build
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-orange-500">
                  Extraordinary
                </span>
                Interfaces
              </h1>
              
              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed max-w-2xl">
                A curated collection of cutting-edge React components that push the boundaries of modern web design.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center">
                  Explore Components
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all duration-300">
                  View on GitHub
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 mt-12 pt-12 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">2.4k+</div>
                  <div className="text-gray-500 text-sm mt-1">GitHub Stars</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">98%</div>
                  <div className="text-gray-500 text-sm mt-1">Accessibility Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">60fps</div>
                  <div className="text-gray-500 text-sm mt-1">Performance</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual Element */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Animated floating cards */}
                <div className="absolute inset-0">
                  {/* Card 1 */}
                  <div className="absolute top-0 right-0 w-48 h-32 bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur border border-blue-500/20 rounded-2xl p-4 animate-float-slow">
                    <Code2 className="w-6 h-6 text-blue-400 mb-2" />
                    <div className="text-sm text-gray-400">Clean Code</div>
                    <div className="text-xs text-gray-500 mt-1">TypeScript Ready</div>
                  </div>
                  
                  {/* Card 2 */}
                  <div className="absolute bottom-20 left-0 w-48 h-32 bg-gradient-to-br from-orange-600/20 to-orange-800/20 backdrop-blur border border-orange-500/20 rounded-2xl p-4 animate-float-medium">
                    <Palette className="w-6 h-6 text-orange-400 mb-2" />
                    <div className="text-sm text-gray-400">Customizable</div>
                    <div className="text-xs text-gray-500 mt-1">Tailwind + CSS-in-JS</div>
                  </div>
                  
                  {/* Card 3 */}
                  <div className="absolute top-1/3 right-1/4 w-48 h-32 bg-gradient-to-br from-purple-600/20 to-purple-800/20 backdrop-blur border border-purple-500/20 rounded-2xl p-4 animate-float-fast">
                    <Zap className="w-6 h-6 text-purple-400 mb-2" />
                    <div className="text-sm text-gray-400">Lightning Fast</div>
                    <div className="text-xs text-gray-500 mt-1">Optimized Bundle</div>
                  </div>
                  
                  {/* Central orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full blur-3xl opacity-50 animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-500">
          <span className="text-xs mb-2">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative py-20" id="categories">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-400">Find the perfect component for your project</p>
          </div>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-gradient-to-br from-blue-600/20 to-orange-600/20 border-blue-500/40'
                      : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 transition-colors ${
                    activeCategory === category.id ? 'text-blue-400' : 'text-gray-400 group-hover:text-white'
                  }`} />
                  <div className="text-sm font-medium mb-1">{category.name}</div>
                  <div className="text-xs text-gray-500">{category.count} items</div>
                  {activeCategory === category.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-orange-600/10 rounded-2xl blur-xl" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Components Section */}
      <section className="relative py-20" id="components">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header with Search */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-2">Featured Components</h2>
              <p className="text-xl text-gray-400">Hand-picked excellence for modern applications</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          {/* Components Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map((component) => (
              <div
                key={component.id}
                onMouseEnter={() => setHoveredCard(component.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="group relative"
              >
                <div className="relative p-6 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all duration-300 h-full">
                  {/* Hover gradient effect */}
                  {hoveredCard === component.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-orange-600/10 rounded-2xl blur-xl" />
                  )}
                  
                  {/* Card Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-orange-400 transition-all">
                        {component.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm">{component.popularity}</span>
                      </div>
                    </div>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-4 line-clamp-2">{component.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {component.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <span className={`text-xs px-3 py-1 rounded-full ${
                        component.complexity === 'Expert' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                          : component.complexity === 'Advanced'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : 'bg-green-500/20 text-green-400 border border-green-500/30'
                      }`}>
                        {component.complexity}
                      </span>
                      <button className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors">
                        <span className="text-sm">View Demo</span>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all">
              Load More Components
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Component Storm?</h2>
            <p className="text-xl text-gray-400">Built for developers who demand excellence</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-blue-500/30 transition-all h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Lightning Performance</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every component is optimized for 60fps performance with lazy loading and code splitting built-in.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-orange-500/30 transition-all h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-700 rounded-xl flex items-center justify-center mb-6">
                  <Palette className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Fully Customizable</h3>
                <p className="text-gray-400 leading-relaxed">
                  Every component adapts to your brand with comprehensive theming and style customization options.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative p-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl hover:border-purple-500/30 transition-all h-full">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center mb-6">
                  <Code2 className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-semibold mb-3">Developer First</h3>
                <p className="text-gray-400 leading-relaxed">
                  TypeScript support, comprehensive docs, and copy-paste integration for the ultimate DX.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-orange-600/20 to-purple-600/20 blur-3xl" />
            
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur border border-white/10 rounded-3xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Build Something
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400 mt-2">
                  Extraordinary?
                </span>
              </h2>
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                Join thousands of developers using Component Storm to create stunning, performant interfaces.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transform hover:scale-105 transition-all">
                  Get Started Free
                </button>
                <button className="px-8 py-4 bg-white/5 backdrop-blur border border-white/10 rounded-xl font-semibold text-lg hover:bg-white/10 transition-all">
                  Browse Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold">Component Storm</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Documentation</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">Discord</a>
            </div>
            
            <div className="text-sm text-gray-500">
              © 2024 Component Storm. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-20px) rotate(3deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
        }
        .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 5s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ComponentPortfolioLanding;