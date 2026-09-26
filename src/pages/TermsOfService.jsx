import { FileText, AlertTriangle } from 'lucide-react'

export default function TermsOfService() {
  return (
    <div className="animate-fade-in" style={{ maxWidth: 800, margin: '0 auto' }}>
      <div className="section-title" style={{ justifyContent: 'center', marginBottom: 40, marginTop: 20 }}>
        <span style={{ fontSize: 32 }}><FileText size={36} color="var(--primary)" style={{ verticalAlign: -6, marginRight: 10 }} /> Terms of Service</span>
      </div>

      <div className="glass-panel" style={{ padding: 40 }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: 30, fontSize: 15, lineHeight: 1.6 }}>
          By accessing or using the Fr8OrdR platform, you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
        </p>

        <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>1. Use of the Platform</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          Fr8OrdR provides fleet management software. You are solely responsible for ensuring your drivers comply with FMCSA guidelines, HOS rules, and DOT requirements. Fr8OrdR's tracker is for informational purposes only.
        </p>

        <h3 style={{ fontSize: 20, marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>2. Subscription and Billing</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 14, lineHeight: 1.6 }}>
          Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis (such as daily, weekly, monthly or annually).
        </p>

        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', padding: 16, borderRadius: 8, display: 'flex', gap: 12, marginTop: 30 }}>
          <AlertTriangle color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: 'var(--danger)', marginBottom: 4 }}>Disclaimer of Warranties</h4>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Fr8OrdR makes no representations or warranties of any kind.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
