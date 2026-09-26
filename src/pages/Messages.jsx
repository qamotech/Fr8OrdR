import { useState } from 'react'
import { Send, Paperclip, Image, Smile } from 'lucide-react'

const INITIAL_MESSAGES = [
  { id: 1, from: 'mike', text: 'Hey Jodi, I just dropped off the load in Chicago. Uploading BOL now.', time: '2:30 PM' },
  { id: 2, from: 'jodi', text: 'Great job! I see the BOL. Have a safe drive to the next pickup.', time: '2:32 PM' },
  { id: 3, from: 'mike', text: 'Thanks babe. Fuel stop in Gary, IN then heading to Memphis. ETA 11pm.', time: '2:35 PM' },
]

export default function Messages() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)

  const sendMessage = () => {
    if (!input.trim()) return
    const newMsg = { id: Date.now(), from: 'jodi', text: input, time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    
    // Simulate Mike typing and replying
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const replies = ['10-4, got it!', 'Sounds good, I\'ll handle it.', 'Copy that. Heading out now.', 'Will do. Love you!']
      const reply = { id: Date.now() + 1, from: 'mike', text: replies[Math.floor(Math.random() * replies.length)], time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
      setMessages(prev => [...prev, reply])
    }, 1500 + Math.random() * 1500)
  }

  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <span>Dispatch Chat</span>
        <span className="badge badge-success"><span className="live-pulse" style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'var(--success)' }} /> Mike — Online</span>
      </div>
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={msg.id} className="animate-slide-up" style={{
              alignSelf: msg.from === 'jodi' ? 'flex-end' : 'flex-start',
              background: msg.from === 'jodi' ? 'var(--primary)' : 'var(--bg-card)',
              color: msg.from === 'jodi' ? 'white' : 'var(--text-main)',
              padding: '10px 16px',
              borderRadius: msg.from === 'jodi' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              maxWidth: '70%',
              border: msg.from === 'jodi' ? 'none' : '1px solid var(--border)',
              boxShadow: msg.from === 'jodi' ? '0 4px 12px var(--glow-primary)' : 'none'
            }}>
              <p style={{ fontSize: 14, lineHeight: 1.5 }}>{msg.text}</p>
              <span style={{ fontSize: 10, opacity: 0.7, marginTop: 4, display: 'block' }}>
                {msg.from === 'jodi' ? 'You' : 'Mike'} — {msg.time}
              </span>
            </div>
          ))}
          {typing && (
            <div className="animate-fade-in" style={{ alignSelf: 'flex-start', padding: '10px 16px', background: 'var(--bg-card)', borderRadius: '16px 16px 16px 4px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                <span className="live-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animationDelay: '0s' }} />
                <span className="live-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animationDelay: '0.2s' }} />
                <span className="live-pulse" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', animationDelay: '0.4s' }} />
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: '14px', borderTop: '1px solid var(--border)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn-secondary" style={{ padding: 7, borderRadius: '50%' }}><Paperclip size={16} /></button>
          <button className="btn-secondary" style={{ padding: 7, borderRadius: '50%' }}><Image size={16} /></button>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message to Mike..."
            style={{ flex: 1, background: 'var(--input-bg)', border: '1px solid var(--border)', borderRadius: '24px', padding: '10px 18px', color: 'var(--text-main)', outline: 'none', fontFamily: 'inherit', fontSize: 13 }}
          />
          <button className="btn-primary" onClick={sendMessage} style={{ borderRadius: '50%', width: 40, height: 40, padding: 0 }}>
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
