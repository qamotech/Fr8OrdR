import { useState } from 'react'
import { Search, MapPin, Building, Star, Filter } from 'lucide-react'

const LOADS = [
  { id: 'FR-9901', origin: 'Chicago, IL', dest: 'Dallas, TX', rate: 2100, miles: 920, broker: 'Coyote Logistics', equipment: 'Van', date: 'Today' },
  { id: 'FR-9902', origin: 'Atlanta, GA', dest: 'Miami, FL', rate: 1650, miles: 660, broker: 'TQL', equipment: 'Reefer', date: 'Tomorrow' },
  { id: 'FR-9903', origin: 'Denver, CO', dest: 'Phoenix, AZ', rate: 1850, miles: 820, broker: 'CH Robinson', equipment: 'Flatbed', date: 'Oct 5' },
]

export default function LoadBoard() {
  const [filter, setFilter] = useState('')

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Broker Directory & Load Board</span>
        <button className="btn-secondary"><Filter size={15} /> Filter</button>
      </div>

      <div className="glass-panel" style={{ padding: 22, marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 14, marginBottom: 20 }}>
          <div className="search-bar" style={{ width: '100%', maxWidth: 400 }}>
            <Search size={16} />
            <input type="text" placeholder="Search origins, destinations, or brokers..." value={filter} onChange={e => setFilter(e.target.value)} />
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
            </tr>
          </thead>
          <tbody>
            {LOADS.filter(l => l.origin.toLowerCase().includes(filter.toLowerCase()) || l.dest.toLowerCase().includes(filter.toLowerCase()) || l.broker.toLowerCase().includes(filter.toLowerCase())).map(l => (
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
                <td>{l.equipment}</td>
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--success)' }}>${l.rate.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>${(l.rate / l.miles).toFixed(2)}/mi</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
