import { Truck, DollarSign, Package, AlertTriangle, CloudRain, Star, ChevronDown, ChevronUp } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="animate-fade-in">
      <div className="grid-cards">
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Active Loads</span>
            <div className="stat-icon"><Truck size={20} /></div>
          </div>
          <div className="stat-value">4</div>
          <p style={{ color: 'var(--success)', fontSize: '13px' }}>+1 from yesterday</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Pending Paperwork</span>
            <div className="stat-icon" style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)' }}><Package size={20} /></div>
          </div>
          <div className="stat-value">12</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>3 require signature</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Revenue (Week)</span>
            <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)' }}><DollarSign size={20} /></div>
          </div>
          <div className="stat-value">$14,250.00</div>
          <p style={{ color: 'var(--success)', fontSize: '13px' }}>+12% vs last week</p>
        </div>
        <div className="glass-card stat-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(15,17,26,0.8))' }}>
          <div className="stat-header">
            <span>Weather Route Alerts</span>
            <div className="stat-icon" style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.1)' }}><CloudRain size={20} /></div>
          </div>
          <div className="stat-value" style={{ fontSize: '24px' }}>Heavy Rain (I-95)</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Affecting Load #LD-8490</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div className="section-title">
            <span>Recent Shipments</span>
            <button className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }}>View All</button>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Load ID <ChevronDown size={14} style={{display: 'inline', marginLeft: 4}}/></th>
                <th>Destination</th>
                <th>Driver</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#LD-8492</td>
                <td>Chicago, IL</td>
                <td>Mike (Husband)</td>
                <td><span className="badge badge-info">In Transit</span></td>
              </tr>
              <tr>
                <td>#LD-8491</td>
                <td>Dallas, TX</td>
                <td>Dave R.</td>
                <td><span className="badge badge-success">Delivered</span></td>
              </tr>
              <tr>
                <td>#LD-8490</td>
                <td>Atlanta, GA</td>
                <td>Sam T.</td>
                <td><span className="badge badge-warning">Delayed</span></td>
              </tr>
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0 0 0', color: 'var(--text-muted)', fontSize: 13, borderTop: '1px solid var(--border)', marginTop: 16 }}>
            <span>Showing 1 to 3 of 45 entries</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn-secondary" style={{ padding: '4px 8px' }}>Prev</button>
              <button className="btn-secondary" style={{ padding: '4px 8px' }}>Next</button>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div className="section-title">
              <span>Driver Leaderboard</span>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon" style={{ background: 'rgba(250,204,21,0.2)', color: '#facc15' }}><Star size={20} /></div>
                <div className="activity-content">
                  <h4>Mike (Husband)</h4>
                  <p>3,240 miles this week</p>
                </div>
                <div className="activity-time" style={{ color: 'var(--success)', fontWeight: 'bold' }}>#1</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon"><Star size={20} color="var(--text-muted)"/></div>
                <div className="activity-content">
                  <h4>Dave R.</h4>
                  <p>2,890 miles this week</p>
                </div>
                <div className="activity-time">#2</div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '24px' }}>
            <div className="section-title">
              <span>Recent Uploads (Sync)</span>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="activity-icon">📄</div>
                <div className="activity-content">
                  <h4>BOL - Load #LD-8491</h4>
                  <p>Uploaded by Mike from Mobile</p>
                </div>
                <div className="activity-time">2m ago</div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">⛽</div>
                <div className="activity-content">
                  <h4>Fuel Receipt</h4>
                  <p>Pilot Flying J - $450.00</p>
                </div>
                <div className="activity-time">1h ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fab"><Truck size={24} /></div>
    </div>
  )
}
