import { DollarSign } from 'lucide-react'

export default function Accounting() {
  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Accounting & Invoicing</span>
        <button className="btn-primary">Generate Invoice</button>
      </div>
      <div className="glass-panel" style={{ padding: '24px', marginTop: '24px' }}>
        <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
          <DollarSign size={48} style={{ opacity: 0.5, margin: '0 auto 16px auto', display: 'block' }} />
          <h3 style={{ marginBottom: 8, color: 'var(--text-main)' }}>All invoices are paid!</h3>
          <p>You have no pending factoring or unpaid invoices this week.</p>
        </div>
      </div>
    </div>
  )
}
