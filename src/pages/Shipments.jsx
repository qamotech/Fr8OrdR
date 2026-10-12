import { useState } from 'react'
import { MapPin, Calendar, Truck, CheckCircle, Search, Plus } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { useToast } from '../components/ToastProvider'

const INITIAL_SHIPMENTS = [
  {
    id: 'LD-8492',
    origin: 'Houston, TX',
    dest: 'Chicago, IL',
    driver: 'Mike (Husband)',
    eta: 'Today, 4PM',
    status: 'In Transit',
    tone: 'info'
  },
  {
    id: 'LD-8493',
    origin: 'Dallas, TX',
    dest: 'Phoenix, AZ',
    driver: 'Dave R.',
    eta: 'Tomorrow, 8AM',
    status: 'Awaiting Pickup',
    tone: 'warning'
  },
  {
    id: 'LD-8490',
    origin: 'Atlanta, GA',
    dest: 'Dallas, TX',
    driver: 'Sam T.',
    eta: 'Delivered',
    status: 'Delivered',
    tone: 'success'
  }
]

export default function Shipments() {
  const [searchParams] = useSearchParams()
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS)
  const [filter, setFilter] = useState('all')
  const paramSearch = searchParams.get('search') || ''
  const [searchQuery, setSearchQuery] = useState(paramSearch)
  const [prevParamSearch, setPrevParamSearch] = useState(paramSearch)

  if (paramSearch !== prevParamSearch) {
    setPrevParamSearch(paramSearch)
    setSearchQuery(paramSearch)
  }

  const toast = useToast()

  const advanceStatus = (id) => {
    setShipments(prev => prev.map(s => {
      if (s.id !== id) return s
      let nextStatus = 'In Transit'
      let nextTone = 'info'
      if (s.status === 'Awaiting Pickup') {
        nextStatus = 'In Transit'
        nextTone = 'info'
      } else if (s.status === 'In Transit') {
        nextStatus = 'Delivered'
        nextTone = 'success'
      } else {
        nextStatus = 'Awaiting Pickup'
        nextTone = 'warning'
      }
      toast(`${s.id} updated to ${nextStatus}!`, 'info')
      return { ...s, status: nextStatus, tone: nextTone }
    }))
  }

  const handleCreateLoad = () => {
    const newId = `LD-849${shipments.length + 4}`
    const newLoad = {
      id: newId,
      origin: 'Memphis, TN',
      dest: 'Kansas City, MO',
      driver: 'Dave R.',
      eta: 'In 2 days, 10AM',
      status: 'Awaiting Pickup',
      tone: 'warning'
    }
    setShipments(prev => [newLoad, ...prev])
    toast(`Load ${newId} created and dispatched to dispatch board!`, 'success')
  }

  const filtered = shipments.filter(s => {
    const matchesFilter = filter === 'all' || s.status.toLowerCase().replace(' ', '-') === filter.toLowerCase()
    const matchesSearch = !searchQuery || 
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.dest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.driver.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Active Shipments & Dispatches ({shipments.length})</span>
        <button className="btn-primary" onClick={handleCreateLoad}>
          <Plus size={15} style={{ marginRight: 4 }} /> Create New Load
        </button>
      </div>

      <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <div className="tab-bar" style={{ margin: 0 }}>
          {['all', 'in-transit', 'awaiting-pickup', 'delivered'].map(tab => (
            <button
              key={tab}
              className={`tab-item ${filter === tab ? 'active' : ''}`}
              onClick={() => setFilter(tab)}
            >
              {tab === 'all' ? 'All Loads' : tab === 'in-transit' ? 'In Transit' : tab === 'awaiting-pickup' ? 'Awaiting Pickup' : 'Delivered'}
            </button>
          ))}
        </div>

        <div className="search-bar" style={{ flex: 1, maxWidth: 320 }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Filter shipments..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '24px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '500' }}>Live Fleet Route Telemetry</h3>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>GPS Ping: Live</span>
        </div>
        <div className="map-placeholder">
          <div style={{ background: 'var(--bg-panel)', padding: '8px 16px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1, border: '1px solid var(--primary)' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
            <span style={{ fontSize: '13px', fontWeight: '500' }}>Truck 101 - In Transit to Chicago (I-55 N)</span>
          </div>
        </div>
      </div>

      <div className="grid-cards stagger-children">
        {filtered.map(s => (
          <div key={s.id} className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', alignItems: 'center' }}>
              <span className={`badge badge-${s.tone}`}>{s.status}</span>
              <button
                className="btn-secondary"
                style={{ padding: '3px 8px', fontSize: 11 }}
                onClick={() => advanceStatus(s.id)}
                title="Advance to next workflow state"
              >
                Advance State
              </button>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>#{s.id}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--success)' }}><MapPin size={18} /></div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Origin</p>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{s.origin}</p>
                </div>
              </div>
              <div style={{ width: '2px', height: '16px', background: 'var(--border)', marginLeft: '8px' }}></div>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ color: 'var(--primary)' }}><MapPin size={18} /></div>
                <div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Destination</p>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>{s.dest}</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', borderTop: '1px solid var(--border)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13px' }}>
                <Truck size={16} /> {s.driver}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '13px' }}>
                {s.status === 'Delivered' ? <CheckCircle size={15} color="var(--success)" /> : <Calendar size={15} />}
                {s.eta}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

