import { useTheme } from '../../contexts/ThemeContext'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) {
  const { theme } = useTheme()
  
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variants = {
    primary: `
      bg-linear-to-r from-blue-600 to-cyan-600 
      hover:from-blue-700 hover:to-cyan-700 
      text-white shadow-lg shadow-blue-500/25 
      hover:shadow-xl hover:shadow-blue-500/40 hover:scale-[1.02] 
      active:scale-[0.98]
      ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-blue-600'}
    `,
    secondary: `
      ${theme === 'dark' 
        ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200' 
        : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900'
      }
      hover:scale-[1.02] active:scale-[0.98]
      ${theme === 'dark' ? 'focus:ring-slate-500' : 'focus:ring-slate-400'}
    `,
    outline: `
      border-2 
      ${theme === 'dark'
        ? 'border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500'
        : 'border-blue-600 text-blue-600 hover:bg-blue-50'
      }
      hover:scale-[1.02] active:scale-[0.98]
      ${theme === 'dark' ? 'focus:ring-blue-500' : 'focus:ring-blue-600'}
    `,
    ghost: `
      ${theme === 'dark'
        ? 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      }
      ${theme === 'dark' ? 'focus:ring-slate-600' : 'focus:ring-slate-400'}
    `,
    danger: `
      bg-linear-to-r from-red-600 to-red-700 
      hover:from-red-700 hover:to-red-800 
      text-white shadow-lg shadow-red-500/25 
      hover:shadow-xl hover:shadow-red-500/40 hover:scale-[1.02] 
      active:scale-[0.98]
      focus:ring-red-500
    `,
    success: `
      bg-linear-to-r from-green-600 to-emerald-600 
      hover:from-green-700 hover:to-emerald-700 
      text-white shadow-lg shadow-green-500/25 
      hover:shadow-xl hover:shadow-green-500/40 hover:scale-[1.02] 
      active:scale-[0.98]
      focus:ring-green-500
    `,
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-2.5 text-base gap-2',
    lg: 'px-8 py-3.5 text-lg gap-2.5',
    xl: 'px-10 py-4 text-xl gap-3',
  }

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
}
