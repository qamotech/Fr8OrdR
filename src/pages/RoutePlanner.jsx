import { useState } from 'react'
import { Map, Fuel, Navigation, Clock, Search } from 'lucide-react'

export default function RoutePlanner() {
  const [route, setRoute] = useState({ origin: '', dest: '' })
  const [calculating, setCalculating] = useState(false)
  const [result, setResult] = useState(null)

  const handlePlan = () => {
    if (!route.origin || !route.dest) return
    setCalculating(true)
    setTimeout(() => {
      setCalculating(false)
      setResult({
        miles: 924,
        time: '14h 20m',
        fuelStops: [
          { name: 'Pilot Flying J', loc: 'Gary, IN', price: 3.89, gal: 120 },
          { name: 'Love\'s Travel Stop', loc: 'Blytheville, AR', price: 3.75, gal: 80 }
        ],
        estFuelCost: 766.80
      })
    }, 1500)
  }

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Route & Fuel Optimizer</span>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: 22 }}>
          <h3 style={{ fontSize: 15, marginBottom: 16 }}>Plan a Route</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>Origin</label>
              <div className="search-bar" style={{ width: '100%' }}>
                <Map size={16} />
                <input type="text" placeholder="e.g. Chicago, IL" value={route.origin} onChange={e => setRoute({...route, origin: e.target.value})} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6, display: 'block' }}>Destination</label>
              <div className="search-bar" style={{ width: '100%' }}>
                <Navigation size={16} />
                <input type="text" placeholder="e.g. Dallas, TX" value={route.dest} onChange={e => setRoute({...route, dest: e.target.value})} />
              </div>
            </div>
            <button className="btn-primary" onClick={handlePlan} disabled={calculating} style={{ marginTop: 10 }}>
              {calculating ? 'Calculating...' : 'Optimize Route'}
            </button>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
          {/* Suggestion: Interactive Fuel Map Widget Mockup */}
          <div style={{ padding: 22, borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 10, background: 'var(--bg-panel)', backdropFilter: 'blur(10px)' }}>
            <h3 style={{ fontSize: 15, marginBottom: 0 }}>Interactive Fuel Map</h3>
          </div>
          
          <div style={{ height: 300, background: 'var(--input-bg)', position: 'relative', overflow: 'hidden' }}>
            {/* Simulated map background panning */}
            <div style={{ 
              position: 'absolute', inset: -100, 
              background: 'radial-gradient(circle at 50% 50%, var(--glow-primary) 0%, transparent 60%)',
              opacity: 0.5,
              animation: 'spin 20s linear infinite' 
            }} />
            
            {/* Map nodes */}
            <div style={{ position: 'absolute', top: '40%', left: '20%', display: 'flex', alignItems: 'center', gap: 6, transform: 'translate(-50%, -50%)' }}>
              <div className="pulse-glow" style={{ width: 12, height: 12, background: 'var(--primary)', borderRadius: '50%' }} />
              <span style={{ fontSize: 11, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Origin</span>
            </div>
            
            <div style={{ position: 'absolute', top: '60%', right: '20%', display: 'flex', alignItems: 'center', gap: 6, transform: 'translate(50%, -50%)' }}>
              <span style={{ fontSize: 11, fontWeight: 700, textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>Dest</span>
              <div className="pulse-glow" style={{ width: 12, height: 12, background: 'var(--danger)', borderRadius: '50%' }} />
            </div>

            {/* Connecting line */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              <line x1="20%" y1="40%" x2="80%" y2="60%" stroke="var(--primary)" strokeWidth="2" strokeDasharray="6 6" />
            </svg>

            {/* Fuel stops */}
            <div style={{ position: 'absolute', top: '45%', left: '40%', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, border: '1px solid var(--border)', boxShadow: 'var(--glass-shadow)', cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-scale">
              <Fuel size={10} style={{display:'inline', marginRight:4}}/> $3.89
            </div>
            <div style={{ position: 'absolute', top: '55%', left: '60%', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, border: '1px solid var(--border)', boxShadow: 'var(--glass-shadow)', cursor: 'pointer', transition: 'transform 0.2s' }} className="hover-scale">
              <Fuel size={10} style={{display:'inline', marginRight:4}}/> $3.75
            </div>
          </div>

          <div style={{ padding: 22 }}>
            <h3 style={{ fontSize: 15, marginBottom: 16 }}>Optimization Results</h3>
            {!result && !calculating && (
              <div className="empty-state">
                <Map size={48} className="empty-state-icon" />
                <p>Enter an origin and destination to generate optimized fuel stops and routing.</p>
              </div>
            )}
            {calculating && (
              <div className="empty-state">
                <div className="spinner pulse-glow" style={{ margin: '0 auto', width: 30, height: 30, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <p style={{ marginTop: 16 }}>Analyzing IFTA data and fuel prices...</p>
              </div>
            )}
            {result && (
              <div className="animate-slide-up">
                <div className="grid-cards" style={{ gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                  <div style={{ background: 'var(--input-bg)', padding: 14, borderRadius: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Total Distance</span>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>{result.miles} mi</div>
                  </div>
                  <div style={{ background: 'var(--input-bg)', padding: 14, borderRadius: 10 }}>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Est. Fuel Cost</span>
                    <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--danger)' }}>${result.estFuelCost.toFixed(2)}</div>
                  </div>
                </div>

                <h4 style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 10 }}>Recommended Stops</h4>
                <div className="activity-list">
                  {result.fuelStops.map((stop, i) => (
                    <div key={i} className="activity-item">
                      <div className="activity-icon"><Fuel size={16} /></div>
                      <div className="activity-content">
                        <h4>{stop.name} — {stop.loc}</h4>
                        <p>${stop.price.toFixed(2)}/gal • Fill {stop.gal} gal</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
