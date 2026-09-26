import { Truck, Map, PhoneCall, HelpCircle, Shield, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer style={{ marginTop: 'auto', paddingTop: 60, paddingBottom: 40, borderTop: '1px solid var(--border)', background: 'var(--bg-panel)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 40, padding: '0 32px', marginBottom: 40 }}>
        
        {/* Brand Section */}
        <div>
          <div className="brand" style={{ fontSize: 20, marginBottom: 16 }}>
            <Truck color="var(--primary)" size={24} />
            <span>Fr8OrdR</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
            The ultimate fleet management and dispatch platform designed specifically for owner-operators and small logistics teams.
          </p>
          <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} Fr8OrdR Tech. All rights reserved.
          </div>
        </div>

        {/* Resources & Links */}
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Industry Resources</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="https://www.fmcsa.dot.gov/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>FMCSA Guidelines</a></li>
            <li><a href="https://www.iftach.org/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>IFTA Fuel Tax Calculator</a></li>
            <li><a href="https://www.weather.gov/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>National Weather Service (NWS)</a></li>
            <li><a href="https://www.dat.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>DAT Load Board Integration</a></li>
            <li><a href="https://csa.fmcsa.dot.gov/" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}>DOT Compliance Checklist</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 16, color: 'var(--text-main)' }}>Support & Help</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><HelpCircle size={14}/> Help Center</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><PhoneCall size={14}/> 24/7 Dispatch Support</a></li>
            <li><a href="#" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><Map size={14}/> Routing Assistance</a></li>
            <li><Link to="/privacy-policy" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><Shield size={14}/> Privacy Policy</Link></li>
            <li><Link to="/terms-of-service" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={14}/> Terms of Service</Link></li>
          </ul>
        </div>

      </div>
    </footer>
  )
}
