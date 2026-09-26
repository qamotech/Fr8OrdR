import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react'

const TRACKS = [
  { id: 1, title: 'Highway Run', artist: 'The Truckers' },
  { id: 2, title: 'Midnight Drive', artist: 'Long Haul' },
  { id: 3, title: 'Diesel Heart', artist: '18 Wheels' }
]

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const currentTrack = TRACKS[currentTrackIndex]

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    setProgress(0)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    setProgress(0)
  }

  // Simulate progress bar
  useEffect(() => {
    if (!isPlaying) return
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          nextTrack()
          return 0
        }
        return p + 0.5
      })
    }, 100)
    return () => clearInterval(interval)
  }, [isPlaying, currentTrackIndex])

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
      
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{ padding: 20, width: 300 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'linear-gradient(135deg, var(--primary), var(--secondary))', padding: 12, borderRadius: 12, color: 'white', flexShrink: 0 }}>
              <Music size={22} />
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: 15, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.title}</h4>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div style={{ width: '100%', height: 4, background: 'var(--input-bg)', borderRadius: 2, marginBottom: 16, overflow: 'hidden' }}>
            <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--secondary))', borderRadius: 2, transition: 'width 0.1s linear' }} />
          </div>

          {/* Track list */}
          <div style={{ marginBottom: 16 }}>
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                onClick={() => { setCurrentTrackIndex(i); setProgress(0); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 10px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  background: i === currentTrackIndex ? 'rgba(99, 102, 241, 0.12)' : 'transparent',
                  color: i === currentTrackIndex ? 'var(--primary)' : 'var(--text-muted)',
                  transition: 'all 0.15s ease',
                  fontSize: 13,
                  fontWeight: i === currentTrackIndex ? 600 : 400
                }}
              >
                {i === currentTrackIndex && isPlaying ? <Volume2 size={14} /> : <Music size={14} />}
                <span>{track.title}</span>
                <span style={{ marginLeft: 'auto', fontSize: 11, opacity: 0.6 }}>{track.artist}</span>
              </div>
            ))}
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16 }}>
            <button className="btn-secondary" onClick={prevTrack} style={{ padding: 8, borderRadius: '50%', width: 38, height: 38 }}>
              <SkipBack size={16} />
            </button>
            <button className="btn-primary" onClick={togglePlay} style={{ padding: 0, borderRadius: '50%', width: 48, height: 48 }}>
              {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: 2 }} />}
            </button>
            <button className="btn-secondary" onClick={nextTrack} style={{ padding: 8, borderRadius: '50%', width: 38, height: 38 }}>
              <SkipForward size={16} />
            </button>
          </div>
        </div>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 60, 
          height: 60, 
          borderRadius: '50%', 
          background: 'var(--bg-panel)',
          border: '2px solid var(--primary)',
          boxShadow: isOpen 
            ? '0 0 0 4px rgba(99,102,241,0.2), 0 8px 32px rgba(99,102,241,0.4)' 
            : '0 8px 32px rgba(99,102,241,0.3)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          transform: isOpen ? 'scale(1.05)' : 'scale(1)'
        }}
      >
        <img src="/truck_widget_icon.jpg" alt="Fr8 Radio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
