import { useState, useEffect, useRef } from 'react'
import { Truck, Package, WifiOff, RefreshCcw } from 'lucide-react'

export default function NotFound() {
  const [score, setScore] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [truckPos, setTruckPos] = useState(50) // Percentage 0-100
  const [obstacles, setObstacles] = useState([])
  
  const gameAreaRef = useRef(null)
  const animationRef = useRef(null)
  
  // Game loop
  useEffect(() => {
    if (!isPlaying || gameOver) return
    
    let lastTime = performance.now()
    const dropSpeed = 0.5 // percent per ms

    const loop = (time) => {
      const delta = time - lastTime
      lastTime = time

      setObstacles(prev => {
        let newObstacles = prev.map(obs => ({ ...obs, y: obs.y + (dropSpeed * delta * 0.1) }))
        
        // Check collisions & score
        newObstacles = newObstacles.filter(obs => {
          if (obs.y > 90) { // Bottom of screen
            const hit = Math.abs(obs.x - truckPos) < 10
            if (hit) {
              setScore(s => s + 10)
              return false // Caught!
            } else if (obs.y > 100) {
              // Missed
              setGameOver(true)
              return false
            }
          }
          return true
        })
        
        // Spawn new
        if (Math.random() < 0.02) {
          newObstacles.push({ id: Math.random(), x: Math.random() * 90 + 5, y: -10 })
        }
        
        return newObstacles
      })

      animationRef.current = requestAnimationFrame(loop)
    }
    
    animationRef.current = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(animationRef.current)
  }, [isPlaying, gameOver, truckPos])

  // Handle controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') setTruckPos(p => Math.max(5, p - 8))
      if (e.key === 'ArrowRight') setTruckPos(p => Math.min(95, p + 8))
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const startGame = () => {
    setScore(0)
    setObstacles([])
    setGameOver(false)
    setIsPlaying(true)
    setTruckPos(50)
  }

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <WifiOff size={48} color="var(--danger)" style={{ marginBottom: 16 }} />
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>404 / Offline Status</h1>
        <p style={{ color: 'var(--text-muted)' }}>It looks like you've lost connection or hit a bad link.</p>
      </div>

      <div className="glass-panel" style={{ width: '100%', maxWidth: 600, height: 400, position: 'relative', overflow: 'hidden', padding: 0 }}>
        {!isPlaying ? (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(15,23,42,0.8)', zIndex: 10 }}>
            <h2 style={{ color: 'white', fontSize: 24, marginBottom: 16 }}>{gameOver ? `Game Over! Score: ${score}` : 'Catch the Freight'}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Use Left/Right arrow keys to catch packages.</p>
            <button className="btn-primary" onClick={startGame}>
              <RefreshCcw size={16} style={{marginRight: 8}}/> {gameOver ? 'Play Again' : 'Start Game'}
            </button>
          </div>
        ) : (
          <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 20, fontWeight: 800, color: 'var(--text-main)' }}>
            Score: {score}
          </div>
        )}

        <div ref={gameAreaRef} style={{ position: 'absolute', inset: 0, background: 'var(--bg-dark)' }}>
          {/* Obstacles */}
          {obstacles.map(obs => (
            <div key={obs.id} style={{ position: 'absolute', left: `${obs.x}%`, top: `${obs.y}%`, transform: 'translateX(-50%)' }}>
              <Package size={24} color="var(--warning)" />
            </div>
          ))}

          {/* Truck */}
          <div style={{ 
            position: 'absolute', bottom: 10, left: `${truckPos}%`, 
            transform: 'translateX(-50%)', transition: 'left 0.1s linear' 
          }}>
            <Truck size={48} color="var(--primary)" />
          </div>
        </div>
      </div>
    </div>
  )
}
