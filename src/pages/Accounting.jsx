import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, ArrowRight, FileText } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

const INVOICES = [
  { id: 'INV-1042', client: 'ABC Logistics', amount: 4200, status: 'paid', date: 'Sep 22' },
  { id: 'INV-1041', client: 'XYZ Freight', amount: 3800, status: 'paid', date: 'Sep 20' },
  { id: 'INV-1040', client: 'Delta Supply Co', amount: 5100, status: 'pending', date: 'Sep 18' },
  { id: 'INV-1039', client: 'Metro Distributors', amount: 2950, status: 'overdue', date: 'Sep 10' },
]

const EXPENSES = [
  { category: 'Fuel', amount: 3820, pct: 48, color: 'var(--secondary)' },
  { category: 'Insurance', amount: 1200, pct: 15, color: 'var(--primary)' },
  { category: 'Maintenance', amount: 890, pct: 11, color: 'var(--warning)' },
  { category: 'Permits/Tolls', amount: 640, pct: 8, color: 'var(--accent)' },
  { category: 'Other', amount: 450, pct: 6, color: 'var(--text-muted)' },
]

export default function Accounting() {
  const toast = useToast()

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Accounting & Invoicing</span>
        <button className="btn-primary" onClick={() => toast('Invoice INV-1043 generated!', 'success')}><FileText size={15} /> Generate Invoice</button>
      </div>

      <div className="grid-cards stagger-children" style={{ marginBottom: 24 }}>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Total Revenue</span>
            <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)' }}><TrendingUp size={18} /></div>
          </div>
          <div className="stat-value">$16,050</div>
          <p style={{ fontSize: 12, color: 'var(--success)' }}>+18% this month</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Total Expenses</span>
            <div className="stat-icon" style={{ color: 'var(--danger)', background: 'rgba(239,68,68,0.1)' }}><TrendingDown size={18} /></div>
          </div>
          <div className="stat-value">$7,000</div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>$1k under budget</p>
        </div>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Net Profit</span>
            <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)' }}><DollarSign size={18} /></div>
          </div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>$9,050</div>
          <p style={{ fontSize: 12, color: 'var(--success)' }}>56.4% margin</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: 22 }}>
          <div className="section-title">
            <span>Invoices</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INVOICES.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600 }}>{inv.id}</td>
                  <td>{inv.client}</td>
                  <td>${inv.amount.toLocaleString()}</td>
                  <td>{inv.date}</td>
                  <td>
                    <span className={`badge badge-${inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'danger'}`}>
                      {inv.status === 'paid' ? '✓ Paid' : inv.status === 'pending' ? 'Pending' : '⚠ Overdue'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel" style={{ padding: 22 }}>
          <div className="section-title"><span>Expense Breakdown</span></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {EXPENSES.map(e => (
              <div key={e.category}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 500 }}>{e.category}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>${e.amount.toLocaleString()}</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${e.pct}%`, background: e.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
