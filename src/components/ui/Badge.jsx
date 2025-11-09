import { useTheme } from '../../contexts/ThemeContext'

export default function Badge({ children, variant = 'default', className = '' }) {
  const { theme } = useTheme()
  
  const variants = {
    default: theme === 'dark' 
      ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
      : 'bg-slate-200 text-slate-700 hover:bg-slate-300',
    primary: theme === 'dark'
      ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30'
      : 'bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200',
    success: theme === 'dark'
      ? 'bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30'
      : 'bg-green-100 text-green-700 border border-green-300 hover:bg-green-200',
    warning: theme === 'dark'
      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 hover:bg-yellow-500/30'
      : 'bg-yellow-100 text-yellow-700 border border-yellow-300 hover:bg-yellow-200',
    info: theme === 'dark'
      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30'
      : 'bg-cyan-100 text-cyan-700 border border-cyan-300 hover:bg-cyan-200',
    danger: theme === 'dark'
      ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
      : 'bg-red-100 text-red-700 border border-red-300 hover:bg-red-200',
  }

  return (
    <span
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-sm font-medium
        transition-all duration-200 hover:scale-105
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </span>
  )
}
