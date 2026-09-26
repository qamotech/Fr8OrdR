import { ShieldCheck, Lock, Eye, Database } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="section-title" style={{ justifyContent: 'center', marginBottom: 40, marginTop: 20 }}>
        <span style={{ fontSize: 32 }}><ShieldCheck size={36} color="var(--primary)" style={{ verticalAlign: -6, marginRight: 10 }} /> Privacy Policy</span>
      </div>

      <div className="glass-panel" style={{ padding: 40 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 30, fontSize: 15, lineHeight: 1.6 }}>
          Last updated: September 26, 2026. At Fr8OrdR, we take your privacy seriously. This policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our platform.
        </p>

        <div className="grid-cards" style={{ gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          <div style={{ background: 'var(--input-bg)', padding: 24, borderRadius: 12 }}>
            <Database size={24} color="var(--primary)" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>Data We Collect</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>We collect Device Information using technologies like cookies, log files, web beacons, tags, and pixels. We also securely collect your fleet routing data to optimize your loads.</p>
          </div>
          <div style={{ background: 'var(--input-bg)', padding: 24, borderRadius: 12 }}>
            <Lock size={24} color="var(--success)" style={{ marginBottom: 12 }} />
            <h3 style={{ fontSize: 16, marginBottom: 8 }}>How We Protect It</h3>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>All data is encrypted at rest and in transit. Your BOLs, invoices, and messaging data are secured using industry-standard AES-256 encryption.</p>
          </div>
        </div>

        <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>1. Sharing Your Personal Information</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          We do not sell your personal information. We share your Personal Information with third parties only to help us use your Personal Information, as described above. For example, we use Google Maps API to power our route planner.
        </p>

        <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>2. Your Rights</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. 
        </p>

        <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>3. Data Retention</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          When you upload documents through the Paperwork Hub, we will maintain your Order Information for our records unless and until you ask us to delete this information.
        </p>
      </div>
    </div>
  )
}
