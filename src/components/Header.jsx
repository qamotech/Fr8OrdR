import { Bell, Search, Sun, Moon, CheckCheck } from 'lucide-react'
import { useState } from 'react'

export default function Header({ theme, toggleTheme }) {
  const [notifications, setNotifications] = useState(3)
  
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  }

  return (
    <div className="top-header">
      <div className="header-title">
        <h1>{getGreeting()}, Jodi</h1>
        <p>Here's what's happening with the fleet today.</p>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div className="search-bar">
          <Search size={18} color="var(--text-muted)" />
          <input type="text" placeholder="Search loads, drivers, or docs..." />
        </div>
        
        <button className="btn-secondary" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div style={{ position: 'relative' }}>
          <button className="btn-secondary" title="Notifications">
            <Bell size={20} />
            {notifications > 0 && (
              <span style={{ position: 'absolute', top: -5, right: -5, background: 'var(--danger)', color: 'white', borderRadius: '50%', width: 20, height: 20, fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {notifications}
              </span>
            )}
          </button>
          {notifications > 0 && (
            <button onClick={() => setNotifications(0)} style={{ position: 'absolute', top: 40, right: 0, background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: 12, cursor: 'pointer', display: 'flex', gap: 4, alignItems: 'center' }}>
              <CheckCheck size={14} /> Mark Read
            </button>
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
