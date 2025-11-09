import { Link } from 'react-router-dom'
import { Heart, Code2, Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
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
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500 to-transparent" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-3 group mb-4">
                <div className="p-2 bg-linear-to-br from-blue-600 to-cyan-600 rounded-lg group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <span className={`text-xl font-bold bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent`}>
                  Component Portfolio
                </span>
              </Link>
              <p className={`text-sm mb-6 ${
                theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Production-ready React components with interactive demos and best practices.
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
            <p className={`text-sm flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              © {currentYear} Component Portfolio. All rights reserved.
            </p>
            <p className={`text-sm flex items-center gap-2 ${
              theme === 'dark' ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Built with <Heart className="w-4 h-4 text-pink-500 fill-pink-500 animate-pulse" /> using React, Vite & Tailwind
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
