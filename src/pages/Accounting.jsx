import { useState } from 'react'
import { DollarSign, TrendingUp, TrendingDown, FileText, Download, Plus } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

const INITIAL_INVOICES = [
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
  const [invoices, setInvoices] = useState(INITIAL_INVOICES)
  const toast = useToast()

  const toggleInvoiceStatus = (id) => {
    setInvoices(prev => prev.map(inv => {
      if (inv.id !== id) return inv
      const nextStatus = inv.status === 'paid' ? 'pending' : inv.status === 'pending' ? 'overdue' : 'paid'
      toast(`${inv.id} marked as ${nextStatus.toUpperCase()}`, 'info')
      return { ...inv, status: nextStatus }
    }))
  }

  const handleGenerateInvoice = () => {
    const nextNum = 1043 + invoices.length - INITIAL_INVOICES.length
    const newInv = {
      id: `INV-${nextNum}`,
      client: 'Swift Trans Logistics',
      amount: 4750,
      status: 'pending',
      date: 'Today'
    }
    setInvoices(prev => [newInv, ...prev])
    toast(`Generated Invoice ${newInv.id} ($4,750)!`, 'success')
  }

  const handleExportCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' +
      'Invoice,Client,Amount,Date,Status\n' +
      invoices.map(i => `${i.id},${i.client},${i.amount},${i.date},${i.status}`).join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'fr8ordr-invoices.csv')
    document.body.appendChild(link)
    link.click()
    link.remove()
    toast('Invoices exported to CSV!', 'success')
  }

  const totalRev = invoices.reduce((acc, curr) => acc + (curr.status === 'paid' ? curr.amount : 0), 0)

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Accounting & Invoicing</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-secondary" onClick={handleExportCSV}>
            <Download size={15} style={{ marginRight: 4 }} /> Export CSV
          </button>
          <button className="btn-primary" onClick={handleGenerateInvoice}>
            <Plus size={15} style={{ marginRight: 4 }} /> <FileText size={15} /> Generate Invoice
          </button>
        </div>
      </div>

      <div className="grid-cards stagger-children" style={{ marginBottom: 24 }}>
        <div className="glass-card stat-card">
          <div className="stat-header">
            <span>Collected Revenue</span>
            <div className="stat-icon" style={{ color: 'var(--success)', background: 'rgba(16,185,129,0.1)' }}><TrendingUp size={18} /></div>
          </div>
          <div className="stat-value">${totalRev.toLocaleString()}</div>
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
          <div className="stat-value" style={{ color: 'var(--success)' }}>${(totalRev - 7000).toLocaleString()}</div>
          <p style={{ fontSize: 12, color: 'var(--success)' }}>Healthy operating margin</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: 22 }}>
          <div className="section-title">
            <span>Invoices ({invoices.length})</span>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status (Click to Toggle)</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td style={{ fontWeight: 600 }}>{inv.id}</td>
                  <td>{inv.client}</td>
                  <td>${inv.amount.toLocaleString()}</td>
                  <td>{inv.date}</td>
                  <td>
                    <button
                      onClick={() => toggleInvoiceStatus(inv.id)}
                      className={`badge badge-${inv.status === 'paid' ? 'success' : inv.status === 'pending' ? 'warning' : 'danger'}`}
                      style={{ cursor: 'pointer', border: 'none', background: 'inherit' }}
                      title="Click to toggle status"
                    >
                      {inv.status === 'paid' ? '✓ Paid' : inv.status === 'pending' ? 'Pending' : '⚠ Overdue'}
                    </button>
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

