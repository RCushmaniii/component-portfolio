import { useState, useRef, useEffect } from 'react'

export default function LiquidRefractionLens({ config, theme }) {
  const galleryRef = useRef(null)
  const blobRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const animationFrameRef = useRef(null)

  // Initialize center position
  useEffect(() => {
    if (galleryRef.current) {
      const rect = galleryRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      setPosition({ x: centerX, y: centerY })
      setTargetPosition({ x: centerX, y: centerY })
    }
  }, [])

  // Animation loop with momentum physics
  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        const dx = (targetPosition.x - prev.x) * config.friction
        const dy = (targetPosition.y - prev.y) * config.friction
        return {
          x: prev.x + dx,
          y: prev.y + dy
        }
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [targetPosition, config.friction])

  // Handle mouse move
  const handleMouseMove = (e) => {
    if (!galleryRef.current) return
    const rect = galleryRef.current.getBoundingClientRect()
    setTargetPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  // Handle touch move
  const handleTouchMove = (e) => {
    if (!galleryRef.current) return
    const rect = galleryRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    setTargetPosition({
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top
    })
  }

  // Convert hex to rgba
  const hexToRgba = (hex, opacity) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${opacity})`
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {/* Gallery Container */}
      <div
        ref={galleryRef}
        className="relative w-full h-full max-w-[1920px] max-h-[1080px] rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl cursor-grab active:cursor-grabbing"
        style={{
          background: theme === 'dark' ? '#0f172a' : '#f8fafc',
          aspectRatio: '16 / 9'
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onTouchMove={handleTouchMove}
        onTouchStart={() => setIsHovering(true)}
        onTouchEnd={() => setIsHovering(false)}
      >
        {/* Background Image */}
        <img
          src={config.backgroundImage}
          alt="Gallery background"
          className="w-full h-full object-cover select-none"
          draggable="false"
          style={{
            filter: `brightness(${config.bgBrightness}) contrast(${config.bgContrast})`
          }}
        />

        {/* Refraction Blob */}
        <div
          ref={blobRef}
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            width: `${config.blobSize}px`,
            height: `${config.blobSize}px`,
            transform: `translate(-50%, -50%) rotate(${config.rotation}deg)`,
            borderRadius: `${config.borderRadius}%`,
            opacity: isHovering ? 1 : 0,
            filter: `url(#liquidRefraction)`,
            backdropFilter: 'blur(2px)',
            background: `radial-gradient(circle at 35% 35%, ${hexToRgba(config.glassTintColor, config.glassTintOpacity * 1.2)} 0%, ${hexToRgba(config.glassTintColor, config.glassTintOpacity * 0.6)} 40%, ${hexToRgba(config.glassTintColor, config.glassTintOpacity * 0.2)} 70%, transparent 100%)`,
            boxShadow: `
              0 0 40px ${hexToRgba(config.borderColor, 0.2)},
              inset 0 0 30px ${hexToRgba(config.borderColor, 0.15)},
              0 10px 40px rgba(0, 0, 0, 0.3)
            `,
            border: `1px solid ${hexToRgba(config.borderColor, config.borderOpacity)}`,
            willChange: 'transform, left, top',
          }}
        >
          {/* Inner Glow */}
          <div
            className="absolute inset-[10%] rounded-full pointer-events-none mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${hexToRgba('#ffffff', config.innerGlowOpacity)} 0%, ${hexToRgba('#ffffff', config.innerGlowOpacity * 0.4)} 40%, transparent 60%)`,
              filter: 'blur(4px)'
            }}
          />

          {/* Caustic Light Ring */}
          {config.enableCaustics && (
            <div
              className="absolute inset-[-5%] rounded-full pointer-events-none mix-blend-screen"
              style={{
                background: `conic-gradient(
                  from 0deg,
                  transparent 0%,
                  ${hexToRgba(config.causticColor1, 0.4)} 15%,
                  transparent 30%,
                  ${hexToRgba(config.causticColor2, 0.4)} 45%,
                  transparent 60%,
                  ${hexToRgba(config.causticColor3, 0.3)} 75%,
                  transparent 90%
                )`,
                filter: 'blur(10px)',
                opacity: 0.7,
                animation: `rotateCaustics ${config.causticSpeed}s linear infinite`
              }}
            />
          )}
        </div>

        {/* Instruction Overlay */}
        <div 
          className={`absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-3 backdrop-blur-xl rounded-full text-sm font-medium pointer-events-none z-10 shadow-lg animate-fadeInOut ${
            theme === 'dark'
              ? 'bg-slate-900/95 text-white border border-white/10'
              : 'bg-white/95 text-slate-900 border border-slate-200'
          }`}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-moveCursor">
            <path d="M12 2v20M2 12h20"/>
          </svg>
          <span>Drag the droplet to explore</span>
        </div>
      </div>

      {/* SVG Filter Definitions */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          {/* Primary Refraction Filter */}
          <filter id="liquidRefraction" x="-50%" y="-50%" width="200%" height="200%">
            {/* Generate fractal noise */}
            <feTurbulence
              type="fractalNoise"
              baseFrequency={config.turbulenceFrequency}
              numOctaves={config.turbulenceOctaves}
              seed="2"
              result="turbulence"
            />

            {/* Soften the noise */}
            <feGaussianBlur
              in="turbulence"
              stdDeviation={config.blurAmount}
              result="smoothNoise"
            />

            {/* Apply displacement */}
            <feDisplacementMap
              in="SourceGraphic"
              in2="smoothNoise"
              scale={config.displacementScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />

            {/* Brightness boost */}
            <feComponentTransfer in="displaced" result="brightened">
              <feFuncR type="linear" slope={config.brightness} intercept="0.02"/>
              <feFuncG type="linear" slope={config.brightness} intercept="0.02"/>
              <feFuncB type="linear" slope={config.brightness} intercept="0.02"/>
            </feComponentTransfer>

            {/* Edge sharpening */}
            <feConvolveMatrix
              in="brightened"
              order="3"
              kernelMatrix="0 -1 0 -1 5 -1 0 -1 0"
              result="sharpened"
            />
          </filter>
        </defs>
      </svg>

      {/* CSS Animations */}
      <style>{`
        @keyframes rotateCaustics {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          10% { opacity: 1; transform: translateX(-50%) translateY(0); }
          80% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes moveCursor {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(5px, 0); }
          50% { transform: translate(0, 5px); }
          75% { transform: translate(-5px, 0); }
        }
      `}</style>
    </div>
  )
}
