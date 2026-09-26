import { MessageSquare, Send } from 'lucide-react'

export default function Messages() {
  return (
    <div className="animate-fade-in" style={{ height: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column' }}>
      <div className="section-title">
        <span>Dispatch Chat</span>
      </div>
      <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '24px', overflow: 'hidden' }}>
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ alignSelf: 'flex-start', background: 'var(--bg-card)', padding: '12px 16px', borderRadius: '16px 16px 16px 0', maxWidth: '70%' }}>
            <p style={{ fontSize: 14 }}>Hey Jodi, I just dropped off the load in Chicago. Uploading BOL now.</p>
            <span style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4, display: 'block' }}>Mike - 2:30 PM</span>
          </div>
          <div style={{ alignSelf: 'flex-end', background: 'var(--primary)', color: 'white', padding: '12px 16px', borderRadius: '16px 16px 0 16px', maxWidth: '70%' }}>
            <p style={{ fontSize: 14 }}>Great job! I see the BOL. Have a safe drive to the next pickup.</p>
            <span style={{ fontSize: 11, opacity: 0.8, marginTop: 4, display: 'block' }}>You - 2:32 PM</span>
          </div>
        </div>
        <div style={{ padding: '16px', borderTop: '1px solid var(--border)', display: 'flex', gap: '12px' }}>
          <input type="text" placeholder="Type a message to Mike..." style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '24px', padding: '12px 20px', color: 'var(--text-main)', outline: 'none' }} />
          <button className="btn-primary" style={{ borderRadius: '50%', width: 44, height: 44, padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
