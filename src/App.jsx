import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Documents from './pages/Documents'
import Shipments from './pages/Shipments'
import Maintenance from './pages/Maintenance'
import Accounting from './pages/Accounting'
import Messages from './pages/Messages'
import MusicWidget from './components/MusicWidget'

function App() {
  const [theme, setTheme] = useState('dark')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  return (
    <div className="app-layout">
      <Sidebar collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      <div className="main-content">
        <Header theme={theme} toggleTheme={toggleTheme} />
        <div className="scroll-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route path="/accounting" element={<Accounting />} />
            <Route path="/messages" element={<Messages />} />
          </Routes>
        </div>
      </div>
      <MusicWidget />
    </div>
  )
}
export default App
