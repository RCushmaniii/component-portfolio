# ⚡ Component Portfolio

A curated collection of production-ready, accessible, and performant React components with interactive demos.

![Component Status](https://img.shields.io/badge/status-production--ready-success)
![Browser Support](https://img.shields.io/badge/browsers-Chrome%2090%2B%20%7C%20Safari%2014%2B%20%7C%20Firefox%2088%2B-blue)
![Performance](https://img.shields.io/badge/performance-60fps-brightgreen)

## ✨ Features

### Core Functionality
- **Realistic Refraction Physics**: SVG filter-based distortion that mimics light bending through water
- **Momentum-Based Movement**: Smooth easing with velocity-based physics (not instant cursor following)
- **Dynamic Intensity**: Refraction strength adjusts based on movement speed
- **Liquid Wobble Effect**: Subtle shape morphing during movement

### Visual Effects
- **Caustic Lighting**: Animated light patterns at the blob's rim
- **Progressive Intensity**: Stronger distortion at center, fading toward edges
- **Inner Glow**: Simulates light gathering through the lens
- **Layered Shadows**: Multi-level depth perception

### Accessibility
- ✅ **Keyboard Navigation**: Arrow keys to move, Space/Enter to reset
- ✅ **Screen Reader Support**: Proper ARIA labels and roles
- ✅ **Reduced Motion**: Automatic fallback for users with motion sensitivity
- ✅ **Focus Indicators**: Clear visual feedback for keyboard users
- ✅ **Touch Support**: Full gesture support for mobile devices

### Performance
- **60fps Target**: Optimized animation loop with RAF
- **Throttled Events**: Mouse move limited to 60fps
- **CSS Containment**: Isolated rendering for better performance
- **Will-change Hints**: GPU acceleration for transforms

## 📁 Project Structure

```
component-portfolio/
├── index.html          # Main HTML structure with SVG filters
├── styles.css          # Complete styling with animations
├── script.js           # JavaScript class with physics engine
├── images/
│   └── background-image.webp  # Background image for refraction
└── README.md           # This file
```

## 🚀 Quick Start

### 1. Open the Component

Simply open `index.html` in a modern web browser:

```bash
# Using a local server (recommended)
npx serve .

# Or directly open the file
open index.html  # macOS
start index.html # Windows
```

### 2. Interact with the Lens

- **Mouse**: Hover over the image and drag the droplet
- **Touch**: Tap and drag on mobile devices
- **Keyboard**: Tab to focus, then use arrow keys to move

## 🎨 Customization Guide

### Adjust Refraction Intensity

Edit the SVG filter in `index.html`:

```html
<feDisplacementMap 
  scale="50"  <!-- Change this value (20-100) -->
  ...
/>
```

### Change Blob Size

Modify CSS in `styles.css`:

```css
.refraction-blob {
  width: 220px;  /* Adjust size */
  height: 220px;
}
```

### Adjust Movement Physics

Edit JavaScript in `script.js`:

```javascript
this.friction = 0.15; // Higher = more responsive (0-1)
```

### Customize Colors

Change the caustic light colors:

```css
.blob-caustics {
  background: conic-gradient(
    from 0deg,
    transparent 0%,
    rgba(147, 197, 253, 0.4) 15%,  /* Blue */
    transparent 30%,
    rgba(196, 181, 253, 0.4) 45%,  /* Purple */
    transparent 60%,
    rgba(167, 243, 208, 0.3) 75%,  /* Green */
    transparent 90%
  );
}
```

## 🧪 Testing Checklist

### Functionality Tests
- [ ] Blob follows cursor smoothly
- [ ] Refraction effect visible and realistic
- [ ] Blob hides when cursor leaves gallery
- [ ] Touch gestures work on mobile
- [ ] Keyboard navigation functional
- [ ] No console errors

### Performance Tests
- [ ] Maintains 60fps during drag
- [ ] No memory leaks (check DevTools)
- [ ] Smooth on mobile devices
- [ ] No layout shifts

### Accessibility Tests
- [ ] Screen reader announces controls
- [ ] Keyboard focus visible
- [ ] Reduced motion mode works
- [ ] Color contrast sufficient
- [ ] Touch targets ≥44px

### Browser Compatibility
- [ ] Chrome/Edge 90+
- [ ] Safari 14+
- [ ] Firefox 88+
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## 🔧 Technical Details

### SVG Filter Chain

The refraction effect uses a 5-step SVG filter:

1. **feTurbulence**: Generates fractal noise pattern
2. **feGaussianBlur**: Smooths the noise for liquid-like effect
3. **feDisplacementMap**: Applies the distortion to the image
4. **feComponentTransfer**: Brightens the refracted area
5. **feConvolveMatrix**: Sharpens edges for clarity

### Physics Engine

The momentum system uses:
- **Velocity-based easing**: `velocity = (target - current) * friction`
- **Continuous animation**: RequestAnimationFrame loop
- **Shape morphing**: Dynamic scale based on velocity vector

### Performance Optimizations

```javascript
// Throttling
if (now - lastMoveTime < 16) return; // 60fps cap

// CSS containment
contain: layout style paint;

// GPU acceleration
will-change: transform, left, top;
```

## 🐛 Troubleshooting

### Blob not visible
- Check that `background-image.webp` exists in `/images/`
- Verify browser supports SVG filters
- Check console for errors

### Poor performance
- Reduce `scale` value in displacement map (try 30-40)
- Lower `numOctaves` in feTurbulence (try 2)
- Disable caustic animation if needed

### Refraction not working
- Ensure browser supports SVG filters
- Check that filter ID matches: `url(#liquidRefraction)`
- Verify SVG is not hidden by CSS

## 📊 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Edge    | 90+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Opera   | 76+     | ✅ Full |

**Note**: SVG filters have excellent support but may have slight rendering differences between browsers.

## 🎯 Performance Metrics

Target metrics for optimal experience:

- **FPS**: 60fps during interaction
- **Drag Latency**: <100ms
- **Memory**: <50MB heap usage
- **Load Time**: <1s on 3G

## 🔍 Debug Commands

Open browser console and try:

```javascript
// Access component instance
window.refractionLens

// View current position
refractionLens.currentX
refractionLens.currentY

// View bounds
refractionLens.bounds

// Stop animation
refractionLens.destroy()
```

## 📝 Code Principles Applied

This component follows the core coding principles:

- **SRP**: Separate classes for physics, rendering, and interaction
- **DRY**: Reusable animation and event handling methods
- **SoC**: Clear separation of HTML structure, CSS styling, and JS logic
- **Accessibility**: WCAG AA compliant with keyboard and screen reader support
- **Performance**: Optimized with RAF, throttling, and CSS containment

## 🚀 Future Enhancements

Potential additions:

- [ ] Multi-blob support (multiple lenses)
- [ ] Chromatic aberration effect
- [ ] Image gallery switcher
- [ ] Adjustable intensity slider
- [ ] Color tint options
- [ ] Export/share functionality

## 📄 License

This component is provided as-is for educational and commercial use.

## 🤝 Contributing

To improve this component:

1. Test on different devices
2. Report bugs with browser/OS details
3. Suggest performance optimizations
4. Share accessibility improvements

---

**Built with ❤️ following modern web standards and accessibility guidelines**

Last updated: 2025
