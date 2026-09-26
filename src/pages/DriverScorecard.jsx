import { Star, ShieldAlert, Award, TrendingUp } from 'lucide-react'

const DRIVERS = [
  { name: 'Mike (Husband)', score: 98, onTime: '99%', harshBraking: 2, mpg: 7.2 },
  { name: 'Dave R.', score: 85, onTime: '92%', harshBraking: 14, mpg: 6.5 },
  { name: 'Sam T.', score: 91, onTime: '95%', harshBraking: 5, mpg: 6.8 },
]

export default function DriverScorecard() {
  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Driver Safety & Scorecard</span>
      </div>

      <div className="dashboard-grid">
        {DRIVERS.map(d => (
          <div key={d.name} className="glass-card" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--input-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'var(--primary)' }}>
                  {d.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>{d.name}</h3>
                  <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} size={12} fill={d.score > star * 18 ? 'var(--warning)' : 'var(--input-bg)'} color="transparent" />
                    ))}
                  </div>
                </div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 800, color: d.score > 90 ? 'var(--success)' : d.score > 80 ? 'var(--warning)' : 'var(--danger)' }}>
                {d.score}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 10, borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}><Award size={14} style={{display:'inline', marginRight: 6, verticalAlign:-2}}/> On-Time Delivery</span>
                <span style={{ fontWeight: 600 }}>{d.onTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}><ShieldAlert size={14} style={{display:'inline', marginRight: 6, verticalAlign:-2}}/> Harsh Braking Events</span>
                <span style={{ fontWeight: 600, color: d.harshBraking > 10 ? 'var(--danger)' : 'var(--text-main)' }}>{d.harshBraking}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: 'var(--text-muted)' }}><TrendingUp size={14} style={{display:'inline', marginRight: 6, verticalAlign:-2}}/> Fuel Efficiency (MPG)</span>
                <span style={{ fontWeight: 600 }}>{d.mpg}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
