import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Truck, Wrench, DollarSign, MessageSquare, Users, Clock, Map, ClipboardList, Target } from 'lucide-react'

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand" onClick={() => setCollapsed(!collapsed)} title="Toggle Sidebar">
        <div className="brand-icon truck-drive">
          <Truck color="var(--primary)" size={30} />
        </div>
        <span>Fr8OrdR</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end title="Dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/documents" title="Paperwork Hub" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={19} />
          <span>Paperwork Hub</span>
          <span className="nav-badge">3</span>
        </NavLink>
        <NavLink to="/shipments" title="Shipments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Truck size={19} />
          <span>Shipments</span>
        </NavLink>
        
        {/* NEW FEATURE LINKS */}
        <NavLink to="/load-board" title="Load Board" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <ClipboardList size={19} />
          <span>Load Board</span>
        </NavLink>
        <NavLink to="/route-planner" title="Route Planner" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Map size={19} />
          <span>Route Planner</span>
        </NavLink>
        <NavLink to="/driver-scorecard" title="Driver Scorecard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Target size={19} />
          <span>Driver Scorecard</span>
        </NavLink>

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
        Fr8OrdR v2.0
      </div>
    </div>
  )
}
