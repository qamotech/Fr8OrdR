import { NavLink } from 'react-router-dom'
import { LayoutDashboard, FileText, Truck, Wrench, DollarSign, MessageSquare } from 'lucide-react'

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand" onClick={() => setCollapsed(!collapsed)}>
        <Truck color="var(--primary)" size={32} />
        <span>Fr8OrdR</span>
      </div>
      <div className="nav-links">
        <NavLink to="/" end title="Dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink to="/documents" title="Paperwork Hub" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={20} />
          <span>Paperwork Hub</span>
        </NavLink>
        <NavLink to="/shipments" title="Shipments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Truck size={20} />
          <span>Shipments</span>
        </NavLink>
        <NavLink to="/maintenance" title="Maintenance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Wrench size={20} />
          <span>Maintenance</span>
        </NavLink>
        <NavLink to="/accounting" title="Accounting" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <DollarSign size={20} />
          <span>Accounting</span>
        </NavLink>
        <NavLink to="/messages" title="Messages" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <MessageSquare size={20} />
          <span>Messages</span>
        </NavLink>
      </div>
    </div>
  )
}
