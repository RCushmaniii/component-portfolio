import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Zap, Target, Lightbulb } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import Button from '../components/ui/Button'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const { theme } = useTheme()
  const [particles, setParticles] = useState([])
  
  // Generate floating particles for razzle dazzle effect
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = []
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          duration: Math.random() * 3 + 2,
          delay: Math.random() * 2
        })
      }
      setParticles(newParticles)
    }
    
    generateParticles()
  }, [])
  
  return (
    <div className={`min-h-screen relative overflow-hidden ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-slate-950 via-purple-950/20 to-slate-950' 
        : 'bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50'
    }`}>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${
              theme === 'dark' ? 'bg-purple-400/30' : 'bg-purple-500/20'
            }`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animation: `float ${particle.duration}s ease-in-out infinite ${particle.delay}s alternate`
            }}
          />
        ))}
      </div>

      {/* Animated Grid Background */}
      <div className={`absolute inset-0 opacity-20 ${
        theme === 'dark' ? 'bg-grid-white/[0.05]' : 'bg-grid-slate-900/[0.04]'
      }`} 
      style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, ${
          theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'
        } 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl mx-auto">
          
          {/* Glowing 404 with Animation */}
          <div className="relative mb-8">
            <h1 className={`text-8xl md:text-9xl lg:text-[12rem] font-black mb-4 relative ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(45deg, #a855f7, #ec4899, #3b82f6, #10b981)'
                : 'linear-gradient(45deg, #7c3aed, #db2777, #2563eb, #059669)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradientShift 4s ease-in-out infinite'
            }}>
              404
            </h1>
            
            {/* Glow Effect */}
            <div className={`absolute inset-0 text-8xl md:text-9xl lg:text-[12rem] font-black blur-2xl opacity-30 ${
              theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
            }`}
            style={{
              background: 'linear-gradient(45deg, #a855f7, #ec4899)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              404
            </div>
          </div>

          {/* Animated Title */}
          <div className="mb-6">
            <h2 className={`text-2xl md:text-4xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>
              <Zap className={`inline-block w-8 h-8 md:w-10 md:h-10 animate-pulse mr-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
              }`} />
              Oops! Page Not Found
              <Zap className={`inline-block w-8 h-8 md:w-10 md:h-10 animate-pulse ml-2 ${
                theme === 'dark' ? 'text-cyan-400' : 'text-blue-600'
              }`} style={{ animationDelay: '0.5s' }} />
            </h2>
            <div className={`h-1 w-24 mx-auto rounded-full ${
              theme === 'dark' 
                ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                : 'bg-gradient-to-r from-purple-600 to-pink-600'
            }`} />
          </div>

          {/* Description */}
          <p className={`text-lg md:text-xl mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-slate-100' : 'text-slate-600'
          }`}>
            The page you're looking for seems to have vanished into the digital void.
            <br />
            <span className="inline-flex items-center gap-2 mt-2">
              Don't worry, let's get you back on track! 
              <Lightbulb className={`w-5 h-5 animate-pulse ${
                theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'
              }`} />
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/">
              <Button 
                size="lg" 
                className={`group transition-all duration-300 hover:scale-105 ${
                  theme === 'dark' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white border-0' 
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0'
                }`}
              >
                <Home className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Take Me Home
              </Button>
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600'
                  : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 hover:border-slate-400 shadow-sm'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>

          {/* Fun Stats */}
          <div className={`mt-12 p-6 rounded-2xl backdrop-blur-sm border ${
            theme === 'dark' 
              ? 'bg-slate-900/50 border-slate-700/50' 
              : 'bg-white/70 border-slate-200/50'
          }`}>
            <p className={`text-sm ${
              theme === 'dark' ? 'text-slate-200' : 'text-slate-600'
            }`}>
              <Target className="inline-block w-4 h-4 text-blue-500 mr-1" />
              <strong>Fun Fact:</strong> You're one of the lucky few to discover our spectacular 404 page!
              <br />
              <span className="flex items-start gap-2 mt-1">
                <Zap className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
                }`} />
                <span>Error code 404 means "Not Found" - but you found something cool anyway!</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.4); }
          50% { box-shadow: 0 0 40px rgba(168, 85, 247, 0.8); }
        }
      `}</style>
    </div>
  )
}
