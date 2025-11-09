import { Link } from 'react-router-dom'
import { Heart, Github, Twitter, Linkedin, Mail, ExternalLink, Sun, Moon } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export default function Footer() {
  const { theme, toggleTheme } = useTheme()
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    product: [
      { name: 'Components', href: '/' },
      { name: 'Documentation', href: '#' },
      { name: 'Changelog', href: '#' },
      { name: 'Roadmap', href: '#' },
    ],
    resources: [
      { name: 'Getting Started', href: '#' },
      { name: 'Examples', href: '#' },
      { name: 'Best Practices', href: '#' },
      { name: 'API Reference', href: '#' },
    ],
    company: [
      { name: 'About', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'GitHub', href: 'https://github.com', external: true },
      { name: 'Contact', href: '#' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com' },
    { name: 'Email', icon: Mail, href: 'mailto:hello@example.com' },
  ]

  return (
    <footer className={`relative border-t ${
      theme === 'dark' 
        ? 'bg-slate-950 border-slate-800' 
        : 'bg-slate-50 border-slate-200'
    }`}>
      {/* Decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Brand Column with Logo */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block group mb-4">
                {/* Logo Image */}
                <img 
                  src={theme === 'dark' ? '/images/logo/logo-dark.png' : '/images/logo/logo-light.png'}
                  alt="Component Storm Logo"
                  className="h-12 w-auto transition-opacity group-hover:opacity-90"
                />
              </Link>
              
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                A curated collection of cutting-edge React components that push the boundaries of modern web design.
              </p>
              
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2 rounded-lg transition-all ${
                        theme === 'dark'
                          ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                          : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                      } hover:scale-110`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors inline-flex items-center gap-1 ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className={`text-sm transition-colors inline-flex items-center gap-1 ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-blue-400'
                          : 'text-slate-600 hover:text-blue-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className={`text-sm font-semibold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}>
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm transition-colors inline-flex items-center gap-1 ${
                          theme === 'dark'
                            ? 'text-slate-400 hover:text-blue-400'
                            : 'text-slate-600 hover:text-blue-600'
                        }`}
                      >
                        {link.name}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className={`text-sm transition-colors inline-flex items-center gap-1 ${
                          theme === 'dark'
                            ? 'text-slate-400 hover:text-blue-400'
                            : 'text-slate-600 hover:text-blue-600'
                        }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`py-6 border-t ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <p className={`text-sm flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              © {currentYear} Component Storm. All rights reserved.
            </p>
            
            {/* Theme Toggle in Footer */}
            <div className="flex items-center gap-4">
              <p className={`text-sm flex items-center gap-2 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> using React & Tailwind
              </p>
              
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all hover:scale-110 ${
                  theme === 'dark'
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white'
                    : 'bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
