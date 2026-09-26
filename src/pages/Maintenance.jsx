import { useState } from 'react'
import { useToast } from '../components/ToastProvider'

const SERVICES = [
  { id: 1, vehicle: 'TRK-101', type: 'Oil Change', date: 'Oct 12, 2026', miles: '150,000', status: 'upcoming', cost: 350 },
  { id: 2, vehicle: 'TRL-55A', type: 'Tire Replacement (4x)', date: 'Sep 20, 2026', miles: '310,000', status: 'completed', cost: 2400 },
  { id: 3, vehicle: 'TRK-102', type: 'Brake Inspection', date: 'Sep 15, 2026', miles: '195,000', status: 'completed', cost: 180 },
  { id: 4, vehicle: 'TRK-103', type: 'DOT Annual Inspection', date: 'Oct 5, 2026', miles: '67,200', status: 'upcoming', cost: 500 },
  { id: 5, vehicle: 'TRK-101', type: 'Transmission Fluid', date: 'Aug 28, 2026', miles: '140,000', status: 'completed', cost: 220 },
]

export default function Maintenance() {
  const [tab, setTab] = useState('all')
  const toast = useToast()

  const filtered = tab === 'all' ? SERVICES : SERVICES.filter(s => s.status === tab)

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Maintenance Logs</span>
        <button className="btn-primary" onClick={() => toast('Service appointment scheduled!', 'success')}>Schedule Service</button>
      </div>

      <div className="tab-bar" style={{ marginBottom: 20 }}>
        <button className={`tab-item ${tab === 'all' ? 'active' : ''}`} onClick={() => setTab('all')}>All</button>
        <button className={`tab-item ${tab === 'upcoming' ? 'active' : ''}`} onClick={() => setTab('upcoming')}>Upcoming</button>
        <button className={`tab-item ${tab === 'completed' ? 'active' : ''}`} onClick={() => setTab('completed')}>Completed</button>
      </div>

      <div className="glass-panel" style={{ padding: '22px' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Service</th>
              <th>Date</th>
              <th>Mileage</th>
              <th>Cost</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id}>
                <td style={{ fontWeight: 600 }}>{s.vehicle}</td>
                <td>{s.type}</td>
                <td>{s.date}</td>
                <td>{s.miles} mi</td>
                <td>${s.cost.toLocaleString()}</td>
                <td>
                  <span className={`badge badge-${s.status === 'upcoming' ? 'warning' : 'success'}`}>
                    {s.status === 'upcoming' ? '📅 Upcoming' : '✓ Done'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
