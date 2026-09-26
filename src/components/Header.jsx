import { Bell, Search, Sun, Moon } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

const PAGE_SUBTITLES = {
  '/': "Here's what's happening with the fleet today.",
  '/documents': 'Upload, process, and manage all your paperwork.',
  '/shipments': 'Track active loads and manage dispatches.',
  '/maintenance': 'Stay on top of vehicle service and repairs.',
  '/accounting': 'Invoices, payments, and financial overview.',
  '/messages': 'Dispatch chat — stay connected with drivers.'
}

export default function Header({ theme, toggleTheme }) {
  const [notifications, setNotifications] = useState(3)
  const location = useLocation()
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  const subtitle = PAGE_SUBTITLES[location.pathname] || PAGE_SUBTITLES['/']

  return (
    <div className="top-header">
      <div className="header-title">
        <h1>{getGreeting()}, Jodi</h1>
        <p>{subtitle}</p>
      </div>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <div className="search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search loads, drivers, or docs..." />
        </div>
        
        <button className="btn-secondary" onClick={toggleTheme} title="Toggle Theme" style={{ padding: '8px 10px' }}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div style={{ position: 'relative' }}>
          <button className="btn-secondary" title="Notifications" onClick={() => setNotifications(0)} style={{ padding: '8px 10px' }}>
            <Bell size={20} />
          </button>
          {notifications > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6,
              background: 'var(--danger)', color: 'white',
              borderRadius: '50%', width: 20, height: 20,
              fontSize: 11, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none'
            }}>
              {notifications}
            </span>
          )}
        </div>
        
        <div className="user-profile">
          <img src="/jodi_avatar.jpg" alt="Jodi P." style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>Jodi P.</span>
        </div>
      </div>
    </div>
  )
}
