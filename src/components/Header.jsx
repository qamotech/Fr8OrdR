import { Bell, Search, Sun, Moon, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PAGE_SUBTITLES = {
  '/': "Here's what's happening with the fleet today.",
  '/documents': 'Upload, process, and manage all your paperwork.',
  '/shipments': 'Track active loads and manage dispatches.',
  '/fleet': 'Manage your vehicles and driver assignments.',
  '/hos': 'Hours of Service compliance and driver logs.',
  '/maintenance': 'Stay on top of vehicle service and repairs.',
  '/accounting': 'Invoices, payments, and financial overview.',
  '/messages': 'Dispatch chat — stay connected with drivers.'
}

const NOTIFICATIONS = [
  { id: 1, text: 'Load #LD-8492 delivered to Chicago', time: '5m ago', type: 'success' },
  { id: 2, text: 'Truck 102 oil change overdue by 3 days', time: '1h ago', type: 'warning' },
  { id: 3, text: 'Mike uploaded BOL for Load #LD-8491', time: '2h ago', type: 'info' },
]

export default function Header({ theme, toggleTheme }) {
  const [showNotifs, setShowNotifs] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [notifCount, setNotifCount] = useState(NOTIFICATIONS.length)
  const [clock, setClock] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setClock(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
    }
    tick()
    const id = setInterval(tick, 30000)
    return () => clearInterval(id)
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const subtitle = PAGE_SUBTITLES[location.pathname] || PAGE_SUBTITLES['/']

  return (
    <div className="top-header">
      <div className="header-title">
        <h1>{getGreeting()}, Jodi</h1>
        <p>{subtitle}</p>
      </div>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13, marginRight: 8 }}>
          <Clock size={14} />
          <span style={{ fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
        </div>

        {/* Suggestion 2: Live Pulse Connection Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginRight: 10 }}>
          <div className="pulse-glow" style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--success)' }}></div>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--success)' }}>Online</span>
        </div>

        <div className="search-bar" style={{ position: 'relative' }}>
          <Search size={16} color="var(--text-muted)" />
          <input 
            type="text" 
            placeholder="Search loads, drivers..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                alert(`Searching for: ${e.target.value}`)
                e.target.value = ''
              }
            }}
          />
        </div>
        
        <button className="btn-secondary" onClick={toggleTheme} title="Toggle Theme" style={{ padding: '7px 9px' }}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <div style={{ position: 'relative' }}>
          <button className="btn-secondary" title="Notifications" onClick={() => { setShowNotifs(!showNotifs); setNotifCount(0); }} style={{ padding: '7px 9px' }}>
            <Bell size={18} />
          </button>
          {notifCount > 0 && (
            <span style={{
              position: 'absolute', top: -5, right: -5,
              background: 'var(--danger)', color: 'white',
              borderRadius: '50%', width: 18, height: 18,
              fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              pointerEvents: 'none',
              animation: 'livePulse 2s ease infinite'
            }}>
              {notifCount}
            </span>
          )}

          {showNotifs && (
            <div className="notif-panel">
              <div className="notif-header">
                <span>Notifications</span>
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setNotifCount(0)} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: 12, fontWeight: 600 }}>Clear All</button>
                  <button onClick={() => setShowNotifs(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 12 }}>Close</button>
                </div>
              </div>
              {NOTIFICATIONS.map(n => (
                <div key={n.id} className="notif-item">
                  <div className="notif-dot" style={{ background: n.type === 'warning' ? 'var(--warning)' : n.type === 'success' ? 'var(--success)' : 'var(--primary)' }} />
                  <div>
                    <p style={{ fontSize: 13, marginBottom: 2 }}>{n.text}</p>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{n.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Profile Dropdown Toggle */}
        <div style={{ position: 'relative' }}>
          <div className="user-profile hover-scale" onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ cursor: 'pointer', transition: 'transform 0.2s', position: 'relative', zIndex: 100 }}>
            <img src="/jodi_avatar.jpg" alt="Jodi P." style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover' }} />
            <span className="hide-on-mobile" style={{ fontSize: '13px', fontWeight: '600' }}>Jodi P.</span>
          </div>

          {showProfileMenu && (
            <>
              {/* Click-outside backdrop */}
              <div style={{ position: 'fixed', inset: 0, zIndex: 98 }} onClick={() => setShowProfileMenu(false)} />
              
              {/* Dropdown Menu */}
              <div className="glass-panel animate-slide-up" style={{ position: 'absolute', top: '120%', right: 0, width: 260, padding: 0, zIndex: 99, boxShadow: '0 24px 48px rgba(0,0,0,0.3)', overflow: 'hidden' }}>
                <div style={{ padding: 20, borderBottom: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Jodi P.</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>Fleet Dispatcher / Manager</div>
                  <div style={{ marginTop: 12, fontSize: 12 }}>
                    <div style={{ color: 'var(--text-muted)' }}>jodi.p@fr8ordr.app</div>
                    <div style={{ color: 'var(--text-muted)' }}>+1 (555) 839-2041</div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <button className="dropdown-item" onClick={toggleTheme} style={{ padding: '12px 20px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--text-main)', cursor: 'pointer', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>Theme</span>
                    <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                  <button className="dropdown-item" onClick={() => { setShowProfileMenu(false); navigate('/profile'); }} style={{ padding: '12px 20px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--text-main)', cursor: 'pointer', borderBottom: '1px solid var(--border)' }}>
                    Account Settings
                  </button>
                  <button className="dropdown-item" onClick={() => setShowProfileMenu(false)} style={{ padding: '12px 20px', border: 'none', background: 'none', textAlign: 'left', color: 'var(--danger)', cursor: 'pointer' }}>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
