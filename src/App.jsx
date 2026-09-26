import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import { ToastProvider } from './components/ToastProvider'
import MusicWidget from './components/MusicWidget'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Shipments from './pages/Shipments'
import Maintenance from './pages/Maintenance'
import Accounting from './pages/Accounting'
import Messages from './pages/Messages'
import Fleet from './pages/Fleet'
import HOS from './pages/HOS'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('fr8-theme') || 'dark')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('fr8-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')

  return (
    <ToastProvider>
      <div className="app-layout">
        <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
        <div className="main-content">
          <Header theme={theme} toggleTheme={toggleTheme} />
          <div className="scroll-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/shipments" element={<Shipments />} />
              <Route path="/fleet" element={<Fleet />} />
              <Route path="/hos" element={<HOS />} />
              <Route path="/maintenance" element={<Maintenance />} />
              <Route path="/accounting" element={<Accounting />} />
              <Route path="/messages" element={<Messages />} />
            </Routes>
          </div>
        </div>
        <MusicWidget />
      </div>
    </ToastProvider>
  )
}
export default App
