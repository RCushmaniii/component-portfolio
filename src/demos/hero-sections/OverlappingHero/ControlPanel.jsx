import { useState } from 'react'
import { Palette, Layout, Image, Settings, Waves, Sliders } from 'lucide-react'

export default function ControlPanel({ 
  config, 
  updateConfig, 
  applyPreset, 
  isOpen, 
  theme, 
  onClose 
}) {
  const [activeTab, setActiveTab] = useState('layout')

  const tabs = [
    { id: 'layout', name: 'Layout', icon: Layout },
    { id: 'style', name: 'Style', icon: Palette },
    { id: 'waves', name: 'Waves', icon: Waves },
    { id: 'image', name: 'Image', icon: Image },
  ]

  const presets = {
    default: {
      imagePosition: 'right',
      imageOverlap: 'medium',
      backgroundStyle: 'gradient',
      hasCutoutImage: true,
      imageSize: 100,
      wavePreset: 'default',
      waveAmplitude: 60,
      waveFrequency: 2,
      waveSeparation: 50,
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
      waveFrequency: 3,
      waveSeparation: 70,
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
      waveFrequency: 1,
      waveSeparation: 30,
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
      waveFrequency: 4,
      waveSeparation: 85,
      waveColor1: '#dc2626',
      waveColor2: '#b91c1c',
      waveOpacity: 0.9
    }
  }

  if (!isOpen) return null

  return (
    <div className="w-full h-full">
      {/* Preset Buttons */}
      <div className="mb-6">
        <h3 className={`text-sm font-semibold mb-3 ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>
          Presets
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(presets).map(([name, preset]) => (
            <button
              key={name}
              onClick={() => applyPreset(name)}
              className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                  activeTab === tab.id
                    ? theme === 'dark'
                      ? 'bg-slate-700 text-white'
                      : 'bg-white text-slate-900 shadow-sm'
                    : theme === 'dark'
                      ? 'text-slate-400 hover:text-slate-300'
                      : 'text-slate-600 hover:text-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'layout' && (
          <>
            {/* Image Position */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Image Position
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['left', 'center', 'right'].map((position) => (
                  <button
                    key={position}
                    onClick={() => updateConfig('imagePosition', position)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      config.imagePosition === position
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Image Overlap */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Image Overlap: {config.imageOverlap}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['small', 'medium', 'large'].map((overlap) => (
                  <button
                    key={overlap}
                    onClick={() => updateConfig('imageOverlap', overlap)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      config.imageOverlap === overlap
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {overlap.charAt(0).toUpperCase() + overlap.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'style' && (
          <>
            {/* Background Style */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Background Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['solid', 'gradient', 'image'].map((style) => (
                  <button
                    key={style}
                    onClick={() => updateConfig('backgroundStyle', style)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      config.backgroundStyle === style
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Cutout Image Toggle */}
            <div>
              <label className={`flex items-center justify-between ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className="text-sm font-medium">Cutout Image Effect</span>
                <button
                  onClick={() => updateConfig('hasCutoutImage', !config.hasCutoutImage)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.hasCutoutImage
                      ? 'bg-blue-600'
                      : theme === 'dark'
                        ? 'bg-slate-600'
                        : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.hasCutoutImage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Applies fade-out effect to bottom 15% of foreground image
              </p>
            </div>
          </>
        )}

        {activeTab === 'waves' && (
          <>
            {/* Wave Preset */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Wave Preset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['default', 'mountains', 'steps', 'diagonal', 'zigzag'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => updateConfig('wavePreset', preset)}
                    className={`px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                      config.wavePreset === preset
                        ? 'bg-blue-600 text-white'
                        : theme === 'dark'
                          ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {preset.charAt(0).toUpperCase() + preset.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Wave Amplitude */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Wave Amplitude: {config.waveAmplitude || 60}
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={config.waveAmplitude || 60}
                onChange={(e) => updateConfig('waveAmplitude', parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 slider-thumb-dark' 
                    : 'bg-slate-300 slider-thumb-light'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((config.waveAmplitude || 60) - 20) / 80 * 100}%, #475569 ${((config.waveAmplitude || 60) - 20) / 80 * 100}%, #475569 100%)`
                    : `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((config.waveAmplitude || 60) - 20) / 80 * 100}%, #cbd5e1 ${((config.waveAmplitude || 60) - 20) / 80 * 100}%, #cbd5e1 100%)`
                }}
              />
            </div>

            {/* Wave Frequency */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Wave Frequency: {config.waveFrequency || 2}
              </label>
              <input
                type="range"
                min="1"
                max="6"
                value={config.waveFrequency || 2}
                onChange={(e) => updateConfig('waveFrequency', parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 slider-thumb-dark' 
                    : 'bg-slate-300 slider-thumb-light'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #10b981 0%, #10b981 ${((config.waveFrequency || 2) - 1) / 5 * 100}%, #475569 ${((config.waveFrequency || 2) - 1) / 5 * 100}%, #475569 100%)`
                    : `linear-gradient(to right, #10b981 0%, #10b981 ${((config.waveFrequency || 2) - 1) / 5 * 100}%, #cbd5e1 ${((config.waveFrequency || 2) - 1) / 5 * 100}%, #cbd5e1 100%)`
                }}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Controls the number of wave cycles across the container
              </p>
            </div>

            {/* Wave Separation */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Wave Separation: {config.waveSeparation || 50}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={config.waveSeparation || 50}
                onChange={(e) => updateConfig('waveSeparation', parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 slider-thumb-dark' 
                    : 'bg-slate-300 slider-thumb-light'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #ef4444 0%, #ef4444 ${(config.waveSeparation || 50)}%, #475569 ${(config.waveSeparation || 50)}%, #475569 100%)`
                    : `linear-gradient(to right, #ef4444 0%, #ef4444 ${(config.waveSeparation || 50)}%, #cbd5e1 ${(config.waveSeparation || 50)}%, #cbd5e1 100%)`
                }}
              />
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                0% = waves overlap completely, 100% = maximum separation
              </p>
            </div>

            {/* Wave Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Wave Color 1
                </label>
                <input
                  type="color"
                  value={config.waveColor1 || '#f59e0b'}
                  onChange={(e) => updateConfig('waveColor1', e.target.value)}
                  className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-600"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  Wave Color 2
                </label>
                <input
                  type="color"
                  value={config.waveColor2 || '#f97316'}
                  onChange={(e) => updateConfig('waveColor2', e.target.value)}
                  className="w-full h-10 rounded-md border border-slate-300 dark:border-slate-600"
                />
              </div>
            </div>

            {/* Wave Opacity */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Wave Opacity: {((config.waveOpacity || 0.8) * 100).toFixed(0)}%
              </label>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.1"
                value={config.waveOpacity || 0.8}
                onChange={(e) => updateConfig('waveOpacity', parseFloat(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 slider-thumb-dark' 
                    : 'bg-slate-300 slider-thumb-light'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((config.waveOpacity || 0.8) - 0.1) / 0.9 * 100}%, #475569 ${((config.waveOpacity || 0.8) - 0.1) / 0.9 * 100}%, #475569 100%)`
                    : `linear-gradient(to right, #f59e0b 0%, #f59e0b ${((config.waveOpacity || 0.8) - 0.1) / 0.9 * 100}%, #cbd5e1 ${((config.waveOpacity || 0.8) - 0.1) / 0.9 * 100}%, #cbd5e1 100%)`
                }}
              />
            </div>
          </>
        )}

        {activeTab === 'image' && (
          <>
            {/* Image Size */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                Image Size: {config.imageSize || 100}%
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={config.imageSize || 100}
                onChange={(e) => updateConfig('imageSize', parseInt(e.target.value))}
                className={`w-full h-2 rounded-lg appearance-none cursor-pointer ${
                  theme === 'dark' 
                    ? 'bg-slate-700 slider-thumb-dark' 
                    : 'bg-slate-300 slider-thumb-light'
                }`}
                style={{
                  background: theme === 'dark' 
                    ? `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((config.imageSize || 100) - 50) / 100 * 100}%, #475569 ${((config.imageSize || 100) - 50) / 100 * 100}%, #475569 100%)`
                    : `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${((config.imageSize || 100) - 50) / 100 * 100}%, #cbd5e1 ${((config.imageSize || 100) - 50) / 100 * 100}%, #cbd5e1 100%)`
                }}
              />
            </div>

            {/* Cutout Image Toggle */}
            <div>
              <label className={`flex items-center justify-between ${
                theme === 'dark' ? 'text-slate-300' : 'text-slate-700'
              }`}>
                <span className="text-sm font-medium">Fade-out Bottom Effect</span>
                <button
                  onClick={() => updateConfig('hasCutoutImage', !config.hasCutoutImage)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    config.hasCutoutImage
                      ? 'bg-blue-600'
                      : theme === 'dark'
                        ? 'bg-slate-600'
                        : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      config.hasCutoutImage ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>
              <p className={`text-xs mt-1 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Applies fade-out effect to bottom 15% of foreground image
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              theme === 'dark' 
                ? 'bg-blue-950/50 border-blue-800 text-blue-200' 
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}>
              <h4 className="font-medium mb-2">Image Tips</h4>
              <ul className="text-sm space-y-1">
                <li>• Size 50-80%: Subtle presence</li>
                <li>• Size 100-120%: Balanced layout</li>
                <li>• Size 130-150%: Dramatic impact</li>
                <li>• Fade effect works best with cutout images</li>
              </ul>
            </div>
          </>
        )}
      </div>
      
      {/* Custom slider styles */}
      <style>{`
        /* Light mode slider thumb */
        .slider-thumb-light::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .slider-thumb-light::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        /* Dark mode slider thumb */
        .slider-thumb-dark::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1e293b;
          border: 2px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        .slider-thumb-dark::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1e293b;
          border: 2px solid #3b82f6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
        
        /* Remove default track styling */
        .slider-thumb-light::-webkit-slider-track,
        .slider-thumb-dark::-webkit-slider-track {
          background: transparent;
        }
        
        .slider-thumb-light::-moz-range-track,
        .slider-thumb-dark::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  )
}
