import { useState } from 'react'
import { Search, MapPin, Building, Star, Check } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

const LOADS = [
  { id: 'FR-9901', origin: 'Chicago, IL', dest: 'Dallas, TX', rate: 2100, miles: 920, broker: 'Coyote Logistics', equipment: 'Van', date: 'Today' },
  { id: 'FR-9902', origin: 'Atlanta, GA', dest: 'Miami, FL', rate: 1650, miles: 660, broker: 'TQL', equipment: 'Reefer', date: 'Tomorrow' },
  { id: 'FR-9903', origin: 'Denver, CO', dest: 'Phoenix, AZ', rate: 1850, miles: 820, broker: 'CH Robinson', equipment: 'Flatbed', date: 'Oct 5' },
  { id: 'FR-9904', origin: 'Memphis, TN', dest: 'Columbus, OH', rate: 1450, miles: 560, broker: 'Echo Global', equipment: 'Van', date: 'Today' },
  { id: 'FR-9905', origin: 'Houston, TX', dest: 'Atlanta, GA', rate: 2300, miles: 790, broker: 'Landstar', equipment: 'Flatbed', date: 'Oct 6' }
]

export default function LoadBoard() {
  const [filter, setFilter] = useState('')
  const [equipFilter, setEquipFilter] = useState('all')
  const [booked, setBooked] = useState(new Set())
  const toast = useToast()

  const handleBook = (load) => {
    setBooked(prev => new Set([...prev, load.id]))
    toast(`Load ${load.id} booked ($${load.rate.toLocaleString()})! Assigned to fleet.`, 'success')
  }

  const filtered = LOADS.filter(l => {
    const matchesEquip = equipFilter === 'all' || l.equipment.toLowerCase() === equipFilter.toLowerCase()
    const matchesSearch = !filter || 
      l.origin.toLowerCase().includes(filter.toLowerCase()) || 
      l.dest.toLowerCase().includes(filter.toLowerCase()) || 
      l.broker.toLowerCase().includes(filter.toLowerCase())
    return matchesEquip && matchesSearch
  })

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Broker Directory & Load Board ({filtered.length} Available)</span>
        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Active DAT & Truckstop.com Feed
        </div>
      </div>

      <div className="glass-panel" style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar" style={{ width: '100%', maxWidth: 360 }}>
            <Search size={16} />
            <input type="text" placeholder="Search origins, destinations, brokers..." value={filter} onChange={e => setFilter(e.target.value)} />
          </div>

          <div className="tab-bar" style={{ margin: 0 }}>
            {['all', 'van', 'reefer', 'flatbed'].map(eq => (
              <button
                key={eq}
                className={`tab-item ${equipFilter === eq ? 'active' : ''}`}
                onClick={() => setEquipFilter(eq)}
              >
                {eq.charAt(0).toUpperCase() + eq.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Load ID</th>
              <th>Origin <MapPin size={12} style={{display: 'inline'}} /></th>
              <th>Destination <MapPin size={12} style={{display: 'inline'}} /></th>
              <th>Broker / Shipper <Building size={12} style={{display: 'inline'}} /></th>
              <th>Equip</th>
              <th>Rate / RPM</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id}>
                <td style={{ fontWeight: 600 }}>{l.id}</td>
                <td>{l.origin}</td>
                <td>{l.dest}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {l.broker}
                    {l.broker === 'Coyote Logistics' && <Star size={12} fill="var(--warning)" color="var(--warning)" title="Preferred Broker" />}
                  </div>
                </td>
                <td>
                  <span className="badge badge-info" style={{ fontSize: 11 }}>{l.equipment}</span>
                </td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--success)' }}>${l.rate.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>${(l.rate / l.miles).toFixed(2)}/mi ({l.miles} mi)</div>
                </td>
                <td>
                  {booked.has(l.id) ? (
                    <span className="badge badge-success">✓ Booked & Dispatched</span>
                  ) : (
                    <button
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '12px', whiteSpace: 'nowrap', cursor: 'pointer' }}
                      onClick={() => handleBook(l)}
                    >
                      <Check size={13} style={{ marginRight: 4 }} /> Book Load
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

