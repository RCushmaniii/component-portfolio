# 🏗️ Technical Architecture

## Project Overview

The Component Portfolio is a React-based application showcasing advanced UI components with real-time controls and spectacular visual effects.

## 📁 Project Structure

```
component-portfolio/
├── public/
│   ├── images/
│   │   ├── components/OverlappingHero/
│   │   └── logo/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Badge.jsx
│   ├── contexts/
│   │   └── ThemeContext.jsx
│   ├── demos/
│   │   ├── hero-sections/
│   │   │   └── OverlappingHero/
│   │   └── visual-effects/
│   │       └── LiquidRefractionLens/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── OverlappingHeroPage.jsx
│   │   └── LiquidRefractionLensPage.jsx
│   ├── data/
│   │   └── components.js
│   ├── lib/
│   │   └── utils.js
│   └── main.jsx
├── docs/
└── README.md
```

## 🎨 Design System

### Theme Architecture

```javascript
// ThemeContext.jsx
const ThemeContext = createContext({
  theme: 'dark', // 'light' | 'dark'
  toggleTheme: () => {}
})
```

### Color Palette

**Dark Theme:**
- Background: `slate-950` → `purple-950/20` → `slate-950`
- Text: `white`, `slate-100`, `slate-200`
- Accents: `purple-400`, `pink-400`, `cyan-400`

**Light Theme:**
- Background: `slate-50` → `purple-50` → `blue-50`
- Text: `slate-900`, `slate-600`
- Accents: `purple-600`, `pink-600`, `blue-600`

## 🧩 Component Architecture

### Core Principles

1. **Single Responsibility**: Each component has one clear purpose
2. **Composition over Inheritance**: Build complex UIs from simple components
3. **Props Interface**: Clear, typed prop interfaces
4. **State Management**: Local state for UI, context for global state

### Component Patterns

#### 1. Page Components
```javascript
// Pattern: Page components manage state and layout
function OverlappingHeroPage() {
  const [config, setConfig] = useState(initialConfig)
  
  return (
    <div className="page-layout">
      <ComponentCore {...config} />
      <ControlPanel config={config} onChange={setConfig} />
    </div>
  )
}
```

#### 2. Core Components
```javascript
// Pattern: Core components focus on rendering and animation
function OverlappingHeroCore({ waveAmplitude, waveFrequency, ... }) {
  const wavePath = useMemo(() => generateWavePath(props), [props])
  
  return <svg>{/* Render wave */}</svg>
}
```

#### 3. Control Panels
```javascript
// Pattern: Control panels handle user interactions
function ControlPanel({ config, onChange }) {
  const handleSliderChange = (key, value) => {
    onChange(prev => ({ ...prev, [key]: value }))
  }
  
  return <div>{/* Controls */}</div>
}
```

## 🌊 Wave Generation System

### Mathematical Foundation

The wave system uses cubic Bézier curves for smooth, natural-looking waves:

```javascript
function generateWavePath(width, height, amplitude, frequency, separation) {
  const points = []
  const segments = frequency * 2
  
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width
    const baseY = height * 0.7
    const waveY = Math.sin((i / segments) * Math.PI * frequency) * amplitude
    const separationOffset = separation * 0.5 * amplitude
    
    points.push({
      x,
      y: baseY + waveY + separationOffset,
      cp1: { x: x - width/segments/3, y: baseY + waveY * 0.8 },
      cp2: { x: x + width/segments/3, y: baseY + waveY * 0.8 }
    })
  }
  
  return generateSVGPath(points)
}
```

### Wave Presets

Each preset defines a unique wave generation algorithm:

- **Default**: Dramatic flowing curves with alternating peaks
- **Diagonal**: Linear progression with amplitude scaling
- **Mountains**: Peak-focused with sharp transitions
- **Steps**: Quantized levels with smooth connections
- **Zigzag**: Sharp angular patterns

## 💧 Refraction Physics System

### SVG Filter Chain

```xml
<defs>
  <filter id="liquidRefraction">
    <!-- 1. Generate noise pattern -->
    <feTurbulence type="fractalNoise" numOctaves="3" />
    
    <!-- 2. Smooth for liquid effect -->
    <feGaussianBlur stdDeviation="8" />
    
    <!-- 3. Apply distortion -->
    <feDisplacementMap in="SourceGraphic" scale="50" />
    
    <!-- 4. Enhance brightness -->
    <feComponentTransfer>
      <feFuncA type="discrete" tableValues="0 .5 .5 .7 .7 .8 .9 1"/>
    </feComponentTransfer>
  </filter>
</defs>
```

### Physics Engine

```javascript
class RefractionPhysics {
  constructor() {
    this.friction = 0.15
    this.velocity = { x: 0, y: 0 }
    this.position = { x: 0, y: 0 }
  }
  
  update(targetX, targetY) {
    // Velocity-based easing
    this.velocity.x = (targetX - this.position.x) * this.friction
    this.velocity.y = (targetY - this.position.y) * this.friction
    
    // Update position
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    
    // Dynamic scaling based on velocity
    const speed = Math.sqrt(this.velocity.x² + this.velocity.y²)
    this.scale = 1 + speed * 0.1
  }
}
```

## 🎭 Animation System

### Performance Optimizations

1. **RequestAnimationFrame**: Smooth 60fps animations
2. **CSS Containment**: Isolated rendering contexts
3. **GPU Acceleration**: `will-change` hints for transforms
4. **Event Throttling**: Limited to 60fps for mouse events

```javascript
// Optimized animation loop
function animationLoop() {
  const now = performance.now()
  
  // Throttle to 60fps
  if (now - lastFrame < 16.67) {
    requestAnimationFrame(animationLoop)
    return
  }
  
  // Update physics
  physics.update(targetX, targetY)
  
  // Apply transforms
  element.style.transform = `translate(${physics.x}px, ${physics.y}px) scale(${physics.scale})`
  
  lastFrame = now
  requestAnimationFrame(animationLoop)
}
```

### CSS Animation Patterns

```css
/* Floating particles */
@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(180deg); 
  }
}

/* Gradient shifting */
@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

## 🎯 State Management

### Local State Pattern

```javascript
// Component-specific state
const [config, setConfig] = useState({
  waveAmplitude: 60,
  waveFrequency: 2,
  waveSeparation: 25,
  // ... other properties
})

// Immutable updates
const updateConfig = (key, value) => {
  setConfig(prev => ({ ...prev, [key]: value }))
}
```

### Context Pattern

```javascript
// Global theme state
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark')
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

## 📱 Responsive Design System

### Breakpoint Strategy

```javascript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Desktop
  xl: '1280px',  // Large desktop
  '2xl': '1536px' // Ultra-wide
}
```

### Responsive Patterns

```jsx
// Responsive sizing
<h1 className="text-8xl md:text-9xl lg:text-[12rem]">404</h1>

// Responsive layout
<div className="flex flex-col sm:flex-row gap-4">
  <Button>Primary</Button>
  <Button variant="secondary">Secondary</Button>
</div>

// Responsive visibility
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

## 🔧 Build & Deployment

### Vite Configuration

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react']
        }
      }
    }
  }
})
```

### Netlify Deployment

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🧪 Testing Strategy

### Component Testing

```javascript
// Example test structure
describe('OverlappingHero', () => {
  it('generates wave paths correctly', () => {
    const path = generateWavePath(800, 600, 50, 2, 25)
    expect(path).toContain('M')
    expect(path).toContain('C')
  })
  
  it('responds to amplitude changes', () => {
    const { rerender } = render(<OverlappingHero amplitude={50} />)
    const lowPath = screen.getByTestId('wave-path').getAttribute('d')
    
    rerender(<OverlappingHero amplitude={100} />)
    const highPath = screen.getByTestId('wave-path').getAttribute('d')
    
    expect(lowPath).not.toBe(highPath)
  })
})
```

### Performance Testing

- Lighthouse CI integration
- Core Web Vitals monitoring
- Animation frame rate testing
- Memory leak detection

## 🔒 Security Considerations

### Content Security Policy

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               img-src 'self' data:;">
```

### Input Sanitization

```javascript
// Sanitize user inputs
const sanitizeConfig = (config) => {
  return {
    amplitude: Math.max(0, Math.min(100, Number(config.amplitude) || 0)),
    frequency: Math.max(1, Math.min(10, Number(config.frequency) || 1)),
    // ... other validations
  }
}
```

## 📈 Performance Monitoring

### Key Metrics

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Animation Frame Rate**: 60fps

### Optimization Techniques

1. **Code Splitting**: Route-based and component-based
2. **Image Optimization**: WebP format, responsive images
3. **CSS Optimization**: Critical CSS inlining
4. **JavaScript Optimization**: Tree shaking, minification
5. **Caching Strategy**: Service worker implementation

---

This architecture provides a solid foundation for building spectacular, performant, and maintainable React components while following modern web development best practices.
