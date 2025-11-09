import { useState } from 'react'
import LiquidRefractionLensCore from './LiquidRefractionLensCore'
import ControlPanel from './ControlPanel'

export default function LiquidRefractionLens() {
  // State for all controllable parameters
  const [config, setConfig] = useState({
    // Blob Shape
    blobSize: 220,
    borderRadius: 50,
    rotation: 0,
    
    // Refraction Properties
    displacementScale: 50,
    turbulenceFrequency: 0.015,
    turbulenceOctaves: 3,
    blurAmount: 8,
    brightness: 1.1,
    
    // Visual Effects
    enableCaustics: true,
    causticSpeed: 8,
    enableWobble: true,
    wobbleIntensity: 0.002,
    innerGlowOpacity: 0.4,
    
    // Colors
    glassTintColor: '#3b82f6',
    glassTintOpacity: 0.1,
    causticColor1: '#93c5fd',
    causticColor2: '#c4b5fd',
    causticColor3: '#a7f3d0',
    borderColor: '#ffffff',
    borderOpacity: 0.25,
    
    // Physics
    friction: 0.15,
    
    // Background
    backgroundImage: '/images/background-image.webp',
    bgBrightness: 0.92,
    bgContrast: 1.05,
  })

  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [theme, setTheme] = useState('dark') // 'dark' or 'light'

  // Update config helper
  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  // Preset configurations
  const presets = {
    default: { displacementScale: 50, blobSize: 220, turbulenceFrequency: 0.015, brightness: 1.1 },
    subtle: { displacementScale: 30, blobSize: 180, turbulenceFrequency: 0.02, brightness: 1.05 },
    dramatic: { displacementScale: 75, blobSize: 280, turbulenceFrequency: 0.01, brightness: 1.15 },
    performance: { displacementScale: 40, blobSize: 160, turbulenceOctaves: 2, enableCaustics: false },
  }

  const applyPreset = (presetName) => {
    setConfig(prev => ({ ...prev, ...presets[presetName] }))
  }

  // Export configuration
  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'refraction-config.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-linear-to-br from-slate-50 via-blue-50 to-slate-100'
    }`}>
      
      {/* Header */}
      <header className={`relative z-20 backdrop-blur-sm border-b transition-colors ${
        theme === 'dark'
          ? 'bg-slate-900/50 border-white/10'
          : 'bg-white/50 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className={`text-2xl font-bold bg-linear-to-r bg-clip-text text-transparent ${
              theme === 'dark'
                ? 'from-blue-400 to-purple-400'
                : 'from-blue-600 to-purple-600'
            }`}>
              Liquid Refraction Lens
            </h1>
            <p className={`text-sm mt-1 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>Interactive SVG Filter Playground</p>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium flex items-center gap-2"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/>
                  <line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/>
                  <line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
            <button
              onClick={exportConfig}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm font-medium"
            >
              Export Config
            </button>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors text-sm font-medium"
            >
              {isPanelOpen ? 'Hide' : 'Show'} Controls
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative h-[calc(100vh-73px)]">
        
        {/* Refraction Lens Component - Full Width */}
        <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 lg:p-8">
          <LiquidRefractionLensCore config={config} theme={theme} />
        </div>

        {/* Control Panel - Overlay on Mobile, Sidebar on Desktop */}
        <ControlPanel 
          config={config}
          updateConfig={updateConfig}
          applyPreset={applyPreset}
          isOpen={isPanelOpen}
          theme={theme}
          onClose={() => setIsPanelOpen(false)}
        />
      </div>
    </div>
  )
}
