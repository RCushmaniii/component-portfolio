import { useState } from 'react'
import OverlappingHeroCore from './OverlappingHeroCore'
import ControlPanel from './ControlPanel'

export default function OverlappingHero() {
  // State for all controllable parameters
  const [config, setConfig] = useState({
    imagePosition: 'right', // left | right | center
    imageOverlap: 'medium', // small | medium | large
    backgroundStyle: 'gradient', // solid | gradient | image
    hasCutoutImage: true, // boolean
    imageSize: 100, // 50-150
    wavePreset: 'default', // default | mountains | steps | diagonal | zigzag
    waveAmplitude: 60, // 20-100
    waveColor1: '#f59e0b',
    waveColor2: '#f97316',
    waveOpacity: 0.8, // 0.1-1.0
  })

  const [isPanelOpen, setIsPanelOpen] = useState(true)
  const [theme, setTheme] = useState('dark') // 'dark' or 'light'

  // Update config helper
  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  // Preset configurations
  const presets = {
    default: { 
      imagePosition: 'right', 
      imageOverlap: 'medium', 
      backgroundStyle: 'gradient', 
      hasCutoutImage: true,
      imageSize: 100,
      wavePreset: 'default',
      waveAmplitude: 60,
      waveColor1: '#f59e0b',
      waveColor2: '#f97316',
      waveOpacity: 0.8
    },
    leftAlign: { 
      imagePosition: 'left', 
      imageOverlap: 'large', 
      backgroundStyle: 'gradient', 
      hasCutoutImage: true,
      imageSize: 120,
      wavePreset: 'mountains',
      waveAmplitude: 80,
      waveColor1: '#3b82f6',
      waveColor2: '#1d4ed8',
      waveOpacity: 0.7
    },
    minimal: { 
      imagePosition: 'center', 
      imageOverlap: 'small', 
      backgroundStyle: 'solid', 
      hasCutoutImage: false,
      imageSize: 80,
      wavePreset: 'diagonal',
      waveAmplitude: 40,
      waveColor1: '#6b7280',
      waveColor2: '#4b5563',
      waveOpacity: 0.5
    },
    dramatic: { 
      imagePosition: 'right', 
      imageOverlap: 'large', 
      backgroundStyle: 'image', 
      hasCutoutImage: true,
      imageSize: 140,
      wavePreset: 'zigzag',
      waveAmplitude: 100,
      waveColor1: '#dc2626',
      waveColor2: '#b91c1c',
      waveOpacity: 0.9
    },
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
    link.download = 'overlapping-hero-config.json'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' 
        : 'bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100'
    }`}>
      
      {/* Header Controls */}
      <div className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors ${
        theme === 'dark'
          ? 'bg-slate-950/90 border-slate-800'
          : 'bg-white/95 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Overlapping Hero
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Hero section with overlapping images and wave effects
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {theme === 'dark' ? '☀️' : '🌙'} {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              
              <button
                onClick={exportConfig}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-blue-600 text-white hover:bg-blue-500'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Export Config
              </button>
              
              <button
                onClick={() => setIsPanelOpen(!isPanelOpen)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {isPanelOpen ? 'Hide' : 'Show'} Controls
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Component */}
        <OverlappingHeroCore 
          config={config} 
          theme={theme}
          {...config}
        />

        {/* Control Panel Overlay */}
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
