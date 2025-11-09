# 🧩 Component Development Guide

A comprehensive guide for developing spectacular, accessible, and performant components for the Component Portfolio.

## 🎯 Development Philosophy

### Core Principles

1. **Spectacular by Default**: Every component should have a "wow factor"
2. **Accessibility First**: WCAG AA compliance is non-negotiable
3. **Performance Optimized**: 60fps animations, minimal bundle impact
4. **Theme Aware**: Perfect experience in both light and dark modes
5. **Mobile First**: Responsive design from 320px to 4K displays

## 📋 Component Checklist

### ✅ Before Development Starts

- [ ] **Design Review**: Component serves a clear purpose
- [ ] **Accessibility Planning**: Keyboard navigation and screen reader support
- [ ] **Performance Budget**: Animation and bundle size considerations
- [ ] **Theme Integration**: Light/dark mode color schemes defined
- [ ] **Responsive Strategy**: Mobile-first breakpoint planning

### ✅ During Development

- [ ] **Code Quality**: Follows SRP, DRY, and SoC principles
- [ ] **Error Handling**: Graceful fallbacks for all failure modes
- [ ] **Immutable Updates**: All state changes follow immutable patterns
- [ ] **TypeScript Ready**: Clear prop interfaces (even if using JS)
- [ ] **Performance Monitoring**: RAF loops, event throttling

### ✅ Before Deployment

- [ ] **Cross-browser Testing**: Chrome, Safari, Firefox, Edge
- [ ] **Device Testing**: Mobile, tablet, desktop
- [ ] **Accessibility Audit**: Screen reader, keyboard navigation
- [ ] **Performance Validation**: Lighthouse scores, Core Web Vitals
- [ ] **Documentation**: Component API, usage examples

## 🏗️ Component Structure Template

### File Organization

```
src/demos/[category]/[ComponentName]/
├── index.jsx                 # Export barrel
├── [ComponentName]Core.jsx   # Main component logic
├── ControlPanel.jsx          # Interactive controls
└── README.md                 # Component documentation
```

### Core Component Template

```jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useTheme } from '../../../contexts/ThemeContext'

/**
 * [ComponentName]Core - Main component with spectacular visual effects
 * 
 * @param {Object} props - Component configuration
 * @param {number} props.intensity - Effect intensity (0-100)
 * @param {string} props.color - Primary color
 * @param {boolean} props.animated - Enable animations
 */
export default function ComponentNameCore({
  intensity = 50,
  color = '#8b5cf6',
  animated = true,
  ...props
}) {
  const { theme } = useTheme()
  const [isActive, setIsActive] = useState(false)

  // Memoized calculations for performance
  const computedStyles = useMemo(() => {
    return {
      transform: `scale(${1 + intensity * 0.01})`,
      filter: `hue-rotate(${intensity * 3.6}deg)`,
      // ... other computed styles
    }
  }, [intensity])

  // Animation loop with RAF
  useEffect(() => {
    if (!animated) return

    let animationId
    const animate = () => {
      // Animation logic here
      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [animated, intensity])

  // Event handlers with throttling
  const handleInteraction = useCallback((event) => {
    // Throttled interaction logic
  }, [])

  return (
    <div 
      className={`component-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      style={computedStyles}
      onMouseMove={handleInteraction}
      role="img"
      aria-label="Interactive visual component"
      tabIndex={0}
    >
      {/* Component content */}
    </div>
  )
}
```

### Control Panel Template

```jsx
import React from 'react'
import { useTheme } from '../../../contexts/ThemeContext'
import Button from '../../../components/ui/Button'

/**
 * ControlPanel - Interactive controls for component configuration
 */
export default function ControlPanel({ config, onChange, onReset }) {
  const { theme } = useTheme()

  const handleSliderChange = (key, value) => {
    onChange(prev => ({ ...prev, [key]: value }))
  }

  const presets = [
    { name: 'Subtle', config: { intensity: 25, color: '#8b5cf6' } },
    { name: 'Dramatic', config: { intensity: 85, color: '#ec4899' } },
    // ... more presets
  ]

  return (
    <div className={`control-panel ${theme === 'dark' ? 'dark' : 'light'}`}>
      {/* Sliders */}
      <div className="control-group">
        <label htmlFor="intensity-slider">Intensity</label>
        <input
          id="intensity-slider"
          type="range"
          min="0"
          max="100"
          value={config.intensity}
          onChange={(e) => handleSliderChange('intensity', Number(e.target.value))}
          className="slider"
          aria-describedby="intensity-description"
        />
        <span id="intensity-description" className="sr-only">
          Controls the visual intensity from subtle to dramatic
        </span>
      </div>

      {/* Presets */}
      <div className="preset-group">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            onClick={() => onChange(preset.config)}
            variant="secondary"
            size="sm"
          >
            {preset.name}
          </Button>
        ))}
      </div>

      {/* Reset */}
      <Button onClick={onReset} variant="outline">
        Reset to Default
      </Button>
    </div>
  )
}
```

### Page Component Template

```jsx
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import ComponentNameCore from '../demos/[category]/[ComponentName]/ComponentNameCore'
import ControlPanel from '../demos/[category]/[ComponentName]/ControlPanel'

const initialConfig = {
  intensity: 50,
  color: '#8b5cf6',
  animated: true,
  // ... other default values
}

export default function ComponentNamePage() {
  const { theme } = useParams()
  const [config, setConfig] = useState(initialConfig)

  const handleReset = () => {
    setConfig(initialConfig)
  }

  const handleExport = () => {
    const configJson = JSON.stringify(config, null, 2)
    const blob = new Blob([configJson], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    
    const a = document.createElement('a')
    a.href = url
    a.download = 'component-config.json'
    a.click()
    
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page-layout">
      {/* Header */}
      <header className="page-header">
        <h1>Component Name</h1>
        <p>Spectacular description of what this component does</p>
      </header>

      {/* Demo Area */}
      <main className="demo-area">
        <ComponentNameCore {...config} />
      </main>

      {/* Controls */}
      <aside className="controls-area">
        <ControlPanel 
          config={config} 
          onChange={setConfig}
          onReset={handleReset}
        />
        
        <button onClick={handleExport} className="export-btn">
          Export Configuration
        </button>
      </aside>
    </div>
  )
}
```

## 🎨 Styling Guidelines

### Theme-Aware Styling

```jsx
// Always use theme context for colors
const { theme } = useTheme()

// Dynamic className patterns
<div className={`base-styles ${
  theme === 'dark' 
    ? 'bg-slate-900 text-white border-slate-700' 
    : 'bg-white text-slate-900 border-slate-200'
}`}>

// CSS custom properties for complex themes
<div 
  style={{
    '--primary-color': theme === 'dark' ? '#a855f7' : '#7c3aed',
    '--background-gradient': theme === 'dark' 
      ? 'linear-gradient(135deg, #1e293b, #312e81)' 
      : 'linear-gradient(135deg, #f8fafc, #e0e7ff)'
  }}
  className="themed-component"
>
```

### Responsive Design Patterns

```jsx
// Mobile-first responsive classes
<div className="
  w-full h-64           // Mobile base
  md:w-1/2 md:h-80      // Tablet
  lg:w-1/3 lg:h-96      // Desktop
  xl:w-1/4 xl:h-[28rem] // Large desktop
">

// Responsive text sizing
<h1 className="text-2xl md:text-4xl lg:text-6xl xl:text-8xl">

// Responsive spacing
<div className="p-4 md:p-6 lg:p-8 xl:p-12">
```

### Animation Guidelines

```css
/* Smooth transitions */
.component {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .component {
    transition: none;
    animation: none;
  }
}

/* GPU acceleration for transforms */
.animated-element {
  will-change: transform;
  transform: translateZ(0); /* Force GPU layer */
}

/* Performance-optimized animations */
@keyframes optimized-fade {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## 🔧 Performance Best Practices

### Animation Optimization

```javascript
// Use RAF for smooth animations
useEffect(() => {
  let animationId
  let lastTime = 0
  
  const animate = (currentTime) => {
    // Throttle to 60fps
    if (currentTime - lastTime >= 16.67) {
      // Animation logic here
      lastTime = currentTime
    }
    
    animationId = requestAnimationFrame(animate)
  }
  
  animationId = requestAnimationFrame(animate)
  return () => cancelAnimationFrame(animationId)
}, [dependencies])

// Throttle expensive operations
const throttledHandler = useMemo(
  () => throttle((event) => {
    // Expensive operation
  }, 16), // 60fps
  []
)
```

### Memory Management

```javascript
// Clean up event listeners
useEffect(() => {
  const handleResize = () => { /* handler */ }
  
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// Clean up intervals/timeouts
useEffect(() => {
  const interval = setInterval(() => { /* logic */ }, 1000)
  return () => clearInterval(interval)
}, [])

// Clean up object URLs
const handleExport = () => {
  const url = URL.createObjectURL(blob)
  // ... use URL
  URL.revokeObjectURL(url) // Always clean up
}
```

## ♿ Accessibility Implementation

### Keyboard Navigation

```jsx
// Focusable interactive elements
<div
  tabIndex={0}
  role="button"
  aria-label="Interactive component"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleActivation()
    }
  }}
>

// Arrow key navigation
const handleKeyDown = (e) => {
  switch (e.key) {
    case 'ArrowUp':
      e.preventDefault()
      moveUp()
      break
    case 'ArrowDown':
      e.preventDefault()
      moveDown()
      break
    // ... other directions
  }
}
```

### Screen Reader Support

```jsx
// Descriptive labels and roles
<div
  role="img"
  aria-label="Animated wave visualization with adjustable amplitude"
  aria-describedby="wave-description"
>
  <span id="wave-description" className="sr-only">
    Interactive wave animation. Use controls to adjust wave height and frequency.
    Current amplitude: {amplitude}%. Current frequency: {frequency} waves.
  </span>
</div>

// Live regions for dynamic updates
<div aria-live="polite" aria-atomic="true" className="sr-only">
  {announceText}
</div>
```

### Focus Management

```jsx
// Focus indicators
.focusable:focus {
  outline: 2px solid var(--focus-color);
  outline-offset: 2px;
}

// Focus trapping in modals
const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  
  const firstElement = focusableElements[0]
  const lastElement = focusableElements[focusableElements.length - 1]
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault()
        lastElement.focus()
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault()
        firstElement.focus()
      }
    }
  })
}
```

## 🧪 Testing Strategy

### Component Testing

```javascript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from '../contexts/ThemeContext'
import ComponentName from './ComponentName'

const renderWithTheme = (component, theme = 'dark') => {
  return render(
    <ThemeProvider value={{ theme, toggleTheme: jest.fn() }}>
      {component}
    </ThemeProvider>
  )
}

describe('ComponentName', () => {
  it('renders with correct theme styles', () => {
    renderWithTheme(<ComponentName />, 'dark')
    expect(screen.getByRole('img')).toHaveClass('dark-theme')
  })
  
  it('responds to configuration changes', async () => {
    const { rerender } = renderWithTheme(<ComponentName intensity={50} />)
    
    rerender(<ComponentName intensity={100} />)
    
    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveStyle('transform: scale(2)')
    })
  })
  
  it('handles keyboard navigation', () => {
    renderWithTheme(<ComponentName />)
    const component = screen.getByRole('img')
    
    component.focus()
    fireEvent.keyDown(component, { key: 'ArrowUp' })
    
    // Assert expected behavior
  })
})
```

### Performance Testing

```javascript
// Animation frame rate testing
const measureFPS = (callback, duration = 1000) => {
  let frames = 0
  let startTime = performance.now()
  
  const countFrames = () => {
    frames++
    const elapsed = performance.now() - startTime
    
    if (elapsed < duration) {
      requestAnimationFrame(countFrames)
    } else {
      const fps = (frames / elapsed) * 1000
      callback(fps)
    }
  }
  
  requestAnimationFrame(countFrames)
}

// Memory leak testing
const checkMemoryLeaks = async (component) => {
  const initialMemory = performance.memory?.usedJSHeapSize
  
  // Mount and unmount component multiple times
  for (let i = 0; i < 100; i++) {
    const { unmount } = render(component)
    unmount()
  }
  
  // Force garbage collection (if available)
  if (global.gc) global.gc()
  
  const finalMemory = performance.memory?.usedJSHeapSize
  const memoryIncrease = finalMemory - initialMemory
  
  expect(memoryIncrease).toBeLessThan(1024 * 1024) // Less than 1MB increase
}
```

## 📚 Documentation Standards

### Component README Template

```markdown
# ComponentName

Brief description of what the component does and its spectacular features.

## Features

- ✨ **Feature 1**: Description
- 🎨 **Feature 2**: Description
- ⚡ **Feature 3**: Description

## Usage

\`\`\`jsx
import ComponentName from './ComponentName'

function App() {
  return (
    <ComponentName
      intensity={75}
      color="#8b5cf6"
      animated={true}
    />
  )
}
\`\`\`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| intensity | number | 50 | Effect intensity (0-100) |
| color | string | '#8b5cf6' | Primary color |
| animated | boolean | true | Enable animations |

## Accessibility

- ✅ Keyboard navigation with arrow keys
- ✅ Screen reader support with descriptive labels
- ✅ Focus indicators for keyboard users
- ✅ Reduced motion support

## Performance

- 🚀 60fps animations with RAF
- 💾 Optimized memory usage
- 📱 Mobile-optimized interactions
```

### Code Comments

```javascript
/**
 * Generates spectacular wave paths using cubic Bézier curves
 * 
 * @param {number} width - Canvas width in pixels
 * @param {number} height - Canvas height in pixels
 * @param {number} amplitude - Wave amplitude (0-100)
 * @param {number} frequency - Number of wave cycles
 * @param {number} separation - Layer separation percentage (0-100)
 * @returns {string} SVG path string
 */
function generateWavePath(width, height, amplitude, frequency, separation) {
  // Implementation with detailed inline comments
}
```

## 🚀 Deployment Checklist

### Pre-deployment

- [ ] **Code Review**: Peer review completed
- [ ] **Testing**: All tests passing
- [ ] **Performance**: Lighthouse score > 90
- [ ] **Accessibility**: WCAG AA compliant
- [ ] **Browser Testing**: Cross-browser compatibility verified
- [ ] **Mobile Testing**: Responsive design validated

### Post-deployment

- [ ] **Monitoring**: Performance metrics tracking
- [ ] **User Feedback**: Collect and analyze usage data
- [ ] **Documentation**: Update live documentation
- [ ] **Showcase**: Add to component gallery

---

Following this guide ensures every component in the portfolio maintains the highest standards of quality, accessibility, and performance while delivering spectacular user experiences.
