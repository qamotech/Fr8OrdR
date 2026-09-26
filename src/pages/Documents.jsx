import { useState } from 'react'
import { UploadCloud, File, CheckCircle, Download } from 'lucide-react'

export default function Documents() {
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    setUploaded(true)
    setTimeout(() => setUploaded(false), 3000)
  }

  return (
    <div className="animate-fade-in">
      <div className="section-title">
        <span>Paperwork Hub</span>
        <div style={{display: 'flex', gap: '12px'}}>
          <button className="btn-secondary" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <Download size={16} /> Export All
          </button>
          <button className="btn-primary">Upload File</button>
        </div>
      </div>
      
      <div className="dashboard-grid" style={{ marginTop: '24px' }}>
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500' }}>Smart Upload</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '14px' }}>
            Upload Bills of Lading (BOL), Fuel Receipts, or Invoices. Our system will automatically extract the data and sync it.
          </p>
          
          <div 
            className={`upload-area ${dragActive ? 'active' : ''} ${!uploaded ? 'pulse-border' : ''}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploaded ? (
              <>
                <CheckCircle size={48} color="var(--success)" />
                <div className="upload-text">
                  <h3 style={{ color: 'var(--success)' }}>Upload Complete!</h3>
                  <p>Processing document and extracting data...</p>
                </div>
              </>
            ) : (
              <>
                <UploadCloud size={48} className="upload-icon" />
                <div className="upload-text">
                  <h3>Drag & Drop Paperwork Here</h3>
                  <p>or click to browse files</p>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Supports PDF, JPG, PNG (Max 10MB)</p>
              </>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', fontSize: '16px', fontWeight: '500' }}>Recent Processing</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon"><File size={20} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>Fuel Receipt #992</h4>
                <p style={{ color: 'var(--success)', fontSize: '12px', marginTop: '4px' }}>✓ Data Extracted</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><File size={20} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>BOL_Chicago_LD8492.pdf</h4>
                <p style={{ color: '#f59e0b', fontSize: '12px', marginTop: '4px' }}>⚙ Processing...</p>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon"><File size={20} color="var(--primary)" /></div>
              <div className="activity-content">
                <h4>Maintenance_Invoice.jpg</h4>
                <p style={{ color: 'var(--danger)', fontSize: '12px', marginTop: '4px' }}>! Requires Manual Review</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
