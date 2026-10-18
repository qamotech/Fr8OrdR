import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Truck, Wrench, DollarSign, MessageSquare, Users, Clock, Map, ClipboardList, Target } from 'lucide-react'

const LogoMark = () => (
  <svg width="38" height="38" viewBox="0 0 64 64" style={{ filter: 'drop-shadow(0 0 8px rgba(34,211,238,0.45))' }}>
    <defs>
      <linearGradient id="fr8bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
      <linearGradient id="fr8bolt" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22d3ee" />
        <stop offset="100%" stopColor="#818cf8" />
      </linearGradient>
    </defs>
    <polygon points="32,2 58,17 58,47 32,62 6,47 6,17" fill="url(#fr8bg)" stroke="#22d3ee" strokeWidth="2.5" />
    <g fill="none" stroke="#e0e7ff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 36 V24 h20 v12" />
      <path d="M34 28 h9 l7 8 v0 h-16" />
      <circle cx="21" cy="39" r="3.2" fill="#e0e7ff" stroke="none" />
      <circle cx="43" cy="39" r="3.2" fill="#e0e7ff" stroke="none" />
    </g>
    <polygon points="31,14 24,30 30,30 27,44 38,26 31,26" fill="url(#fr8bolt)" />
  </svg>
)

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, onNavigate }) {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="brand" onClick={() => setCollapsed(!collapsed)} title="Toggle Sidebar">
        <div className="brand-icon truck-drive">
          <LogoMark />
        </div>
        <span>Fr8OrdR</span>
      </div>
      <div className="nav-links" onClick={onNavigate}>
        <div className="nav-section">Dispatch</div>
        <NavLink to="/" end title="Dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/load-board" title="Load Board" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ClipboardList size={19} />
          <span>Load Board</span>
        </NavLink>
        <NavLink to="/route-planner" title="Route Planner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Map size={19} />
          <span>Route Planner</span>
        </NavLink>
        <NavLink to="/shipments" title="Shipments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Truck size={19} />
          <span>Shipments</span>
        </NavLink>

        <div className="nav-section">Fleet</div>
        <NavLink to="/fleet" title="Fleet & Drivers" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={19} />
          <span>Fleet & Drivers</span>
        </NavLink>
        <NavLink to="/hos" title="Hours of Service" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Clock size={19} />
          <span>HOS Tracker</span>
        </NavLink>
        <NavLink to="/maintenance" title="Maintenance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Wrench size={19} />
          <span>Maintenance</span>
        </NavLink>
        <NavLink to="/driver-scorecard" title="Driver Scorecard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Target size={19} />
          <span>Driver Scorecard</span>
        </NavLink>

        <div className="nav-section">Business</div>
        <NavLink to="/documents" title="Paperwork Hub" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={19} />
          <span>Paperwork Hub</span>
          <span className="nav-badge">3</span>
        </NavLink>
        <NavLink to="/accounting" title="Accounting" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <DollarSign size={19} />
          <span>Accounting</span>
        </NavLink>
        <NavLink to="/messages" title="Messages" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={19} />
          <span>Messages</span>
          <span className="nav-badge">2</span>
        </NavLink>
      </div>
      <div className="sidebar-footer">
        Fr8OrdR v2.1
      </div>
    </div>
  )
}
