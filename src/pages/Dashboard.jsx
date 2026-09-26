import { useState, useEffect } from 'react'
import { Truck, DollarSign, Package, AlertTriangle, CloudRain, Star, ChevronDown, TrendingUp, Fuel } from 'lucide-react'

function AnimatedNumber({ value, prefix = '', suffix = '' }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const target = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.]/g, '')) : value
    const step = target / 30
    let current = 0
    const timer = setInterval(() => {
      current += step
      if (current >= target) { setDisplay(target); clearInterval(timer); return }
      setDisplay(Math.floor(current))
    }, 30)
    return () => clearInterval(timer)
  }, [value])
  return <>{prefix}{display.toLocaleString()}{suffix}</>
}

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', height: 220, position: 'relative', boxShadow: 'var(--glass-shadow)' }}>
        <img src="/hero_truck_banner.jpg" alt="Fr8OrdR Logistics" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,17,26,0.8), transparent)', display: 'flex', alignItems: 'center', padding: '0 32px' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 8, letterSpacing: -0.5 }}>Command Your Fleet</h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 15, maxWidth: 400 }}>Real-time analytics, routing, and dispatching all in one place.</p>
          </div>
        </div>
      </div>

      <div className="grid-cards stagger-children">
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Active Loads</span>
            <div className="stat-icon"><Truck size={18} /></div>
          </div>
          <div className="stat-value"><AnimatedNumber value={4} /></div>
          <p style={{ color: 'var(--success)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={14} /> +1 from yesterday</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Pending Docs</span>
            <div className="stat-icon" style={{ color: 'var(--warning)', background: 'rgba(245,158,11,0.1)' }}><Package size={18} /></div>
          </div>
          <div className="stat-value"><AnimatedNumber value={12} /></div>
          <p style={{ color: 'var(--text-muted)', fontSize: '12px' }}>3 require signature</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Revenue (Week)</span>
            <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)' }}><DollarSign size={18} /></div>
          </div>
          <div className="stat-value"><AnimatedNumber value={14250} prefix="$" /></div>
          <p style={{ color: 'var(--success)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: 4 }}><TrendingUp size={14} /> +12% vs last week</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Fuel Costs</span>
            <div className="stat-icon" style={{ color: 'var(--secondary)', background: 'rgba(236,72,153,0.1)' }}><Fuel size={18} /></div>
          </div>
          <div className="stat-value"><AnimatedNumber value={3820} prefix="$" /></div>
          <p style={{ color: 'var(--danger)', fontSize: '12px' }}>↑ 8% vs last week</p>
        </div>
      </div>

      {/* Weather Alert Banner */}
      <div className="glass-card" style={{ padding: '14px 20px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(56,189,248,0.06)', borderColor: 'rgba(56,189,248,0.2)' }}>
        <CloudRain size={22} color="#38bdf8" />
        <div style={{ flex: 1 }}>
          <span style={{ fontWeight: 600, fontSize: 14 }}>Weather Alert: </span>
          <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Heavy rain on I-95 corridor — affecting Load #LD-8490 (Sam T.)</span>
        </div>
        <span className="badge badge-warning">⚡ Active</span>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '22px' }}>
          <div className="section-title">
            <span>Recent Shipments</span>
            <button className="btn-secondary" style={{ padding: '5px 12px', fontSize: '12px' }}>View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Load ID <ChevronDown size={12} style={{display: 'inline', marginLeft: 3, opacity: 0.5}}/></th>
                <th>Destination</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>#LD-8492</td>
                <td>Chicago, IL</td>
                <td>Mike (Husband)</td>
                <td><span className="badge badge-info"><span className="live-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} /> In Transit</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#LD-8491</td>
                <td>Dallas, TX</td>
                <td>Dave R.</td>
                <td><span className="badge badge-success">✓ Delivered</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#LD-8490</td>
                <td>Atlanta, GA</td>
                <td>Sam T.</td>
                <td><span className="badge badge-warning">⚠ Delayed</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>#LD-8489</td>
                <td>Memphis, TN</td>
                <td>Mike (Husband)</td>
                <td><span className="badge badge-success">✓ Delivered</span></td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0 0 0', color: 'var(--text-muted)', fontSize: 12, borderTop: '1px solid var(--border)', marginTop: 14 }}>
            <span>Showing 1-4 of 45</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button className="btn-secondary" style={{ padding: '3px 8px', fontSize: 12 }}>Prev</button>
              <button className="btn-secondary" style={{ padding: '3px 8px', fontSize: 12 }}>Next</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '22px' }}>
            <div className="section-title"><span>Driver Leaderboard</span></div>
            <div className="activity-list stagger-children">
              <div className="activity-item">
                <div className="activity-icon" style={{ background: 'rgba(250,204,21,0.15)', color: '#facc15' }}><Star size={18} /></div>
                <div className="activity-content">
                  <h4>Mike (Husband)</h4>
                  <p>3,240 mi this week</p>
                </div>
                <div className="activity-time" style={{ color: 'var(--success)', fontWeight: 700, fontSize: 13 }}>#1</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon"><Star size={18} color="var(--text-muted)"/></div>
                <div className="activity-content">
                  <h4>Dave R.</h4>
                  <p>2,890 mi this week</p>
                </div>
                <div className="activity-time" style={{ fontWeight: 600 }}>#2</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon"><Star size={18} color="var(--text-muted)"/></div>
                <div className="activity-content">
                  <h4>Sam T.</h4>
                  <p>2,410 mi this week</p>
                </div>
                <div className="activity-time">#3</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '22px' }}>
            <div className="section-title"><span>Recent Uploads</span></div>
            <div className="activity-list stagger-children">
              <div className="activity-item">
                <div className="activity-icon">📄</div>
                <div className="activity-content">
                  <h4>BOL - Load #LD-8491</h4>
                  <p>Uploaded by Mike</p>
                </div>
                <div className="activity-time">2m ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">⛽</div>
                <div className="activity-content">
                  <h4>Fuel Receipt</h4>
                  <p>Pilot Flying J — $450</p>
                </div>
                <div className="activity-time">1h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
