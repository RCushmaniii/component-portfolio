import { Routes, Route } from 'react-router-dom'
import { useTheme } from './contexts/ThemeContext'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import ComponentDemoPage from './pages/ComponentDemoPage'
import ComponentPortfolioLanding from './pages/ComponentPortfolioLanding'
import NotFound from './pages/NotFound'

function App() {
  const { theme } = useTheme()
  
  // Layout wrapper component
  const Layout = ({ children }) => (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-linear-to-br from-slate-950 via-blue-950/30 to-slate-950' 
        : 'bg-linear-to-br from-slate-50 via-blue-50 to-slate-100'
    }`}>
      <Header />
      <main className="min-h-[calc(100vh-64px)] w-full">
        {children}
      </main>
      <Footer />
    </div>
  )
  
  return (
    <Routes>
      {/* Routes with layout */}
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/portfolio" element={<Layout><ComponentPortfolioLanding /></Layout>} />
      <Route path="/demo/:componentId" element={<Layout><ComponentDemoPage /></Layout>} />
      <Route path="*" element={<Layout><NotFound /></Layout>} />
    </Routes>
  )
}

export default App
