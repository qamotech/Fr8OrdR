import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Play, Pause, ChevronRight, ChevronLeft, X, CheckCircle2, Sparkles } from 'lucide-react'

const TOUR_STEPS = [
  {
    path: '/',
    selector: '.brand',
    title: 'Welcome to Fr8OrdR Command!',
    body: 'Enterprise fleet management and logistics dispatch center. Click the brand mark anytime to collapse the sidebar and maximize operational workspace.',
    preferredPos: 'right',
    tag: 'Overview'
  },
  {
    path: '/',
    selector: '.nav-links',
    title: 'Navigational Hierarchy',
    body: 'Cleanly segmented into Dispatch, Fleet, and Business operational domains. Numerical hotkeys (1 through 0) let dispatchers jump between views instantly.',
    preferredPos: 'right',
    tag: 'Navigation'
  },
  {
    path: '/',
    selector: '.stat-card:first-child',
    title: 'Real-Time Fleet KPIs & Sparklines',
    body: 'Live telemetry tracks active loads, weekly revenue, and fleet maintenance alerts at a glance with real-time vector trend sparklines.',
    preferredPos: 'bottom',
    tag: 'Telemetry'
  },
  {
    path: '/',
    selector: '.dashboard-grid .glass-panel:first-child',
    title: 'Live Tracking & ETA Radar',
    body: 'Monitor active truck dispatches, origin-to-destination waypoints, and real-time delivery ETAs with color-coded delay warnings.',
    preferredPos: 'bottom',
    tag: 'Tracking'
  },
  {
    path: '/load-board',
    selector: '.glass-panel',
    title: 'Interactive Freight Load Board',
    body: 'Scan available freight across top brokers, evaluate rate-per-mile profitability, and instantly book & dispatch loads with one click.',
    preferredPos: 'bottom',
    tag: 'Freight'
  },
  {
    path: '/route-planner',
    selector: '.dashboard-grid .glass-panel:first-child',
    title: 'Route & Diesel Fuel Optimizer',
    body: '1-click freight corridor presets (Chicago → Dallas, Atlanta → Miami, Denver → Phoenix) calculate mileage, fuel stops, and toll costs.',
    preferredPos: 'right',
    tag: 'Optimization'
  },
  {
    path: '/shipments',
    selector: '.scroll-area',
    title: 'Active Shipments Command',
    body: 'Track load lifecycles from dispatch pickup to final receiver delivery. Filter by shipment status and inspect assigned driver manifests.',
    preferredPos: 'bottom',
    tag: 'Logistics'
  },
  {
    path: '/fleet',
    selector: '.scroll-area',
    title: 'Fleet & Driver Roster',
    body: 'Complete vehicle and driver oversight: fuel gauges, odometer readings, assigned equipment, and instant maintenance scheduling.',
    preferredPos: 'bottom',
    tag: 'Fleet'
  },
  {
    path: '/hos',
    selector: '.scroll-area',
    title: 'Hours of Service (HOS) Compliance',
    body: 'Federal ELD compliance tracker featuring real-time visual progress clocks for 11hr drive limits, 14hr on-duty shifts, and 70hr/8-day cycles.',
    preferredPos: 'bottom',
    tag: 'Compliance'
  },
  {
    path: '/maintenance',
    selector: '.glass-panel',
    title: 'Preventative Maintenance Logs',
    body: 'Prevent costly roadside DOT inspections with scheduled oil service, tire rotations, brake diagnostics, and service work orders.',
    preferredPos: 'bottom',
    tag: 'Service'
  },
  {
    path: '/driver-scorecard',
    selector: '.dashboard-grid',
    title: 'Driver Safety & Telemetry Scorecards',
    body: 'Incentivize safety and performance: track on-time delivery percentages, harsh braking events, and fuel economy efficiency scores.',
    preferredPos: 'bottom',
    tag: 'Safety'
  },
  {
    path: '/documents',
    selector: '.scroll-area',
    title: 'Paperwork Hub & Smart OCR',
    body: 'Drag-and-drop digital processing for Bills of Lading (BOL), rate confirmations, and fuel receipts with automated OCR field extraction.',
    preferredPos: 'bottom',
    tag: 'Paperwork'
  },
  {
    path: '/accounting',
    selector: '.scroll-area',
    title: 'Financials & Invoicing',
    body: 'Generate carrier invoices in seconds, reconcile paid versus pending freight receivables, and monitor monthly operating cashflow.',
    preferredPos: 'bottom',
    tag: 'Accounting'
  },
  {
    path: '/messages',
    selector: '.glass-panel',
    title: 'Dispatch Messaging & Quick Comms',
    body: 'Direct driver communication channel with pre-configured quick dispatch response chips (10-4 Load Confirmed, Fuel Approved) and status syncing.',
    preferredPos: 'bottom',
    tag: 'Comms'
  }
]

export default function DemoTour({ active, onClose }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const [targetRect, setTargetRect] = useState(null)
  const [tooltipPos, setTooltipPos] = useState({ top: 100, left: 100, arrow: 'top' })
  const [isCompleted, setIsCompleted] = useState(false)
  
  const navigate = useNavigate()
  const location = useLocation()
  const autoPlayTimerRef = useRef(null)
  const tourOpenedSidebar = useRef(false)

  const currentStep = TOUR_STEPS[stepIndex]

  // Update spotlight and tooltip position based on active step selector
  const updatePosition = useCallback(() => {
    if (!active || isCompleted || !currentStep) return

    const el = document.querySelector(currentStep.selector)

    // Mobile: auto-open the off-canvas sidebar when a step targets it,
    // so the highlight ring lands on something visible
    const sidebarEl = el?.closest('.sidebar')
    const isMobileViewport = window.innerWidth <= 768
    const sidebarDom = document.querySelector('.sidebar')
    if (sidebarEl && isMobileViewport && sidebarDom && !sidebarDom.classList.contains('mobile-open')) {
      sidebarDom.classList.add('mobile-open')
      tourOpenedSidebar.current = true
    } else if (!sidebarEl && tourOpenedSidebar.current && sidebarDom) {
      sidebarDom.classList.remove('mobile-open')
      tourOpenedSidebar.current = false
    }

    if (!el) {
      setTargetRect(null)
      setTooltipPos({
        top: Math.max(80, window.innerHeight / 2 - 130),
        left: Math.max(20, window.innerWidth / 2 - 190),
        arrow: 'none'
      })
      return
    }

    const rect = el.getBoundingClientRect()
    setTargetRect(rect)

    const isSidebarOrHeader = el.closest('.sidebar') || el.closest('.top-header')
    if (!isSidebarOrHeader && (rect.top < 80 || rect.bottom > window.innerHeight - 80)) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }

    const tipWidth = Math.min(380, window.innerWidth - 32)
    const tipHeight = 250
    const gap = 16

    let top = rect.bottom + gap
    let left = Math.max(16, Math.min(window.innerWidth - tipWidth - 16, rect.left + rect.width / 2 - tipWidth / 2))
    let arrow = 'top'

    if (currentStep.preferredPos === 'right' && rect.right + gap + tipWidth <= window.innerWidth - 16) {
      left = rect.right + gap
      top = Math.max(80, Math.min(window.innerHeight - tipHeight - 20, rect.top))
      arrow = 'left'
    } else if (currentStep.preferredPos === 'left' && rect.left - gap - tipWidth >= 16) {
      left = rect.left - gap - tipWidth
      top = Math.max(80, Math.min(window.innerHeight - tipHeight - 20, rect.top))
      arrow = 'right'
    } else if (top + tipHeight > window.innerHeight - 20 && rect.top - gap - tipHeight >= 80) {
      top = rect.top - gap - tipHeight
      arrow = 'bottom'
    }

    top = Math.max(80, Math.min(window.innerHeight - tipHeight - 16, top))
    left = Math.max(16, Math.min(window.innerWidth - tipWidth - 16, left))

    setTooltipPos({ top, left, arrow })
  }, [active, isCompleted, currentStep])

  // Cross-route navigation sync
  useEffect(() => {
    if (!active || isCompleted || !currentStep) return

    if (location.pathname !== currentStep.path) {
      navigate(currentStep.path)
    }

    const t1 = setTimeout(updatePosition, 100)
    const t2 = setTimeout(updatePosition, 300)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [stepIndex, active, isCompleted, currentStep, location.pathname, navigate, updatePosition])

  // Window resize & scroll listeners
  useEffect(() => {
    if (!active || isCompleted) return
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
    }
  }, [active, isCompleted, updatePosition])

  // Step navigation handlers
  const handleNext = useCallback(() => {
    if (stepIndex < TOUR_STEPS.length - 1) {
      setStepIndex(prev => prev + 1)
    } else {
      setIsCompleted(true)
      setAutoPlay(false)
    }
  }, [stepIndex])

  const handlePrev = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex(prev => prev - 1)
      setIsCompleted(false)
    }
  }, [stepIndex])

  const handleRestart = () => {
    setIsCompleted(false)
    setStepIndex(0)
    setAutoPlay(false)
    navigate('/')
  }

  const handleFinish = useCallback(() => {
    setIsCompleted(false)
    setStepIndex(0)
    setAutoPlay(false)
    if (tourOpenedSidebar.current) {
      document.querySelector('.sidebar')?.classList.remove('mobile-open')
      tourOpenedSidebar.current = false
    }
    navigate('/')
    onClose()
  }, [navigate, onClose])

  // Keyboard navigation
  useEffect(() => {
    if (!active) return

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return

      if (e.key === 'Escape') {
        e.preventDefault()
        handleFinish()
      } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
        e.preventDefault()
        if (isCompleted) handleFinish()
        else handleNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (!isCompleted) handlePrev()
      } else if (e.key === ' ') {
        e.preventDefault()
        setAutoPlay(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [active, isCompleted, handleNext, handlePrev, handleFinish])

  // Auto-play interval timer
  useEffect(() => {
    if (!active || !autoPlay || isCompleted) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
      return
    }

    autoPlayTimerRef.current = setInterval(() => {
      handleNext()
    }, 4500)

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current)
    }
  }, [active, autoPlay, isCompleted, handleNext])

  if (!active) return null

  const progressPct = ((stepIndex + 1) / TOUR_STEPS.length) * 100

  return (
    <div className="tour-container" id="fr8-tour-root">
      {/* Dark backdrop with click to close */}
      <div className="tour-backdrop" onClick={handleFinish} />

      {/* Target element spotlight frame */}
      {targetRect && !isCompleted && (
        <div
          className="tour-spotlight-frame pulse-border"
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12,
          }}
        />
      )}

      {/* Floating Active Tour Step Card */}
      {!isCompleted && (
        <div
          className="tour-tooltip glass-panel animate-slide-up"
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
            width: Math.min(380, window.innerWidth - 32),
          }}
        >
          {/* Header row with step badge and close button */}
          <div className="tour-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="tour-badge">
                <Sparkles size={13} color="var(--primary)" />
                <span>{currentStep.tag}</span>
              </span>
              <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>
                Step {stepIndex + 1} of {TOUR_STEPS.length}
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <button
                className={`btn-secondary ${autoPlay ? 'active-autoplay' : ''}`}
                style={{ padding: '4px 8px', fontSize: 11, display: 'flex', alignItems: 'center', gap: 4 }}
                onClick={() => setAutoPlay(!autoPlay)}
                title="Toggle Auto-Play (Space)"
              >
                {autoPlay ? <Pause size={12} /> : <Play size={12} />}
                <span>{autoPlay ? 'Auto' : 'Play'}</span>
              </button>
              <button
                className="btn-icon"
                onClick={handleFinish}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}
                title="Exit Tour (Esc)"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Title & Body */}
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: '10px 0 6px 0', color: 'var(--text-main)' }}>
            {currentStep.title}
          </h3>
          <p style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--text-muted)', margin: 0 }}>
            {currentStep.body}
          </p>

          {/* Progress bar */}
          <div style={{ marginTop: 16, marginBottom: 14 }}>
            <div className="progress-bar" style={{ height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2 }}>
              <div
                className="progress-fill"
                style={{
                  width: `${progressPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, var(--primary), #22d3ee)',
                  borderRadius: 2,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              className="btn-secondary"
              onClick={handleFinish}
              style={{ padding: '6px 12px', fontSize: 12 }}
            >
              Skip
            </button>
            <div style={{ display: 'flex', gap: 8 }}>
              {stepIndex > 0 && (
                <button
                  className="btn-secondary"
                  onClick={handlePrev}
                  style={{ padding: '6px 12px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}
                >
                  <ChevronLeft size={14} /> Back
                </button>
              )}
              <button
                className="btn-primary"
                onClick={handleNext}
                style={{ padding: '6px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4, fontWeight: 600 }}
              >
                {stepIndex === TOUR_STEPS.length - 1 ? 'Finish' : 'Next'} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {isCompleted && (
        <div
          className="glass-panel animate-slide-up"
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 460,
            width: '90%',
            padding: 30,
            zIndex: 10002,
            textAlign: 'center',
            boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
            border: '1px solid var(--border)'
          }}
        >
          <div style={{ display: 'inline-flex', padding: 14, borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: 'var(--success)', marginBottom: 16 }}>
            <CheckCircle2 size={42} />
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8, color: 'var(--text-main)' }}>
            Fr8OrdR Tour Complete! 🎉
          </h2>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 20 }}>
            You explored all 14 core operational workflows across Dispatching, Live Tracking, Load Booking, Route Optimization, Compliance, and Financials.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24, textAlign: 'left', fontSize: 12 }}>
            <div style={{ padding: '8px 12px', background: 'var(--input-bg)', borderRadius: 8 }}>
              <span style={{ color: 'var(--success)' }}>✓</span> 100% Modules Verified
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--input-bg)', borderRadius: 8 }}>
              <span style={{ color: 'var(--primary)' }}>⚡</span> Quick Keys Active (1–0)
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--input-bg)', borderRadius: 8 }}>
              <span style={{ color: '#22d3ee' }}>📍</span> Real-Time GPS Radar
            </div>
            <div style={{ padding: '8px 12px', background: 'var(--input-bg)', borderRadius: 8 }}>
              <span style={{ color: 'var(--warning)' }}>📄</span> Smart OCR Paperwork
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
            <button
              className="btn-secondary"
              onClick={handleRestart}
              style={{ padding: '8px 18px', fontSize: 13 }}
            >
              Replay Tour
            </button>
            <button
              className="btn-primary"
              onClick={handleFinish}
              style={{ padding: '8px 22px', fontSize: 13, fontWeight: 700 }}
            >
              Enter Command Center
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
