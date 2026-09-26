import { Truck, Fuel, MapPin, AlertTriangle, CheckCircle } from 'lucide-react'

const TRUCKS = [
  { id: 'TRK-101', name: 'Freightliner Cascadia', year: 2022, miles: 142300, driver: 'Mike (Husband)', status: 'active', fuel: 72 },
  { id: 'TRK-102', name: 'Kenworth T680', year: 2021, miles: 198400, driver: 'Dave R.', status: 'active', fuel: 45 },
  { id: 'TRK-103', name: 'Peterbilt 579', year: 2023, miles: 67200, driver: 'Sam T.', status: 'maintenance', fuel: 88 },
  { id: 'TRL-55A', name: 'Utility 3000R Reefer', year: 2020, miles: 310000, driver: '—', status: 'available', fuel: null },
]

export default function Fleet() {
  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Fleet & Drivers</span>
        <button className="btn-primary">Add Vehicle</button>
      </div>

      <div className="grid-cards stagger-children" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {TRUCKS.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1 }}>{t.id}</span>
              <span className={`badge badge-${t.status === 'active' ? 'success' : t.status === 'maintenance' ? 'warning' : 'info'}`}>
                {t.status === 'active' && <><span className="live-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} /> Active</>}
                {t.status === 'maintenance' && '🔧 In Shop'}
                {t.status === 'available' && 'Available'}
              </span>
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{t.name}</h3>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>{t.year} • {t.miles.toLocaleString()} mi</p>

            <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Assigned Driver</p>
                <p style={{ fontSize: 13, fontWeight: 600 }}>{t.driver}</p>
              </div>
              {t.fuel !== null && (
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Fuel Level</p>
                  <div className="progress-bar" style={{ marginTop: 6 }}>
                    <div className="progress-fill" style={{ width: `${t.fuel}%`, background: t.fuel < 30 ? 'var(--danger)' : t.fuel < 60 ? 'var(--warning)' : 'var(--success)' }} />
                  </div>
                  <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{t.fuel}%</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
