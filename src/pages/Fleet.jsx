import { useState } from 'react'
import { Truck, Fuel, Wrench, CheckCircle, Plus } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

const INITIAL_TRUCKS = [
  { id: 'TRK-101', name: 'Freightliner Cascadia', year: 2022, miles: 142300, driver: 'Mike (Husband)', status: 'active', fuel: 72 },
  { id: 'TRK-102', name: 'Kenworth T680', year: 2021, miles: 198400, driver: 'Dave R.', status: 'active', fuel: 45 },
  { id: 'TRK-103', name: 'Peterbilt 579', year: 2023, miles: 67200, driver: 'Sam T.', status: 'maintenance', fuel: 88 },
  { id: 'TRL-55A', name: 'Utility 3000R Reefer', year: 2020, miles: 310000, driver: '—', status: 'available', fuel: null },
]

export default function Fleet() {
  const [trucks, setTrucks] = useState(INITIAL_TRUCKS)
  const [filter, setFilter] = useState('all')
  const toast = useToast()

  const toggleStatus = (id) => {
    setTrucks(prev => prev.map(t => {
      if (t.id !== id) return t
      const nextStatus = t.status === 'active' ? 'maintenance' : t.status === 'maintenance' ? 'available' : 'active'
      toast(`Status for ${t.id} updated to ${nextStatus.toUpperCase()}`, 'info')
      return { ...t, status: nextStatus }
    }))
  }

  const handleAddVehicle = () => {
    const newId = `TRK-10${trucks.length + 1}`
    const newTruck = {
      id: newId,
      name: 'Volvo VNL 860',
      year: 2024,
      miles: 12500,
      driver: 'Unassigned',
      status: 'available',
      fuel: 100
    }
    setTrucks(prev => [...prev, newTruck])
    toast(`Vehicle ${newId} (Volvo VNL 860) added to fleet!`, 'success')
  }

  const filtered = filter === 'all' ? trucks : trucks.filter(t => t.status === filter)

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Fleet & Drivers ({trucks.length} Units)</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-primary" onClick={handleAddVehicle}>
            <Plus size={15} style={{ marginRight: 4 }} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* Quick Filter Tabs */}
      <div className="tab-bar" style={{ marginBottom: 20 }}>
        {['all', 'active', 'maintenance', 'available'].map(f => (
          <button
            key={f}
            className={`tab-item ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'all' ? `All (${trucks.length})` : f === 'active' ? 'Active' : f === 'maintenance' ? 'In Shop' : 'Available'}
          </button>
        ))}
      </div>

      <div className="grid-cards stagger-children" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {filtered.map(t => (
          <div key={t.id} className="glass-card" style={{ padding: 20, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Truck size={16} color="var(--primary)" />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1 }}>{t.id}</span>
              </div>
              <button
                onClick={() => toggleStatus(t.id)}
                className={`badge badge-${t.status === 'active' ? 'success' : t.status === 'maintenance' ? 'warning' : 'info'}`}
                style={{ cursor: 'pointer', border: 'none', background: 'inherit' }}
                title="Click to cycle vehicle status"
              >
                {t.status === 'active' && <><span className="live-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} /> Active</>}
                {t.status === 'maintenance' && <><Wrench size={11} style={{ display: 'inline', marginRight: 3 }} /> In Shop</>}
                {t.status === 'available' && <><CheckCircle size={11} style={{ display: 'inline', marginRight: 3 }} /> Available</>}
              </button>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <p style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>
                      <Fuel size={11} style={{ display: 'inline', marginRight: 4, verticalAlign: -1 }} /> Fuel Level
                    </p>
                    <span style={{ fontSize: 11, fontWeight: 600 }}>{t.fuel}%</span>
                  </div>
                  <div className="progress-bar" style={{ marginTop: 4 }}>
                    <div className="progress-fill" style={{ width: `${t.fuel}%`, background: t.fuel < 30 ? 'var(--danger)' : t.fuel < 60 ? 'var(--warning)' : 'var(--success)' }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Status Action:</span>
              <button
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: 11 }}
                onClick={() => toggleStatus(t.id)}
              >
                Toggle Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

