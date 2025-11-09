import { useState } from 'react'
import { Play, ArrowRight, Sparkles, Zap } from 'lucide-react'

export default function OverlappingHeroCore({ 
  config = {}, 
  theme = 'dark',
  imagePosition = 'right',
  imageOverlap = 'medium',
  backgroundStyle = 'gradient',
  hasCutoutImage = true,
  imageSize = 100,
  waveAmplitude = 60,
  waveFrequency = 2,
  waveSeparation = 50,
  wavePreset = 'default',
  waveColor1 = '#f59e0b',
  waveColor2 = '#f97316',
  waveOpacity = 0.8
}) {
  const [isHovered, setIsHovered] = useState(false)

  // Wave SVG component for bottom effect
  const WaveBottom = () => {
    const getWavePath = () => {
      const viewBoxWidth = 1200
      const waveWidth = viewBoxWidth / waveFrequency
      
      switch (wavePreset) {
        case 'mountains':
          // Make mountains responsive to amplitude and frequency
          let mountainPath = `M0,${waveAmplitude + 20}`
          for (let i = 0; i < waveFrequency; i++) {
            const peakX = (i * waveWidth) + (waveWidth * 0.5)
            const peakY = Math.max(10, waveAmplitude - 40)
            const valleyX1 = i * waveWidth
            const valleyX2 = (i + 1) * waveWidth
            const valleyY = waveAmplitude + 20
            if (i === 0) {
              mountainPath += ` L${peakX},${peakY} L${valleyX2},${valleyY}`
            } else {
              mountainPath += ` L${peakX},${peakY} L${valleyX2},${valleyY}`
            }
          }
          mountainPath += ` L${viewBoxWidth},120 L0,120 Z`
          return mountainPath
          
        case 'steps':
          // Make steps responsive to amplitude and frequency
          let stepPath = `M0,${waveAmplitude}`
          const stepHeight = Math.max(20, waveAmplitude * 0.4)
          for (let i = 0; i < waveFrequency; i++) {
            const stepWidth = waveWidth / 2
            const x1 = i * waveWidth
            const x2 = x1 + stepWidth
            const x3 = (i + 1) * waveWidth
            const y1 = waveAmplitude + (i % 2 === 0 ? 0 : stepHeight)
            const y2 = waveAmplitude + (i % 2 === 0 ? -stepHeight : 0)
            stepPath += ` L${x2},${y1} L${x2},${y2} L${x3},${y2}`
          }
          stepPath += ` L${viewBoxWidth},120 L0,120 Z`
          return stepPath
          
        case 'diagonal':
          // Make diagonal truly diagonal and responsive to amplitude
          const baseY = 60 // Center point
          const startY = baseY + waveAmplitude - 60
          const endY = baseY - waveAmplitude + 60
          return `M0,${startY} L${viewBoxWidth},${endY} L${viewBoxWidth},120 L0,120 Z`
          
        case 'zigzag':
          // Make zigzag responsive to amplitude and frequency
          let zigzagPath = `M0,${waveAmplitude}`
          for (let i = 0; i < waveFrequency * 2; i++) {
            const x = (i * waveWidth) / 2
            const y = waveAmplitude + (i % 2 === 0 ? -30 : 30)
            zigzagPath += ` L${x},${y}`
          }
          zigzagPath += ` L${viewBoxWidth},120 L0,120 Z`
          return zigzagPath
          
        default:
          // Generate dramatic, flowing waves with deep curves
          const centerY = 60 // Center line
          let path = `M0,${centerY}`
          
          for (let i = 0; i < waveFrequency; i++) {
            const progress = i / waveFrequency
            const nextProgress = (i + 1) / waveFrequency
            
            // Create much more dramatic amplitude scaling
            const amplitudeScale = Math.max(0.3, waveAmplitude / 60) // Scale based on amplitude setting
            const maxVariation = Math.min(50, waveAmplitude * 0.8) // Up to 80% of amplitude
            
            // Generate wave positions with dramatic curves
            const waveX1 = i * waveWidth
            const waveX2 = waveX1 + (waveWidth * 0.25) // First control point
            const waveX3 = waveX1 + (waveWidth * 0.5)  // Peak/trough point  
            const waveX4 = waveX1 + (waveWidth * 0.75) // Second control point
            const waveX5 = (i + 1) * waveWidth         // End point
            
            // Create alternating high peaks and deep troughs
            const isEven = i % 2 === 0
            const peakDirection = isEven ? -1 : 1 // Alternate up and down
            
            // Much more dramatic Y positions
            const peakY = centerY + (peakDirection * maxVariation) // High peak or deep trough
            const midY1 = centerY + (peakDirection * maxVariation * 0.3) // Gentle approach
            const midY2 = centerY - (peakDirection * maxVariation * 0.2) // Gentle departure
            const endY = centerY + (((i + 1) % 2 === 0) ? -1 : 1) * maxVariation * 0.1 // Next wave start
            
            // Create smooth flowing curves with multiple control points
            path += ` C${waveX2},${midY1} ${waveX3 - (waveWidth * 0.1)},${peakY} ${waveX3},${peakY}`
            path += ` C${waveX3 + (waveWidth * 0.1)},${peakY} ${waveX4},${midY2} ${waveX5},${endY}`
          }
          path += ` L${viewBoxWidth},120 L0,120 Z`
          return path
      }
    }

    return (
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-16 md:h-20 lg:h-24"
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={waveColor1} stopOpacity={waveOpacity} />
              <stop offset="50%" stopColor={waveColor2} stopOpacity={waveOpacity + 0.1} />
              <stop offset="100%" stopColor={waveColor1} stopOpacity={waveOpacity} />
            </linearGradient>
          </defs>
          <path 
            d={getWavePath()}
            fill="url(#waveGradient)"
            className={wavePreset === 'default' ? 'animate-pulse' : ''}
          />
          {/* Second wave layer for all presets */}
          <path 
            d={(() => {
              const viewBoxWidth = 1200
              const waveWidth = viewBoxWidth / waveFrequency
              
              switch (wavePreset) {
                case 'mountains':
                  // Second mountain layer with offset
                  let mountainPath2 = `M0,${waveAmplitude + 30}`
                  for (let i = 0; i < waveFrequency; i++) {
                    const peakX = (i * waveWidth) + (waveWidth * 0.3) // Offset peaks
                    const peakY = Math.max(20, waveAmplitude - 20)
                    const valleyX1 = i * waveWidth
                    const valleyX2 = (i + 1) * waveWidth
                    const valleyY = waveAmplitude + 30
                    if (i === 0) {
                      mountainPath2 += ` L${peakX},${peakY} L${valleyX2},${valleyY}`
                    } else {
                      mountainPath2 += ` L${peakX},${peakY} L${valleyX2},${valleyY}`
                    }
                  }
                  mountainPath2 += ` L${viewBoxWidth},120 L0,120 Z`
                  return mountainPath2
                  
                case 'steps':
                  // Second step layer with offset
                  let stepPath2 = `M0,${waveAmplitude + 15}`
                  const stepHeight2 = Math.max(15, waveAmplitude * 0.3)
                  for (let i = 0; i < waveFrequency; i++) {
                    const stepWidth = waveWidth / 2
                    const x1 = i * waveWidth + (waveWidth * 0.25) // Offset steps
                    const x2 = x1 + stepWidth
                    const x3 = (i + 1) * waveWidth + (waveWidth * 0.25)
                    const y1 = waveAmplitude + 15 + (i % 2 === 0 ? stepHeight2 : 0)
                    const y2 = waveAmplitude + 15 + (i % 2 === 0 ? 0 : stepHeight2)
                    stepPath2 += ` L${x2},${y1} L${x2},${y2} L${Math.min(x3, viewBoxWidth)},${y2}`
                  }
                  stepPath2 += ` L${viewBoxWidth},120 L0,120 Z`
                  return stepPath2
                  
                case 'diagonal':
                  // Second diagonal layer with controllable separation
                  const baseY2 = 60
                  const separationOffset = (waveSeparation / 100) * 40 // 0-40px offset
                  const startY2 = baseY2 + waveAmplitude - 60 + separationOffset
                  const endY2 = baseY2 - waveAmplitude + 60 + separationOffset  
                  return `M0,${startY2} L${viewBoxWidth},${endY2} L${viewBoxWidth},120 L0,120 Z`
                  
                case 'zigzag':
                  // Second zigzag layer with offset
                  let zigzagPath2 = `M0,${waveAmplitude + 15}`
                  for (let i = 0; i < waveFrequency * 2; i++) {
                    const x = (i * waveWidth) / 2 + (waveWidth * 0.25) // Offset zigzag
                    const y = waveAmplitude + 15 + (i % 2 === 0 ? -20 : 20)
                    zigzagPath2 += ` L${Math.min(x, viewBoxWidth)},${y}`
                  }
                  zigzagPath2 += ` L${viewBoxWidth},120 L0,120 Z`
                  return zigzagPath2
                  
                default:
                  // Generate dramatic second wave layer with controllable separation
                  const centerY2 = 60
                  const separationFactor = waveSeparation / 100 // 0 to 1
                  const verticalOffset = separationFactor * 25 // 0 to 25px vertical offset
                  
                  let path = `M0,${centerY2 + verticalOffset}`
                  
                  for (let i = 0; i < waveFrequency; i++) {
                    // Create dramatic amplitude scaling for second layer too
                    const maxVariation2 = Math.min(45, waveAmplitude * 0.7) // Slightly smaller than first layer
                    
                    // Generate wave positions
                    const waveX1 = i * waveWidth
                    const waveX2 = waveX1 + (waveWidth * 0.3) // Offset control points
                    const waveX3 = waveX1 + (waveWidth * 0.6)  // Peak/trough point  
                    const waveX4 = waveX1 + (waveWidth * 0.8) // Second control point
                    const waveX5 = (i + 1) * waveWidth         // End point
                    
                    // Create opposite or offset pattern based on separation
                    const basePattern = i % 2 === 0 ? -1 : 1
                    const separationPhaseShift = separationFactor * Math.PI // 0 to π phase shift
                    const adjustedPattern = separationFactor > 0.5 ? -basePattern : basePattern
                    const peakDirection = separationFactor < 0.5 ? basePattern : adjustedPattern
                    
                    // Much more dramatic Y positions for second layer
                    const peakY = centerY2 + verticalOffset + (peakDirection * maxVariation2)
                    const midY1 = centerY2 + verticalOffset + (peakDirection * maxVariation2 * 0.4)
                    const midY2 = centerY2 + verticalOffset - (peakDirection * maxVariation2 * 0.3)
                    const endY = centerY2 + verticalOffset + (peakDirection * maxVariation2 * 0.15)
                    
                    // Create flowing curves for second layer
                    path += ` C${waveX2},${midY1} ${waveX3 - (waveWidth * 0.08)},${peakY} ${waveX3},${peakY}`
                    path += ` C${waveX3 + (waveWidth * 0.08)},${peakY} ${waveX4},${midY2} ${waveX5},${endY}`
                  }
                  path += ` L${viewBoxWidth},120 L0,120 Z`
                  return path
              }
            })()}
            fill={waveColor2} 
            fillOpacity={waveOpacity - 0.2}
          />
        </svg>
      </div>
    )
  }

  return (
    <section className="relative h-[calc(100vh-140px)] md:h-[calc(100vh-105px)] overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/components/OverlappingHero/moon-beams-background.png')`
          }}
        />
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-slate-900/80 via-purple-900/60 to-slate-900/90'
            : 'bg-gradient-to-br from-slate-100/80 via-blue-100/60 to-slate-200/90'
        }`} />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className={`${imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'} space-y-8`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-orange-300' : 'text-orange-700'
                }`}>
                  AI-Powered Future
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Step Into the{' '}
                  <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    Future
                  </span>{' '}
                  of Work
                </h1>
                <p className={`text-xl md:text-2xl font-medium ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  Embrace AI and Transform Your Company's Productivity
                </p>
              </div>

              {/* Description */}
              <p className={`text-lg leading-relaxed max-w-2xl ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                "The future belongs to those who embrace change and harness the power of artificial intelligence. 
                It's about believing in tomorrow and knowing that innovation will drive us beyond what we thought possible."
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className={`group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400'
                      : 'bg-gradient-to-r from-orange-600 to-amber-600 text-white hover:from-orange-500 hover:to-amber-500'
                  } shadow-lg hover:shadow-xl`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span className="flex items-center gap-2">
                    Get Started
                    <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`} />
                  </span>
                </button>

                <button className={`group px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 border-2 ${
                  theme === 'dark'
                    ? 'border-slate-600 text-slate-300 hover:border-orange-400 hover:text-orange-400 hover:bg-orange-400/10'
                    : 'border-slate-400 text-slate-700 hover:border-orange-500 hover:text-orange-600 hover:bg-orange-50'
                }`}>
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </span>
                </button>
              </div>

              {/* Stats or Features */}
              <div className="flex flex-wrap gap-8 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      300%
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Productivity Boost
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      10k+
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                      Companies Transformed
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Foreground Image with Fade Effect */}
            <div className={`${imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2'} relative`}>
              <div className="relative">
                {/* Main Astronaut Image with Fade Effect */}
                <div className="relative">
                  <img 
                    src="/images/components/OverlappingHero/girl-astronaut.png"
                    alt="Astronaut representing the future of work"
                    className="w-full h-auto mx-auto relative z-20"
                    style={{
                      maxWidth: `${imageSize}%`,
                      maskImage: hasCutoutImage ? 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' : 'none',
                      WebkitMaskImage: hasCutoutImage ? 'linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)' : 'none'
                    }}
                  />
                </div>

                {/* Floating UI Elements - Higher z-index */}
                <div className="absolute top-20 right-4 animate-float-slow z-30">
                  <div className={`px-4 py-2 rounded-lg backdrop-blur-sm border ${
                    theme === 'dark'
                      ? 'bg-slate-800/80 border-slate-600 text-slate-300'
                      : 'bg-white/80 border-slate-300 text-slate-700'
                  } shadow-lg`}>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">AI Active</span>
                    </div>
                  </div>
                </div>

                <div className="absolute top-40 left-4 animate-float-medium z-30">
                  <div className={`px-4 py-2 rounded-lg backdrop-blur-sm border ${
                    theme === 'dark'
                      ? 'bg-slate-800/80 border-slate-600 text-slate-300'
                      : 'bg-white/80 border-slate-300 text-slate-700'
                  } shadow-lg`}>
                    <div className="text-sm font-medium">Productivity: +285%</div>
                  </div>
                </div>

                <div className="absolute bottom-32 right-8 animate-float-fast z-30">
                  <div className={`px-4 py-2 rounded-lg backdrop-blur-sm border ${
                    theme === 'dark'
                      ? 'bg-slate-800/80 border-slate-600 text-slate-300'
                      : 'bg-white/80 border-slate-300 text-slate-700'
                  } shadow-lg`}>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-medium">Innovation Mode</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Bottom Effect */}
      <WaveBottom />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-orange-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(-1deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-1deg); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px) rotate(-0.5deg); }
          50% { transform: translateY(-8px) rotate(0.5deg); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 2.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
