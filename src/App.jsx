import { Routes, Route } from 'react-router-dom'
import { useState, useEffect, Suspense, lazy } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastProvider } from './components/ToastProvider'
import MusicWidget from './components/MusicWidget'
import ErrorBoundary from './components/ErrorBoundary'

// Lazy loaded pages for performance (Improvement 38)
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Documents = lazy(() => import('./pages/Documents'))
const Shipments = lazy(() => import('./pages/Shipments'))
const Fleet = lazy(() => import('./pages/Fleet'))
const HOS = lazy(() => import('./pages/HOS'))
const Maintenance = lazy(() => import('./pages/Maintenance'))
const Accounting = lazy(() => import('./pages/Accounting'))
const Messages = lazy(() => import('./pages/Messages'))

// New Features (1-4)
const LoadBoard = lazy(() => import('./pages/LoadBoard'))
const RoutePlanner = lazy(() => import('./pages/RoutePlanner'))
const DriverScorecard = lazy(() => import('./pages/DriverScorecard'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const TermsOfService = lazy(() => import('./pages/TermsOfService'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Global Loading Spinner (Improvement 15)
const GlobalLoader = () => (
  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner pulse-glow" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
)

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('fr8-theme') || 'dark')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024)

  // Auto-collapse sidebar on resize (Improvement 6)
  useEffect(() => {
    const handleResize = () => setSidebarCollapsed(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Suggestion 4: Dark Mode Auto-Sync with OS
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('fr8-theme-override')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    // Initial check if no local storage preference exists
    if (!localStorage.getItem('fr8-theme') && !localStorage.getItem('fr8-theme-override')) {
      setTheme(mediaQuery.matches ? 'dark' : 'light')
    }
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fr8-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(t => {
      const newTheme = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('fr8-theme-override', 'true') // mark as manually overridden
      return newTheme
    })
  }

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="app-layout">
          <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <div className="main-content">
            <Header theme={theme} toggleTheme={toggleTheme} setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed} />
            <div className="scroll-area">
              <Suspense fallback={<GlobalLoader />}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/shipments" element={<Shipments />} />
                  <Route path="/fleet" element={<Fleet />} />
                  <Route path="/hos" element={<HOS />} />
                  <Route path="/maintenance" element={<Maintenance />} />
                  <Route path="/accounting" element={<Accounting />} />
                  <Route path="/messages" element={<Messages />} />
                  <Route path="/load-board" element={<LoadBoard />} />
                  <Route path="/route-planner" element={<RoutePlanner />} />
                  <Route path="/driver-scorecard" element={<DriverScorecard />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </div>
          <MusicWidget />
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}
export default App
