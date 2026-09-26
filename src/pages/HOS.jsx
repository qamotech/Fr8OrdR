import { useState } from 'react'
import { Clock, AlertTriangle, CheckCircle } from 'lucide-react'

const DRIVERS = [
  {
    name: 'Mike (Husband)', truck: 'TRK-101',
    driving: 7.5, onDuty: 9, cycle: 52,
    maxDriving: 11, maxOnDuty: 14, maxCycle: 70,
    status: 'driving', lastBreak: '2h ago'
  },
  {
    name: 'Dave R.', truck: 'TRK-102',
    driving: 4, onDuty: 5.5, cycle: 38,
    maxDriving: 11, maxOnDuty: 14, maxCycle: 70,
    status: 'driving', lastBreak: '45m ago'
  },
  {
    name: 'Sam T.', truck: 'TRK-103',
    driving: 0, onDuty: 0, cycle: 44,
    maxDriving: 11, maxOnDuty: 14, maxCycle: 70,
    status: 'off-duty', lastBreak: 'N/A'
  },
]

function HoursBar({ used, max, label, color }) {
  const pct = Math.min((used / max) * 100, 100)
  const warn = pct > 80
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color: warn ? 'var(--danger)' : 'var(--text-main)' }}>{used}h / {max}h</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: warn ? 'var(--danger)' : color || 'linear-gradient(90deg, var(--primary), var(--secondary))' }} />
      </div>
    </div>
  )
}

export default function HOS() {
  const [tab, setTab] = useState('today')

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Hours of Service (HOS)</span>
        <span className="badge badge-info" style={{ fontSize: 11 }}>DOT Compliant</span>
      </div>

      <div className="tab-bar">
        <button className={`tab-item ${tab === 'today' ? 'active' : ''}`} onClick={() => setTab('today')}>Today</button>
        <button className={`tab-item ${tab === 'week' ? 'active' : ''}`} onClick={() => setTab('week')}>This Week</button>
        <button className={`tab-item ${tab === 'violations' ? 'active' : ''}`} onClick={() => setTab('violations')}>Violations</button>
      </div>

      <div className="grid-cards stagger-children" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
        {DRIVERS.map(d => (
          <div key={d.name} className="glass-card" style={{ padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700 }}>{d.name}</h3>
                <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>{d.truck}</p>
              </div>
              <span className={`badge badge-${d.status === 'driving' ? 'info' : 'success'}`}>
                {d.status === 'driving' && <><span className="live-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--primary)' }} /> Driving</>}
                {d.status === 'off-duty' && <><CheckCircle size={12} /> Off Duty</>}
              </span>
            </div>

            <HoursBar used={d.driving} max={d.maxDriving} label="Driving Hours" color="var(--primary)" />
            <HoursBar used={d.onDuty} max={d.maxOnDuty} label="On-Duty Hours" color="var(--accent)" />
            <HoursBar used={d.cycle} max={d.maxCycle} label="70hr/8-Day Cycle" />

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--border)' }}>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                <Clock size={13} style={{ display: 'inline', verticalAlign: -2, marginRight: 4 }} />
                Last break: {d.lastBreak}
              </div>
              {d.driving / d.maxDriving > 0.8 && (
                <div style={{ fontSize: 12, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <AlertTriangle size={13} /> Approaching limit
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
