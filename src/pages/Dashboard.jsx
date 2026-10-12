import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Truck, AlertCircle, FileText, ArrowUpRight, ArrowDownRight, MapPin, ChevronRight, Share2, X, Download } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

// Mock Data
const ACTIVE_LOADS = [
  { id: 'LD-8492', driver: 'Mike (Husband)', origin: 'Chicago, IL', dest: 'Dallas, TX', status: 'In Transit', eta: '4h 20m' },
  { id: 'LD-8493', driver: 'Dave R.', origin: 'Atlanta, GA', dest: 'Miami, FL', status: 'Delayed', eta: 'Tomorrow, 2 PM' }
]

const HERO_SVG_DATA = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201400%20500%22%3E%3Crect%20width%3D%221400%22%20height%3D%22500%22%20fill%3D%22%23111827%22%2F%3E%3Cpath%20d%3D%22M700%200h700v500H530z%22%20fill%3D%22%231e1b4b%22%2F%3E%3Ccircle%20cx%3D%221190%22%20cy%3D%2280%22%20r%3D%22210%22%20fill%3D%22%23312e81%22%2F%3E%3Cpath%20d%3D%22M0%20390h1400v110H0z%22%20fill%3D%22%230f172a%22%2F%3E%3Cpath%20d%3D%22M30%20443h130m85%200h130m85%200h130m85%200h130m85%200h130m85%200h130m85%200h130%22%20stroke%3D%22%23475569%22%20stroke-width%3D%225%22%2F%3E%3Cpath%20d%3D%22M700%20151h350v220H700z%22%20fill%3D%22%23a5b4fc%22%2F%3E%3Cpath%20d%3D%22M1051%20219h106l91%2091v61h-197z%22%20fill%3D%22%23e0e7ff%22%2F%3E%3Cpath%20d%3D%22M1080%20237h65l62%2067h-127z%22%20fill%3D%22%23312e81%22%2F%3E%3Cpath%20d%3D%22M683%20369h583%22%20stroke%3D%22%236366f1%22%20stroke-width%3D%2216%22%2F%3E%3Cg%20fill%3D%22%230f172a%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%2213%22%3E%3Ccircle%20cx%3D%22771%22%20cy%3D%22379%22%20r%3D%2235%22%2F%3E%3Ccircle%20cx%3D%22866%22%20cy%3D%22379%22%20r%3D%2235%22%2F%3E%3Ccircle%20cx%3D%221165%22%20cy%3D%22379%22%20r%3D%2235%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22M739%20184h160m-160%2029h121%22%20stroke%3D%22%236366f1%22%20stroke-width%3D%2210%22%20stroke-linecap%3D%22round%22%2F%3E%3Cpath%20d%3D%22M0%2055h410M0%2083h290M0%20111h170%22%20stroke%3D%22%23334155%22%20stroke-width%3D%222%22%2F%3E%3Cpath%20d%3D%22M405%200v390M440%200v390%22%20stroke%3D%22%231e293b%22%20stroke-width%3D%221%22%2F%3E%3C%2Fsvg%3E"

export default function Dashboard() {
  const navigate = useNavigate()
  const [showShareModal, setShowShareModal] = useState(false)
  const bannerImgRef = useRef(null)
  const toast = useToast()

  // High-performance rAF-throttled scroll parallax (zero React re-renders on scroll)
  useEffect(() => {
    const mainContent = document.querySelector('.scroll-area')
    if (!mainContent) return

    let rafId = null
    const handleScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        if (bannerImgRef.current) {
          const offset = mainContent.scrollTop * 0.35
          bannerImgRef.current.style.transform = `translate3d(0, -${offset}px, 0)`
        }
        rafId = null
      })
    }

    mainContent.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      mainContent.removeEventListener('scroll', handleScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div className="animate-fade-in">
      {/* Scroll-Driven Parallax Banner */}
      <div style={{ marginBottom: 24, borderRadius: 16, overflow: 'hidden', height: 260, position: 'relative', boxShadow: 'var(--glass-shadow)' }}>
        <img 
          ref={bannerImgRef}
          src={HERO_SVG_DATA} 
          alt="Fr8OrdR Logistics" 
          style={{ 
            width: '100%', 
            height: '140%', 
            objectFit: 'cover',
            transform: 'translate3d(0, 0, 0)',
            willChange: 'transform'
          }} 
        />
        <div className="hero-banner-content" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(15,17,26,0.9) 10%, rgba(15,17,26,0.4) 60%, transparent)', display: 'flex', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: 'white', fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: -1 }}>Command Your Fleet</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, maxWidth: 460, lineHeight: 1.5, marginBottom: 20 }}>Real-time analytics, routing, and dispatching. Keep your trucks moving and your paperwork seamless.</p>
            {/* Suggestion 3: One-Click Share/Export Modal */}
            <button className="btn-primary" onClick={() => setShowShareModal(true)} style={{ background: 'linear-gradient(135deg, var(--primary), #818cf8)', border: 'none', padding: '10px 20px' }}>
              <Share2 size={16} style={{marginRight: 8}}/> Export Live Report
            </button>
          </div>
        </div>
      </div>

      <div className="grid-cards stagger-children">
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Active Loads</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--glow-primary)', color: 'var(--primary)' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="stat-value">12</div>
          <div className="stat-trend positive">
            <ArrowUpRight size={14} /> <span>+2 from yesterday</span>
          </div>
        </div>
        
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Revenue (WTD)</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--glow-success)', color: 'var(--success)' }}>
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="stat-value">$14,250</div>
          <div className="stat-trend positive">
            <ArrowUpRight size={14} /> <span>+18% vs last week</span>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-header">
            <span className="stat-label">Fleet Issues</span>
            <div className="stat-icon-wrapper" style={{ background: 'var(--glow-danger)', color: 'var(--danger)' }}>
              <AlertCircle size={18} />
            </div>
          </div>
          <div className="stat-value">2</div>
          <div className="stat-trend negative">
            <ArrowDownRight size={14} /> <span>Maintenance required</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid stagger-children" style={{ marginTop: 24 }}>
        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Live Tracking</h3>
            <button className="btn-secondary" onClick={() => navigate('/shipments')} style={{ padding: '6px 12px', fontSize: 12 }}>View Map</button>
          </div>
          <div className="activity-list">
            {ACTIVE_LOADS.map((load, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon" style={{ background: load.status === 'Delayed' ? 'var(--glow-danger)' : 'var(--glow-primary)', color: load.status === 'Delayed' ? 'var(--danger)' : 'var(--primary)' }}>
                  <MapPin size={16} />
                </div>
                <div className="activity-content" style={{ minWidth: 0 }}>
                  <h4 className="ellipsis">{load.driver || 'Unassigned'} — {load.id}</h4>
                  <p className="ellipsis">{load.origin || 'Unknown'} → {load.dest || 'Unknown'}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: load.status === 'Delayed' ? 'var(--danger)' : 'var(--text-main)' }}>{load.status}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ETA: {load.eta}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700 }}>Pending Paperwork</h3>
            <button className="btn-secondary" onClick={() => navigate('/documents')} style={{ padding: '6px 12px', fontSize: 12 }}>Upload</button>
          </div>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"><FileText size={16} /></div>
              <div className="activity-content" style={{ minWidth: 0 }}>
                <h4 className="ellipsis">BOL for LD-8490</h4>
                <p className="ellipsis">Needs signature from Receiver</p>
              </div>
              <button className="btn-secondary" onClick={() => navigate('/documents')} style={{ padding: 4 }}><ChevronRight size={16} /></button>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><FileText size={16} /></div>
              <div className="activity-content" style={{ minWidth: 0 }}>
                <h4 className="ellipsis">Fuel Receipt</h4>
                <p className="ellipsis">Jodi P. uploaded 2h ago</p>
              </div>
              <button className="btn-secondary" onClick={() => navigate('/documents')} style={{ padding: 4 }}><ChevronRight size={16} /></button>
            </div>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel animate-slide-up" style={{ width: '100%', maxWidth: 400, padding: 24, boxShadow: '0 24px 48px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700 }}>Share Report</h3>
              <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={20}/></button>
            </div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 20 }}>Generate a secure, read-only link or download a PDF of your current fleet status and revenue metrics.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input type="text" readOnly value="https://fr8ordr.app/shared/rp-99x2" style={{ flex: 1, padding: '8px 12px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--input-bg)', color: 'var(--text-main)' }} />
                <button className="btn-primary" onClick={() => { toast('Report link copied to clipboard!', 'success'); setShowShareModal(false); }}>Copy Link</button>
              </div>
              <div style={{ position: 'relative', textAlign: 'center', margin: '10px 0' }}>
                <hr style={{ borderColor: 'var(--border)', borderStyle: 'solid' }} />
                <span style={{ position: 'absolute', top: -10, left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-card)', padding: '0 10px', fontSize: 12, color: 'var(--text-muted)' }}>OR</span>
              </div>
              <button className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { toast('Generating PDF report...', 'info'); setShowShareModal(false); }}>
                <Download size={16} style={{marginRight: 8}}/> Download PDF Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
