import { useState } from 'react'
import { User, Camera, Shield, Mail, Phone, Briefcase, MapPin, Truck, Save, Settings, Key, Bell, CheckCircle } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

export default function Profile() {
  const { addToast } = useToast()
  
  const [profile, setProfile] = useState({
    name: 'Jodi P.',
    role: 'Owner-Operator / Dispatch',
    email: 'jodi.p@fr8ordr.app',
    phone: '+1 (555) 839-2041',
    company: 'J&M Logistics LLC',
    dotNumber: '3940291',
    mcNumber: 'MC-294021',
    address: '1420 Freight Way, Chicago, IL 60601',
    insurance: 'Progressive Commercial (Policy #PC-9204)'
  })

  const [saving, setSaving] = useState(false)

  const handleSave = () => {
    setSaving(true)
    setTimeout(() => {
      setSaving(false)
      addToast('Profile updated successfully!', 'success')
    }, 800)
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: 900, margin: '0 auto' }}>
      <div className="section-title">
        <span>Account & Settings</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 2fr', gap: 24 }}>
        
        {/* Left Column - Avatar & Quick Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div className="glass-panel" style={{ padding: 24, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--bg-card)', boxShadow: 'var(--glass-shadow)' }}>
                <img src="./jodi_avatar.jpg" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <button style={{ position: 'absolute', bottom: 0, right: 0, width: 36, height: 36, borderRadius: '50%', background: 'var(--primary)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.4)' }} className="hover-scale">
                <Camera size={16} />
              </button>
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{profile.name}</h2>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{profile.role}</p>
            
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <span style={{ fontSize: 11, background: 'var(--glow-success)', color: 'var(--success)', padding: '4px 10px', borderRadius: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <CheckCircle size={12}/> Verified
              </span>
              <span style={{ fontSize: 11, background: 'var(--glow-primary)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 20, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Shield size={12}/> Admin
              </span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border)', fontSize: 14, fontWeight: 600 }}>Preferences</div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                <Settings size={18} color="var(--text-muted)" /> General Settings
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'none', border: 'none', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                <Bell size={18} color="var(--text-muted)" /> Notification Rules
              </button>
              <button style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 20px', background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'left', transition: 'background 0.2s' }}>
                <Key size={18} color="var(--text-muted)" /> Security & Password
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="glass-panel animate-slide-up" style={{ padding: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700 }}>Personal & Company Info</h3>
            <button className="btn-primary" onClick={handleSave} disabled={saving}>
              {saving ? 'Saving...' : <><Save size={16} style={{marginRight: 6}}/> Save Changes</>}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Full Name</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <User size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Role</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Briefcase size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.role} onChange={e => setProfile({...profile, role: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Email Address</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Mail size={16} color="var(--text-muted)"/>
                <input type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Phone Number</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Phone size={16} color="var(--text-muted)"/>
                <input type="tel" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border)', margin: '10px 0' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Company Name</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Briefcase size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.company} onChange={e => setProfile({...profile, company: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Company Address</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <MapPin size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>US DOT Number</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Truck size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.dotNumber} onChange={e => setProfile({...profile, dotNumber: e.target.value})} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>MC Number</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Truck size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.mcNumber} onChange={e => setProfile({...profile, mcNumber: e.target.value})} />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <label style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 600 }}>Commercial Insurance Policy</label>
              <div className="search-bar" style={{ width: '100%', background: 'var(--input-bg)' }}>
                <Shield size={16} color="var(--text-muted)"/>
                <input type="text" value={profile.insurance} onChange={e => setProfile({...profile, insurance: e.target.value})} />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
