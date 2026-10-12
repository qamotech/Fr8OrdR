import { useState, useRef, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Music, Volume2 } from 'lucide-react'

const TRACKS = [
  { id: 1, title: 'Open Road Anthem', artist: 'Chrome Stacks', color: '#6366f1', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Highway Run', artist: 'The Truckers', color: '#ec4899', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Midnight Drive', artist: 'Long Haul', color: '#14b8a6', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'Diesel Heart', artist: '18 Wheels', color: '#f59e0b', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
  { id: 5, title: 'Convoy Sunset', artist: 'Flatbed Kings', color: '#ef4444', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3' }
]

const RADIO_ICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%233b82f6'/%3E%3Cstop offset='100%25' stop-color='%231d4ed8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='80' height='80' rx='16' fill='url(%23g)'/%3E%3Cpath d='M20 48 L20 32 L44 32 L56 42 L56 48 Z' fill='%23ffffff'/%3E%3Ccircle cx='28' cy='52' r='5' fill='%23ff914d'/%3E%3Ccircle cx='48' cy='52' r='5' fill='%23ff914d'/%3E%3C/svg%3E"

export default function MusicWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  
  const audioRef = useRef(null)
  const currentTrack = TRACKS[currentTrackIndex]

  useEffect(() => {
    // Create audio element if it doesn't exist
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'none';
      audioRef.current.addEventListener('timeupdate', () => {
        if (audioRef.current && audioRef.current.duration) {
          setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }
      });
      audioRef.current.addEventListener('ended', () => {
        setCurrentTrackIndex(prev => (prev + 1) % TRACKS.length);
        setIsPlaying(true);
      });
      audioRef.current.addEventListener('error', () => {
        setIsPlaying(false);
      });
    }

    const handleVisibility = () => {
      if (document.visibilityState === 'hidden' && audioRef.current && !audioRef.current.paused) {
        // Option to pause audio or reduce processing when hidden
      }
    };
    const handlePageHide = () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('pagehide', handlePageHide);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pagehide', handlePageHide);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []); // Run once on mount

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = TRACKS[currentTrackIndex].url;
      audioRef.current.load();
      setProgress(0);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  // Handle play/pause changes
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const selectTrack = (i) => {
    setCurrentTrackIndex(i)
    setIsPlaying(true)
  }

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    setIsPlaying(true)
  }

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    setIsPlaying(true)
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
      
      {isOpen && (
        <div className="glass-panel animate-fade-in" style={{ padding: 20, width: 310 }}>
          {/* Now Playing */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{
              background: `linear-gradient(135deg, ${currentTrack.color}, var(--primary))`,
              padding: 11, borderRadius: 12, color: 'white', flexShrink: 0,
              animation: isPlaying ? 'pulseGlow 2s ease-in-out infinite' : 'none'
            }}>
              {isPlaying ? <Volume2 size={20} /> : <Music size={20} />}
            </div>
            <div style={{ minWidth: 0 }}>
              <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentTrack.title}</h4>
              <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>{currentTrack.artist}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="progress-bar" style={{ marginBottom: 14 }}>
            <div className="progress-fill" style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${currentTrack.color}, var(--primary))` }} />
          </div>

          {/* Track List */}
          <div style={{ marginBottom: 14 }}>
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                onClick={() => selectTrack(i)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '7px 10px', borderRadius: 8, cursor: 'pointer',
                  background: i === currentTrackIndex ? `${track.color}18` : 'transparent',
                  color: i === currentTrackIndex ? track.color : 'var(--text-muted)',
                  transition: 'all 0.2s ease',
                  fontSize: 12, fontWeight: i === currentTrackIndex ? 600 : 400
                }}
              >
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: i === currentTrackIndex ? track.color : 'transparent',
                  boxShadow: i === currentTrackIndex && isPlaying ? `0 0 6px ${track.color}` : 'none',
                  flexShrink: 0
                }} />
                <span>{track.title}</span>
                <span style={{ marginLeft: 'auto', fontSize: 10, opacity: 0.6 }}>{track.artist}</span>
              </div>
            ))}
          </div>
          
          {/* Controls */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14 }}>
            <button className="btn-secondary" onClick={prevTrack} style={{ padding: 0, borderRadius: '50%', width: 36, height: 36 }}>
              <SkipBack size={15} />
            </button>
            <button className="btn-primary" onClick={togglePlay} style={{
              padding: 0, borderRadius: '50%', width: 46, height: 46,
              background: `linear-gradient(135deg, ${currentTrack.color}, var(--primary))`
            }}>
              {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: 2 }} />}
            </button>
            <button className="btn-secondary" onClick={nextTrack} style={{ padding: 0, borderRadius: '50%', width: 36, height: 36 }}>
              <SkipForward size={15} />
            </button>
          </div>
        </div>
      )}

      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={isPlaying ? 'pulse-glow' : ''}
        style={{
          width: 58, height: 58, borderRadius: '50%',
          background: 'var(--bg-panel)',
          border: `2px solid ${isPlaying ? currentTrack.color : 'var(--primary)'}`,
          boxShadow: isPlaying 
            ? `0 0 0 3px ${currentTrack.color}30, 0 8px 32px ${currentTrack.color}40` 
            : '0 8px 32px rgba(99,102,241,0.25)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
          transform: isOpen ? 'scale(1.08)' : 'scale(1)'
        }}
      >
        <img src={RADIO_ICON} alt="Fr8 Radio" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  )
}
