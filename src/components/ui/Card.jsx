import { useTheme } from '../../contexts/ThemeContext'

export default function Card({ children, className = '', hover = false, ...props }) {
  const { theme } = useTheme()
  
  return (
    <div
      className={`
        backdrop-blur-sm border rounded-xl
        ${theme === 'dark' 
          ? 'bg-slate-900/70 border-slate-800' 
          : 'bg-white border-slate-200 shadow-sm'
        }
        ${hover ? `
          hover:border-blue-500/50 hover:shadow-2xl 
          ${theme === 'dark' ? 'hover:shadow-blue-500/10' : 'hover:shadow-blue-500/20'}
          transition-all duration-300
        ` : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  )
}
