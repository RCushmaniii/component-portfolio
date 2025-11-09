import { useState } from 'react'

export default function ControlPanel({ config, updateConfig, applyPreset, isOpen, theme = 'dark', onClose }) {
  const [activeSection, setActiveSection] = useState('shape')

  const sections = {
    shape: 'Blob Shape',
    refraction: 'Refraction',
    effects: 'Visual Effects',
    colors: 'Colors',
    physics: 'Physics',
    background: 'Background'
  }

  const Slider = ({ label, value, onChange, min, max, step, unit = '' }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <label className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
        <span className={`text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider ${theme === 'dark' ? 'bg-slate-700' : 'bg-slate-300'}`}
      />
    </div>
  )

  const ColorPicker = ({ label, value, onChange }) => (
    <div className="mb-4">
      <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-12 h-10 rounded cursor-pointer border-2 ${theme === 'dark' ? 'border-slate-600' : 'border-slate-300'}`}
        />
        <span className={`text-sm font-mono ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{value}</span>
      </div>
    </div>
  )

  const Toggle = ({ label, value, onChange }) => (
    <div className="flex items-center justify-between mb-4">
      <label className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{label}</label>
      <button
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          value ? 'bg-purple-600' : 'bg-slate-700'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop for mobile */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Control Panel */}
      <div className="w-full h-auto">
        {/* Close button for mobile */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          aria-label="Close controls"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

      <div className="p-6">
        {/* Presets */}
        <div className="mb-6">
          <h3 className={`text-sm font-semibold mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Presets</h3>
          <div className="grid grid-cols-2 gap-2">
            {['default', 'subtle', 'dramatic', 'performance'].map(preset => (
              <button
                key={preset}
                onClick={() => applyPreset(preset)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm capitalize"
              >
                {preset}
              </button>
            ))}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(sections).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                activeSection === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="space-y-6">
          
          {/* Blob Shape */}
          {activeSection === 'shape' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Blob Shape</h3>
              <Slider
                label="Size"
                value={config.blobSize}
                onChange={(v) => updateConfig('blobSize', v)}
                min={100}
                max={400}
                step={10}
                unit="px"
              />
              <Slider
                label="Border Radius"
                value={config.borderRadius}
                onChange={(v) => updateConfig('borderRadius', v)}
                min={0}
                max={50}
                step={1}
                unit="%"
              />
              <Slider
                label="Rotation"
                value={config.rotation}
                onChange={(v) => updateConfig('rotation', v)}
                min={0}
                max={360}
                step={1}
                unit="°"
              />
            </div>
          )}

          {/* Refraction Properties */}
          {activeSection === 'refraction' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Refraction</h3>
              <Slider
                label="Displacement Scale"
                value={config.displacementScale}
                onChange={(v) => updateConfig('displacementScale', v)}
                min={10}
                max={100}
                step={1}
              />
              <Slider
                label="Turbulence Frequency"
                value={config.turbulenceFrequency}
                onChange={(v) => updateConfig('turbulenceFrequency', v)}
                min={0.005}
                max={0.05}
                step={0.001}
              />
              <Slider
                label="Turbulence Octaves"
                value={config.turbulenceOctaves}
                onChange={(v) => updateConfig('turbulenceOctaves', v)}
                min={1}
                max={5}
                step={1}
              />
              <Slider
                label="Blur Amount"
                value={config.blurAmount}
                onChange={(v) => updateConfig('blurAmount', v)}
                min={2}
                max={20}
                step={1}
              />
              <Slider
                label="Brightness"
                value={config.brightness}
                onChange={(v) => updateConfig('brightness', v)}
                min={0.8}
                max={1.5}
                step={0.05}
              />
            </div>
          )}

          {/* Visual Effects */}
          {activeSection === 'effects' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Visual Effects</h3>
              <Toggle
                label="Enable Caustics"
                value={config.enableCaustics}
                onChange={(v) => updateConfig('enableCaustics', v)}
              />
              {config.enableCaustics && (
                <Slider
                  label="Caustic Speed"
                  value={config.causticSpeed}
                  onChange={(v) => updateConfig('causticSpeed', v)}
                  min={2}
                  max={20}
                  step={1}
                  unit="s"
                />
              )}
              <Toggle
                label="Enable Wobble"
                value={config.enableWobble}
                onChange={(v) => updateConfig('enableWobble', v)}
              />
              <Slider
                label="Inner Glow Opacity"
                value={config.innerGlowOpacity}
                onChange={(v) => updateConfig('innerGlowOpacity', v)}
                min={0}
                max={1}
                step={0.05}
              />
            </div>
          )}

          {/* Colors */}
          {activeSection === 'colors' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Colors</h3>
              <ColorPicker
                label="Glass Tint"
                value={config.glassTintColor}
                onChange={(v) => updateConfig('glassTintColor', v)}
              />
              <Slider
                label="Tint Opacity"
                value={config.glassTintOpacity}
                onChange={(v) => updateConfig('glassTintOpacity', v)}
                min={0}
                max={0.5}
                step={0.01}
              />
              <ColorPicker
                label="Caustic Color 1"
                value={config.causticColor1}
                onChange={(v) => updateConfig('causticColor1', v)}
              />
              <ColorPicker
                label="Caustic Color 2"
                value={config.causticColor2}
                onChange={(v) => updateConfig('causticColor2', v)}
              />
              <ColorPicker
                label="Caustic Color 3"
                value={config.causticColor3}
                onChange={(v) => updateConfig('causticColor3', v)}
              />
              <ColorPicker
                label="Border Color"
                value={config.borderColor}
                onChange={(v) => updateConfig('borderColor', v)}
              />
              <Slider
                label="Border Opacity"
                value={config.borderOpacity}
                onChange={(v) => updateConfig('borderOpacity', v)}
                min={0}
                max={1}
                step={0.05}
              />
            </div>
          )}

          {/* Physics */}
          {activeSection === 'physics' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Physics</h3>
              <Slider
                label="Friction"
                value={config.friction}
                onChange={(v) => updateConfig('friction', v)}
                min={0.05}
                max={0.3}
                step={0.01}
              />
              <p className="text-xs text-slate-400 mt-2">
                Higher friction = more responsive movement
              </p>
            </div>
          )}

          {/* Background */}
          {activeSection === 'background' && (
            <div>
              <h3 className={`text-lg font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Background</h3>
              <div className="mb-4">
                <label className={`text-sm font-medium mb-2 block ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>Image URL</label>
                <input
                  type="text"
                  value={config.backgroundImage}
                  onChange={(e) => updateConfig('backgroundImage', e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border focus:border-purple-500 focus:outline-none text-sm ${theme === 'dark' ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-300'}`}
                  placeholder="/background-image.webp"
                />
              </div>
              <Slider
                label="Brightness"
                value={config.bgBrightness}
                onChange={(v) => updateConfig('bgBrightness', v)}
                min={0.5}
                max={1.5}
                step={0.01}
              />
              <Slider
                label="Contrast"
                value={config.bgContrast}
                onChange={(v) => updateConfig('bgContrast', v)}
                min={0.5}
                max={1.5}
                step={0.01}
              />
            </div>
          )}
        </div>

        {/* Custom Slider Styles */}
        <style>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #a78bfa;
            cursor: pointer;
            transition: all 0.2s;
          }

          .slider::-webkit-slider-thumb:hover {
            background: #c4b5fd;
            transform: scale(1.1);
          }

          .slider::-moz-range-thumb {
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: #a78bfa;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
          }

          .slider::-moz-range-thumb:hover {
            background: #c4b5fd;
            transform: scale(1.1);
          }
        `}</style>
      </div>
      </div>
    </>
  )
}
