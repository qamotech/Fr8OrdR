import { useState, useRef } from 'react'
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react'

const TRACKS = [
  { id: 1, title: 'Highway Run', artist: 'The Truckers', url: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=country-rock-124976.mp3' },
  { id: 2, title: 'Midnight Drive', artist: 'Long Haul', url: 'https://cdn.pixabay.com/download/audio/2022/02/10/audio_fc48af67b2.mp3?filename=country-blues-132958.mp3' },
  { id: 3, title: 'Diesel Heart', artist: '18 Wheels', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_29fb6de5d3.mp3?filename=country-rock-music-113337.mp3' }
]

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const currentTrack = TRACKS[currentTrackIndex]

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current.play(), 0)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    setIsPlaying(true)
    setTimeout(() => audioRef.current.play(), 0)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, left: 24, zIndex: 1000, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
      
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{ padding: 20, width: 280, marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ background: 'var(--primary)', padding: 12, borderRadius: 12, color: 'white' }}>
              <Music size={24} />
            </div>
            <div>
              <h4 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{currentTrack.title}</h4>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={prevTrack} style={{ padding: 8, borderRadius: '50%' }}>
              <SkipBack size={18} />
            </button>
            <button className="btn-primary" onClick={togglePlay} style={{ padding: 12, borderRadius: '50%' }}>
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>
            <button className="btn-secondary" onClick={nextTrack} style={{ padding: 8, borderRadius: '50%' }}>
              <SkipForward size={18} />
            </button>
          </div>
          <audio 
            ref={audioRef} 
            src={currentTrack.url} 
            onEnded={nextTrack}
          />
        </div>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: 64, 
          height: 64, 
          borderRadius: '50%', 
          background: 'var(--bg-panel)',
          border: '2px solid var(--primary)',
          boxShadow: '0 8px 32px rgba(99,102,241,0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transition: 'transform 0.2s ease',
          transform: isOpen ? 'scale(1.1)' : 'scale(1)'
        }}
      >
        <img src="/truck_widget_icon.jpg" alt="Music" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
