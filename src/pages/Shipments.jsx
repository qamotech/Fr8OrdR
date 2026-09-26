import { MapPin, Calendar, Truck, MoreVertical } from 'lucide-react'

export default function Shipments() {
  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Active Shipments</span>
        <button className="btn-primary">Create New Load</button>
      </div>

      <div className="glass-panel" style={{ padding: '24px', marginTop: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '500', marginBottom: '16px' }}>Live Fleet Tracking</h3>
        <div className="map-placeholder">
          <div style={{ background: 'var(--bg-panel)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, border: '1px solid var(--primary)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Truck 101 - In Transit to Chicago</span>
          </div>
        </div>
      </div>

      <div className="grid-cards">
        {/* Load 1 */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="badge badge-info">In Transit</span>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>#LD-8492</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--success)' }}><MapPin size={18} /></div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Origin</p>
                <p style={{ fontSize: '14px' }}>Houston, TX</p>
              </div>
            </div>
            <div style={{ width: '2px', height: '16px', background: 'var(--border)', marginLeft: '8px' }}></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)' }}><MapPin size={18} /></div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Destination</p>
                <p style={{ fontSize: '14px' }}>Chicago, IL</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <Truck size={16} /> Mike (Husband)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <Calendar size={16} /> ETA: Today, 4PM
            </div>
          </div>
        </div>

        {/* Load 2 */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span className="badge badge-warning">Awaiting Pickup</span>
            <MoreVertical size={20} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>#LD-8493</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--success)' }}><MapPin size={18} /></div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Origin</p>
                <p style={{ fontSize: '14px' }}>Dallas, TX</p>
              </div>
            </div>
            <div style={{ width: '2px', height: '16px', background: 'var(--border)', marginLeft: '8px' }}></div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--primary)' }}><MapPin size={18} /></div>
              <div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Destination</p>
                <p style={{ fontSize: '14px' }}>Phoenix, AZ</p>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <Truck size={16} /> Dave R.
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
              <Calendar size={16} /> Tomorrow, 8AM
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
