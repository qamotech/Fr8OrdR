import { useState } from 'react'
import { UploadCloud, File, CheckCircle, Download, Filter, Search } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

export default function Documents() {
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [tab, setTab] = useState('all')
  const toast = useToast()

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation()
    setDragActive(false); setUploaded(true)
    toast('Document uploaded! Processing...', 'success')
    setTimeout(() => setUploaded(false), 3000)
  }

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Paperwork Hub</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary"><Download size={15} /> Export</button>
          <button className="btn-primary"><UploadCloud size={15} /> Upload</button>
        </div>
      </div>

      <div className="tab-bar" style={{ marginBottom: 20 }}>
        {['all', 'bol', 'fuel', 'invoices', 'other'].map(t => (
          <button key={t} className={`tab-item ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t === 'all' ? 'All' : t === 'bol' ? 'BOL' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      
      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>Smart Upload</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: 13 }}>
            Upload BOLs, Fuel Receipts, or Invoices. Data is auto-extracted and synced to records.
          </p>
          
          <div 
            className={`upload-area ${dragActive ? 'active' : ''} ${!uploaded ? 'pulse-border' : ''}`}
            onDragEnter={handleDrag} onDragLeave={handleDrag}
            onDragOver={handleDrag} onDrop={handleDrop}
          >
            {uploaded ? (
              <>
                <CheckCircle size={44} color="var(--success)" />
                <div className="upload-text">
                  <h3 style={{ color: 'var(--success)' }}>Upload Complete!</h3>
                  <p>Extracting data...</p>
                </div>
              </>
            ) : (
              <>
                <div className="upload-icon"><UploadCloud size={32} /></div>
                <div className="upload-text">
                  <h3>Drag & Drop Paperwork</h3>
                  <p>or click to browse files</p>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>PDF, JPG, PNG — Max 10MB</p>
              </>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>Recent Processing</h3>
          <div className="activity-list stagger-children">
            <div className="activity-item">
              <div className="activity-icon"><File size={18} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>Fuel Receipt #992</h4>
                <p style={{ color: 'var(--success)' }}>✓ Extracted</p>
              </div>
              <div className="activity-time">5m</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><File size={18} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>BOL_Chicago_LD8492.pdf</h4>
                <p style={{ color: 'var(--warning)' }}>⚙ Processing</p>
              </div>
              <div className="activity-time">12m</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><File size={18} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>Maintenance_Invoice.jpg</h4>
                <p style={{ color: 'var(--danger)' }}>! Review needed</p>
              </div>
              <div className="activity-time">1h</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><File size={18} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>Lumper_Receipt_DAL.pdf</h4>
                <p style={{ color: 'var(--success)' }}>✓ Extracted</p>
              </div>
              <div className="activity-time">3h</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
