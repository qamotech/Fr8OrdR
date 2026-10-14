import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Truck, AlertCircle, FileText, ArrowUpRight, ArrowDownRight, MapPin, ChevronRight, Share2, X, Download } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

// Mock Data
const ACTIVE_LOADS = [
  { id: 'LD-8492', driver: 'Mike (Husband)', origin: 'Chicago, IL', dest: 'Dallas, TX', status: 'In Transit', eta: '4h 20m' },
  { id: 'LD-8493', driver: 'Dave R.', origin: 'Atlanta, GA', dest: 'Miami, FL', status: 'Delayed', eta: 'Tomorrow, 2 PM' }
]

const HERO_SVG_DATA = "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201400%20500%22%3E%20%3Cdefs%3E%20%3ClinearGradient%20id%3D%22sky%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23070b1d%22%2F%3E%3Cstop%20offset%3D%22.62%22%20stop-color%3D%22%23141a3d%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e1b4b%22%2F%3E%20%3C%2FlinearGradient%3E%20%3CradialGradient%20id%3D%22moonglow%22%20cx%3D%22.5%22%20cy%3D%22.5%22%20r%3D%22.5%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23e0e7ff%22%20stop-opacity%3D%22.55%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23e0e7ff%22%20stop-opacity%3D%220%22%2F%3E%20%3C%2FradialGradient%3E%20%3ClinearGradient%20id%3D%22trailer%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%220%22%20y2%3D%221%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23c7d2fe%22%2F%3E%3Cstop%20offset%3D%22.55%22%20stop-color%3D%22%23818cf8%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%234f46e5%22%2F%3E%20%3C%2FlinearGradient%3E%20%3ClinearGradient%20id%3D%22cab%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23312e81%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%231e1b4b%22%2F%3E%20%3C%2FlinearGradient%3E%20%3ClinearGradient%20id%3D%22beam%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23fef9c3%22%20stop-opacity%3D%22.5%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23fef9c3%22%20stop-opacity%3D%220%22%2F%3E%20%3C%2FlinearGradient%3E%20%3ClinearGradient%20id%3D%22trailC%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%2322d3ee%22%20stop-opacity%3D%220%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%2322d3ee%22%20stop-opacity%3D%22.8%22%2F%3E%20%3C%2FlinearGradient%3E%20%3ClinearGradient%20id%3D%22trailP%22%20x1%3D%220%22%20y1%3D%220%22%20x2%3D%221%22%20y2%3D%220%22%3E%20%3Cstop%20offset%3D%220%22%20stop-color%3D%22%23ec4899%22%20stop-opacity%3D%220%22%2F%3E%3Cstop%20offset%3D%221%22%20stop-color%3D%22%23ec4899%22%20stop-opacity%3D%22.7%22%2F%3E%20%3C%2FlinearGradient%3E%20%3Cfilter%20id%3D%22soft%22%20x%3D%22-60%25%22%20y%3D%22-60%25%22%20width%3D%22220%25%22%20height%3D%22220%25%22%3E%3CfeGaussianBlur%20stdDeviation%3D%2214%22%2F%3E%3C%2Ffilter%3E%20%3Cfilter%20id%3D%22soft2%22%20x%3D%22-60%25%22%20y%3D%22-60%25%22%20width%3D%22220%25%22%20height%3D%22220%25%22%3E%3CfeGaussianBlur%20stdDeviation%3D%225%22%2F%3E%3C%2Ffilter%3E%20%3C%2Fdefs%3E%20%3Crect%20width%3D%221400%22%20height%3D%22500%22%20fill%3D%22url%28%23sky%29%22%2F%3E%20%3Cg%20fill%3D%22%23fff%22%20opacity%3D%22.8%22%3E%20%3Ccircle%20cx%3D%22120%22%20cy%3D%2260%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%22300%22%20cy%3D%22130%22%20r%3D%221.6%22%2F%3E%3Ccircle%20cx%3D%22520%22%20cy%3D%2248%22%20r%3D%222.2%22%2F%3E%3Ccircle%20cx%3D%22760%22%20cy%3D%2296%22%20r%3D%221.5%22%2F%3E%3Ccircle%20cx%3D%22940%22%20cy%3D%2240%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%221080%22%20cy%3D%22150%22%20r%3D%221.6%22%2F%3E%3Ccircle%20cx%3D%221300%22%20cy%3D%22110%22%20r%3D%222.2%22%2F%3E%3Ccircle%20cx%3D%22420%22%20cy%3D%22180%22%20r%3D%221.4%22%2F%3E%3Ccircle%20cx%3D%2260%22%20cy%3D%22210%22%20r%3D%221.6%22%2F%3E%3Ccircle%20cx%3D%22860%22%20cy%3D%22200%22%20r%3D%221.4%22%2F%3E%20%3C%2Fg%3E%20%3Ccircle%20cx%3D%221190%22%20cy%3D%2290%22%20r%3D%22150%22%20fill%3D%22url%28%23moonglow%29%22%2F%3E%20%3Ccircle%20cx%3D%221190%22%20cy%3D%2290%22%20r%3D%2258%22%20fill%3D%22%23e0e7ff%22%20opacity%3D%22.92%22%2F%3E%20%3Cg%20fill%3D%22%230b0f24%22%3E%20%3Crect%20x%3D%220%22%20y%3D%22300%22%20width%3D%2290%22%20height%3D%2295%22%2F%3E%3Crect%20x%3D%22100%22%20y%3D%22270%22%20width%3D%2270%22%20height%3D%22125%22%2F%3E%3Crect%20x%3D%22180%22%20y%3D%22310%22%20width%3D%22110%22%20height%3D%2285%22%2F%3E%3Crect%20x%3D%22300%22%20y%3D%22285%22%20width%3D%2260%22%20height%3D%22110%22%2F%3E%3Crect%20x%3D%22370%22%20y%3D%22320%22%20width%3D%22130%22%20height%3D%2275%22%2F%3E%3Crect%20x%3D%221150%22%20y%3D%22290%22%20width%3D%2280%22%20height%3D%22105%22%2F%3E%3Crect%20x%3D%221240%22%20y%3D%22310%22%20width%3D%22110%22%20height%3D%2285%22%2F%3E%20%3C%2Fg%3E%20%3Cg%20fill%3D%22%23fbbf24%22%20opacity%3D%22.85%22%3E%20%3Crect%20x%3D%22112%22%20y%3D%22285%22%20width%3D%228%22%20height%3D%228%22%2F%3E%3Crect%20x%3D%22128%22%20y%3D%22285%22%20width%3D%228%22%20height%3D%228%22%2F%3E%3Crect%20x%3D%22112%22%20y%3D%22302%22%20width%3D%228%22%20height%3D%228%22%2F%3E%3Crect%20x%3D%22312%22%20y%3D%22300%22%20width%3D%227%22%20height%3D%227%22%2F%3E%3Crect%20x%3D%221162%22%20y%3D%22305%22%20width%3D%228%22%20height%3D%228%22%2F%3E%3Crect%20x%3D%221178%22%20y%3D%22305%22%20width%3D%228%22%20height%3D%228%22%2F%3E%3Crect%20x%3D%221162%22%20y%3D%22322%22%20width%3D%228%22%20height%3D%228%22%2F%3E%20%3C%2Fg%3E%20%3Cellipse%20cx%3D%22700%22%20cy%3D%22392%22%20rx%3D%22700%22%20ry%3D%2226%22%20fill%3D%22%2322d3ee%22%20opacity%3D%22.14%22%20filter%3D%22url%28%23soft%29%22%2F%3E%20%3Cg%20stroke%3D%22%236366f1%22%20stroke-width%3D%221.4%22%20opacity%3D%22.5%22%3E%20%3Cpath%20d%3D%22M700%20392%20L120%20500%20M700%20392%20L380%20500%20M700%20392%20L640%20500%20M700%20392%20L900%20500%20M700%20392%20L1160%20500%20M700%20392%20L1420%20500%22%2F%3E%20%3Cpath%20d%3D%22M480%20428%20H920%20M340%20458%20H1060%20M180%20486%20H1220%22%2F%3E%20%3C%2Fg%3E%20%3Crect%20x%3D%220%22%20y%3D%22392%22%20width%3D%221400%22%20height%3D%22108%22%20fill%3D%22%230a0d20%22%2F%3E%20%3Cpath%20d%3D%22M0%20392%20H1400%22%20stroke%3D%22%2322d3ee%22%20stroke-width%3D%222%22%20opacity%3D%22.7%22%2F%3E%20%3Cpath%20d%3D%22M0%20452%20H1400%22%20stroke%3D%22%23f59e0b%22%20stroke-width%3D%226%22%20stroke-dasharray%3D%2246%2040%22%20opacity%3D%22.85%22%3E%20%3Canimate%20attributeName%3D%22stroke-dashoffset%22%20from%3D%220%22%20to%3D%22-86%22%20dur%3D%221.1s%22%20repeatCount%3D%22indefinite%22%2F%3E%20%3C%2Fpath%3E%20%3Cg%20opacity%3D%22.5%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%223%22%3E%20%3Cpath%20d%3D%22M40%20120%20H260%20M40%20140%20H200%20M1140%20200%20H1360%20M1140%20220%20H1300%22%2F%3E%20%3C%2Fg%3E%20%3Crect%20x%3D%22180%22%20y%3D%22180%22%20width%3D%22420%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22url%28%23trailC%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%20%3Crect%20x%3D%22120%22%20y%3D%22240%22%20width%3D%22380%22%20height%3D%228%22%20rx%3D%224%22%20fill%3D%22url%28%23trailP%29%22%20filter%3D%22url%28%23soft2%29%22%2F%3E%20%3Cg%3E%20%3Cellipse%20cx%3D%22830%22%20cy%3D%22392%22%20rx%3D%22260%22%20ry%3D%2220%22%20fill%3D%22%2322d3ee%22%20opacity%3D%22.35%22%20filter%3D%22url%28%23soft%29%22%2F%3E%20%3Crect%20x%3D%22560%22%20y%3D%22212%22%20width%3D%22330%22%20height%3D%22150%22%20rx%3D%228%22%20fill%3D%22url%28%23trailer%29%22%2F%3E%20%3Cg%20stroke%3D%22%23312e81%22%20stroke-width%3D%222%22%20opacity%3D%22.6%22%3E%20%3Cpath%20d%3D%22M600%20212%20V362%20M640%20212%20V362%20M680%20212%20V362%20M720%20212%20V362%20M760%20212%20V362%20M800%20212%20V362%20M840%20212%20V362%22%2F%3E%20%3C%2Fg%3E%20%3Crect%20x%3D%22560%22%20y%3D%22212%22%20width%3D%22330%22%20height%3D%2226%22%20rx%3D%228%22%20fill%3D%22%231e1b4b%22%20opacity%3D%22.55%22%2F%3E%20%3Ctext%20x%3D%22725%22%20y%3D%22232%22%20text-anchor%3D%22middle%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20font-weight%3D%22800%22%20letter-spacing%3D%226%22%20fill%3D%22%23e0e7ff%22%3EFR8ORDR%3C%2Ftext%3E%20%3Cpath%20d%3D%22M890%20250%20h78%20l64%2066%20v46%20h-142%20z%22%20fill%3D%22url%28%23cab%29%22%20stroke%3D%22%2322d3ee%22%20stroke-width%3D%222%22%2F%3E%20%3Cpath%20d%3D%22M906%20266%20h48%20l44%2050%20h-92%20z%22%20fill%3D%22%230ea5e9%22%20opacity%3D%22.55%22%2F%3E%20%3Cpath%20d%3D%22M1032%20316%20L1230%20300%20L1230%20340%20L1032%20348%20z%22%20fill%3D%22url%28%23beam%29%22%20opacity%3D%22.8%22%2F%3E%20%3Crect%20x%3D%22540%22%20y%3D%22356%22%20width%3D%22512%22%20height%3D%2214%22%20rx%3D%227%22%20fill%3D%22%230f172a%22%2F%3E%20%3Cg%20fill%3D%22%230b0f24%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%2210%22%3E%20%3Ccircle%20cx%3D%22640%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%3Ccircle%20cx%3D%22740%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%3Ccircle%20cx%3D%22990%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%20%3C%2Fg%3E%20%3Cg%20fill%3D%22none%22%20stroke%3D%22%2322d3ee%22%20stroke-width%3D%223%22%3E%20%3Ccircle%20cx%3D%22640%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%3Ccircle%20cx%3D%22740%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%3Ccircle%20cx%3D%22990%22%20cy%3D%22376%22%20r%3D%2230%22%2F%3E%20%3Canimate%20attributeName%3D%22opacity%22%20values%3D%221%3B.5%3B1%22%20dur%3D%222.4s%22%20repeatCount%3D%22indefinite%22%2F%3E%20%3C%2Fg%3E%20%3Crect%20x%3D%22585%22%20y%3D%22238%22%20width%3D%22120%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22%2322d3ee%22%20opacity%3D%22.9%22%2F%3E%20%3Crect%20x%3D%22585%22%20y%3D%22258%22%20width%3D%2288%22%20height%3D%2210%22%20rx%3D%225%22%20fill%3D%22%2322d3ee%22%20opacity%3D%22.55%22%2F%3E%20%3C%2Fg%3E%20%3C%2Fsvg%3E"

// Inline SVG sparkline for stat cards
const Spark = ({ points, color }) => (
  <svg className="spark" width="100%" height="34" viewBox="0 0 120 34" preserveAspectRatio="none" aria-hidden="true">
    <polyline points={points} style={{ stroke: color }} />
  </svg>
)

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
          <Spark points="0,28 15,24 30,26 45,18 60,20 75,12 90,14 105,8 120,10" color="var(--primary)" />
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
          <Spark points="0,30 15,26 30,28 45,22 60,24 75,16 90,18 105,10 120,6" color="var(--success)" />
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
          <Spark points="0,10 15,14 30,12 45,18 60,16 75,22 90,20 105,26 120,24" color="var(--danger)" />
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
