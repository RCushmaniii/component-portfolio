export const categories = [
  {
    id: 'visual-effects',
    name: 'Visual Effects',
    description: 'Stunning visual components with advanced graphics and animations',
    icon: 'Sparkles',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: 'interactions',
    name: 'Interactions',
    description: 'Interactive components with gesture controls and user feedback',
    icon: 'MousePointerClick',
    color: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    description: 'Charts, graphs, and data presentation components',
    icon: 'BarChart3',
    color: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'forms',
    name: 'Forms & Inputs',
    description: 'Advanced form controls and input components',
    icon: 'FileText',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'layouts',
    name: 'Layouts',
    description: 'Responsive layout components and grid systems',
    icon: 'Layout',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    id: 'animations',
    name: 'Animations',
    description: 'Motion and transition effects',
    icon: 'Zap',
    color: 'from-cyan-600 to-blue-600',
  },
  {
    id: 'hero-sections',
    name: 'Hero Sections',
    description: 'Landing page hero components with dynamic layouts',
    icon: 'Image',
    color: 'from-orange-500 to-amber-500',
  },
]

export const components = [
  {
    id: 'liquid-refraction-lens',
    name: 'Liquid Refraction Lens',
    category: 'visual-effects',
    description: 'Interactive magnifying water droplet with realistic light refraction physics using SVG filters',
    tags: ['SVG', 'Physics', 'Interactive', 'Accessibility'],
    difficulty: 'advanced',
    status: 'production-ready',
    thumbnail: '/images/refraction-thumb.webp',
    demoPath: '/demo/liquid-refraction-lens',
    features: [
      'Realistic refraction physics',
      'Momentum-based movement',
      'Dynamic intensity adjustment',
      'Liquid wobble effect',
      'Keyboard navigation',
      '60fps performance',
    ],
    technologies: ['React', 'SVG Filters', 'Canvas API', 'TailwindCSS'],
    accessibility: {
      keyboard: true,
      screenReader: true,
      reducedMotion: true,
    },
  },
  {
    id: 'overlapping-hero',
    name: 'Overlapping Hero',
    category: 'hero-sections',
    description: 'A hero section where the featured image extends beyond its container using negative margins, creating visual depth with wave effects',
    tags: ['Hero', 'Overlapping', 'Wave Effects', 'AI Theme'],
    difficulty: 'intermediate',
    status: 'production-ready',
    thumbnail: '/images/overlapping-hero-thumb.webp',
    demoPath: '/demo/overlapping-hero',
    features: [
      'Image position control (left/right/center)',
      'Adjustable overlap intensity',
      'Wave bottom effect',
      'Fade-out image effect',
      'AI/productivity themed content',
      'Floating UI elements',
      'Responsive design',
    ],
    technologies: ['React', 'TailwindCSS', 'CSS Masks', 'SVG'],
    accessibility: {
      keyboard: true,
      screenReader: true,
      reducedMotion: true,
    },
  },
  // Placeholder for future components
  {
    id: 'particle-system',
    name: 'Particle System',
    category: 'visual-effects',
    description: 'GPU-accelerated particle effects with customizable behaviors',
    tags: ['WebGL', 'Particles', 'Performance'],
    difficulty: 'advanced',
    status: 'coming-soon',
    thumbnail: '/images/particles-thumb.webp',
    demoPath: '/demo/particle-system',
    features: [
      'GPU acceleration',
      'Multiple emitter types',
      'Physics simulation',
      'Custom behaviors',
    ],
    technologies: ['React', 'WebGL', 'Three.js'],
    accessibility: {
      keyboard: false,
      screenReader: false,
      reducedMotion: true,
    },
  },
  {
    id: 'drag-and-drop',
    name: 'Drag & Drop Builder',
    category: 'interactions',
    description: 'Flexible drag-and-drop interface with snap-to-grid and collision detection',
    tags: ['Drag', 'Drop', 'Builder'],
    difficulty: 'intermediate',
    status: 'coming-soon',
    thumbnail: '/images/dnd-thumb.webp',
    demoPath: '/demo/drag-and-drop',
    features: [
      'Snap to grid',
      'Collision detection',
      'Undo/redo support',
      'Touch support',
    ],
    technologies: ['React', 'DnD Kit', 'Framer Motion'],
    accessibility: {
      keyboard: true,
      screenReader: true,
      reducedMotion: true,
    },
  },
]

export const getComponentById = (id) => {
  return components.find(comp => comp.id === id)
}

export const getComponentsByCategory = (categoryId) => {
  return components.filter(comp => comp.category === categoryId)
}

export const getCategoryById = (id) => {
  return categories.find(cat => cat.id === id)
}
