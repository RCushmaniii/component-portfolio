import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { getComponentById } from '../data/components'
import Button from '../components/ui/Button'
import LiquidRefractionLensCore from '../demos/visual-effects/LiquidRefractionLens/LiquidRefractionLensCore'
import ControlPanel from '../demos/visual-effects/LiquidRefractionLens/ControlPanel'

export default function LiquidRefractionLensPage() {
  const { componentId } = useParams()
  const { theme } = useTheme()
  const component = getComponentById(componentId)
  
  // State for demo configuration
  const [config, setConfig] = useState({
    blobSize: 220,
    borderRadius: 50,
    rotation: 0,
    displacementScale: 50,
    turbulenceFrequency: 0.015,
    turbulenceOctaves: 3,
    blurAmount: 8,
    brightness: 1.1,
    enableCaustics: true,
    causticSpeed: 8,
    enableWobble: true,
    wobbleIntensity: 0.002,
    innerGlowOpacity: 0.4,
    glassTintColor: '#3b82f6',
    glassTintOpacity: 0.1,
    causticColor1: '#93c5fd',
    causticColor2: '#c4b5fd',
    causticColor3: '#a7f3d0',
    borderColor: '#ffffff',
    borderOpacity: 0.25,
    friction: 0.15,
    backgroundImage: '/images/background-image.webp',
    bgBrightness: 0.92,
    bgContrast: 1.05,
  })
  
  const [isPanelOpen, setIsPanelOpen] = useState(false)

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }))
  }

  const presets = {
    default: { displacementScale: 50, blobSize: 220, turbulenceFrequency: 0.015, brightness: 1.1 },
    subtle: { displacementScale: 30, blobSize: 180, turbulenceFrequency: 0.02, brightness: 1.05 },
    dramatic: { displacementScale: 75, blobSize: 280, turbulenceFrequency: 0.01, brightness: 1.15 },
    performance: { displacementScale: 40, blobSize: 160, turbulenceOctaves: 2, enableCaustics: false },
  }

  const applyPreset = (presetName) => {
    setConfig(prev => ({ ...prev, ...presets[presetName] }))
  }

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${componentId}-config.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!component) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-slate-950' : 'bg-white'
      }`}>
        <div className="text-center">
          <h1 className={`text-3xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Component Not Found
          </h1>
          <Link to="/">
            <Button>
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Desktop/Tablet Header */}
      <div className={`hidden md:block border-b ${
        theme === 'dark' ? 'bg-slate-900/95 border-slate-800 backdrop-blur-sm' : 'bg-white/95 border-slate-200 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className={`text-2xl font-bold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {component.name}
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
                }`}>
                  {component.description}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={exportConfig}
              >
                <Download className="w-4 h-4" />
                Export Config
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPanelOpen(!isPanelOpen)}
              >
                <Settings className="w-4 h-4" />
                {isPanelOpen ? 'Hide' : 'Show'} Controls
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Header - Simplified */}
      <div className={`md:hidden border-b ${
        theme === 'dark' ? 'bg-slate-900/95 border-slate-800 backdrop-blur-sm' : 'bg-white/95 border-slate-200 backdrop-blur-sm'
      }`}>
        <div className="px-4 py-4">
          <h1 className={`text-xl font-bold mb-1 ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {component.name}
          </h1>
          <p className={`text-xs leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {component.description}
          </p>
        </div>
      </div>

      {/* Demo Content */}
      <div className="relative h-[calc(100vh-140px)] md:h-[calc(100vh-105px)]">
        {/* Component Demo Area - Full width on mobile */}
        <div className="w-full h-full flex items-center justify-center px-0 md:p-4 lg:p-8">
          {componentId === 'liquid-refraction-lens' && (
            <LiquidRefractionLensCore config={config} theme={theme} />
          )}
        </div>

        {/* Desktop/Tablet Control Panel - Solid Background */}
        {isPanelOpen && (
          <div className="hidden md:block absolute top-0 left-0 bottom-0 w-80 lg:w-96">
            <div className={`h-full overflow-y-auto ${
              theme === 'dark' 
                ? 'bg-slate-900 border-r border-slate-800' 
                : 'bg-white border-r border-slate-200'
            }`}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-slate-900'
                  }`}>
                    Controls
                  </h2>
                  <button
                    onClick={() => setIsPanelOpen(false)}
                    className={`p-2 rounded-lg transition-colors ${
                      theme === 'dark'
                        ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                        : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <ControlPanel 
                  config={config}
                  updateConfig={updateConfig}
                  applyPreset={applyPreset}
                  isOpen={true}
                  theme={theme}
                  onClose={() => setIsPanelOpen(false)}
                />
                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <Button
                    onClick={exportConfig}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="w-4 h-4" />
                    Export Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Control Panel - Bottom Sheet with Solid Background */}
        {isPanelOpen && (
          <div className="md:hidden fixed inset-0 z-50">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsPanelOpen(false)}
            />
            
            {/* Bottom Sheet */}
            <div className={`absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-2xl overflow-hidden ${
              theme === 'dark' ? 'bg-slate-900' : 'bg-white'
            }`}>
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-2">
                <div className={`w-12 h-1 rounded-full ${
                  theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'
                }`} />
              </div>
              
              {/* Header */}
              <div className={`flex items-center justify-between px-4 py-3 border-b ${
                theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
              }`}>
                <h2 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Controls
                </h2>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  className={`p-2 rounded-lg transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-slate-800 text-slate-400 hover:text-white'
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Content */}
              <div className="overflow-y-auto max-h-[calc(85vh-120px)] px-4 py-4">
                <ControlPanel 
                  config={config}
                  updateConfig={updateConfig}
                  applyPreset={applyPreset}
                  isOpen={true}
                  theme={theme}
                  onClose={() => setIsPanelOpen(false)}
                />
                <div className={`mt-6 pt-6 border-t ${
                  theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
                }`}>
                  <Button
                    onClick={exportConfig}
                    className="w-full"
                    variant="outline"
                  >
                    <Download className="w-4 h-4" />
                    Export Configuration
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Floating Controls Button */}
      {!isPanelOpen && (
        <button
          onClick={() => setIsPanelOpen(true)}
          className={`md:hidden fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-lg transition-all hover:scale-110 ${
            theme === 'dark'
              ? 'bg-blue-600 hover:bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <Settings className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
