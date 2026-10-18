import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState, useEffect, useCallback, Suspense, lazy } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastProvider } from './components/ToastProvider'
import MusicWidget from './components/MusicWidget'
import ErrorBoundary from './components/ErrorBoundary'
import DemoTour from './components/DemoTour'

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
const Profile = lazy(() => import('./pages/Profile'))

// Global Loading Spinner (Improvement 15)
const GlobalLoader = () => (
  <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
    <div className="spinner pulse-glow" style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
  </div>
)

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('fr8-theme')
    if (saved) return saved
    if (!localStorage.getItem('fr8-theme-override') && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'dark'
  })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 1024)
  const navigate = useNavigate()

  const [showShortcuts, setShowShortcuts] = useState(false)
  const [runTour, setRunTour] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('demo') === 'true' || params.get('tour') === 'true'
    } catch {
      return false
    }
  })

  const toggleTheme = useCallback(() => {
    setTheme(t => {
      const newTheme = t === 'dark' ? 'light' : 'dark'
      localStorage.setItem('fr8-theme-override', 'true') // mark as manually overridden
      return newTheme
    })
  }, [])

  // Redirect to Dashboard (/) on refresh/initial load
  useEffect(() => {
    if (!sessionStorage.getItem('fr8-first-load')) {
      sessionStorage.setItem('fr8-first-load', 'true')
      navigate('/')
    }
  }, [navigate])

  // Global Dispatcher Keyboard Shortcuts (Operational Velocity)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when user is typing in form inputs
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName) || e.target.isContentEditable) {
        if (e.key === 'Escape') {
          e.target.blur()
        }
        return
      }

      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault()
        setShowShortcuts(prev => !prev)
        return
      }

      if (e.key === 'Escape') {
        setShowShortcuts(false)
        return
      }

      if (e.key === '/') {
        e.preventDefault()
        const searchInput = document.getElementById('global-search-input')
        if (searchInput) searchInput.focus()
        return
      }

      if (e.key === 't' || e.key === 'T') {
        e.preventDefault()
        toggleTheme()
        return
      }

      if (e.key === 'p' || e.key === 'P') {
        e.preventDefault()
        setRunTour(prev => !prev)
        return
      }

      // Quick numeric navigation
      const navMap = {
        '1': '/',
        '2': '/load-board',
        '3': '/route-planner',
        '4': '/shipments',
        '5': '/fleet',
        '6': '/hos',
        '7': '/maintenance',
        '8': '/accounting',
        '9': '/messages',
        '0': '/documents'
      }
      if (navMap[e.key]) {
        e.preventDefault()
        navigate(navMap[e.key])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate, toggleTheme])

  // Auto-collapse sidebar on resize (Improvement 6)
  useEffect(() => {
    const handleResize = () => setSidebarCollapsed(window.innerWidth < 1024)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Dark Mode Auto-Sync with OS
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => {
      if (!localStorage.getItem('fr8-theme-override')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fr8-theme', theme)
  }, [theme])

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="app-layout">
          <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
          <div className="main-content">
            <Header theme={theme} toggleTheme={toggleTheme} startDemo={() => setRunTour(true)} setSidebarCollapsed={setSidebarCollapsed} sidebarCollapsed={sidebarCollapsed} />
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
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
              <Footer />
            </div>
          </div>
          <MusicWidget />
          <DemoTour active={runTour} onClose={() => setRunTour(false)} />

          {/* Quick Shortcuts Cheat-Sheet Modal */}
          {showShortcuts && (
            <div 
              style={{
                position: 'fixed', inset: 0, zIndex: 10000,
                background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(6px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
              }}
              onClick={() => setShowShortcuts(false)}
            >
              <div 
                className="glass-panel animate-slide-up" 
                style={{ width: '100%', maxWidth: 480, padding: 26, boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
                onClick={e => e.stopPropagation()}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700 }}>⚡ Dispatcher Quick Hotkeys</h3>
                  <button className="btn-secondary" onClick={() => setShowShortcuts(false)} style={{ padding: '4px 10px', fontSize: 12 }}>Esc</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Focus Search</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>/</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Play Demo Tour</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700, color: 'var(--primary)' }}>P</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Toggle Theme</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>T</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Dashboard</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>1</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Load Board</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>2</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Route Planner</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>3</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Shipments</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>4</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Fleet & Drivers</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>5</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>HOS Tracker</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>6</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Maintenance</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>7</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Accounting</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>8</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Dispatch Chat</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>9</kbd>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 8px', background: 'var(--input-bg)', borderRadius: 8 }}>
                    <span>Paperwork Hub</span> <kbd style={{ padding: '2px 6px', background: 'var(--bg-card)', borderRadius: 4, fontWeight: 700 }}>0</kbd>
                  </div>
                </div>
                <p style={{ marginTop: 16, fontSize: 11, color: 'var(--text-muted)', textAlign: 'center' }}>
                  Press <kbd style={{ padding: '1px 5px', background: 'var(--input-bg)', borderRadius: 4 }}>?</kbd> anytime to toggle this helper.
                </p>
              </div>
            </div>
          )}
        </div>
      </ToastProvider>
    </ErrorBoundary>
  )
}
export default App

