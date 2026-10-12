import { useState, useRef } from 'react'
import { UploadCloud, File, CheckCircle, Download } from 'lucide-react'
import { useToast } from '../components/ToastProvider'

const INITIAL_DOCS = [
  { id: 1, name: 'Fuel Receipt #992', type: 'fuel', status: 'Extracted', tone: 'success', time: '5m ago' },
  { id: 2, name: 'BOL_Chicago_LD8492.pdf', type: 'bol', status: 'Processing', tone: 'warning', time: '12m ago' },
  { id: 3, name: 'Maintenance_Invoice.jpg', type: 'invoices', status: 'Review needed', tone: 'danger', time: '1h ago' },
  { id: 4, name: 'Lumper_Receipt_DAL.pdf', type: 'other', status: 'Extracted', tone: 'success', time: '3h ago' },
]

export default function Documents() {
  const [docs, setDocs] = useState(INITIAL_DOCS)
  const [dragActive, setDragActive] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [tab, setTab] = useState('all')
  const fileInputRef = useRef(null)
  const toast = useToast()

  const processFiles = (files) => {
    if (!files || files.length === 0) return
    let count = 0
    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast(`"${file.name}" exceeds 10MB limit!`, 'warning')
        return
      }
      count++
      const type = file.name.toLowerCase().includes('bol') ? 'bol' : file.name.toLowerCase().includes('fuel') ? 'fuel' : 'invoices'
      const newDoc = {
        id: Date.now() + Math.random(),
        name: file.name,
        type,
        status: 'Extracted',
        tone: 'success',
        time: 'Just now'
      }
      setDocs(prev => [newDoc, ...prev])
    })

    if (count > 0) {
      setUploaded(true)
      toast(`Successfully processed ${count} document${count > 1 ? 's' : ''}!`, 'success')
      setTimeout(() => setUploaded(false), 2500)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault(); e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault(); e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer?.files?.length) {
      processFiles(e.dataTransfer.files)
    }
  }

  const handleExport = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(docs, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', 'fr8ordr-documents-export.json')
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
    toast('Documents log exported to JSON!', 'success')
  }

  const filteredDocs = tab === 'all' ? docs : docs.filter(d => d.type === tab)

  return (
    <div className="animate-fade-in">
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={e => processFiles(e.target.files)}
      />

      <div className="section-title">
        <span>Paperwork Hub ({docs.length} Items)</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-secondary" onClick={handleExport}><Download size={15} /> Export</button>
          <button className="btn-primary" onClick={() => fileInputRef.current?.click()}><UploadCloud size={15} /> Upload</button>
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
            style={{ cursor: 'pointer' }}
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDrag} onDragLeave={handleDrag}
            onDragOver={handleDrag} onDrop={handleDrop}
          >
            {uploaded ? (
              <>
                <CheckCircle size={44} color="var(--success)" />
                <div className="upload-text">
                  <h3 style={{ color: 'var(--success)' }}>Upload Complete!</h3>
                  <p>Extracted and synced to fleet ledger</p>
                </div>
              </>
            ) : (
              <>
                <div className="upload-icon"><UploadCloud size={32} /></div>
                <div className="upload-text">
                  <h3>Drag & Drop Paperwork</h3>
                  <p>or click to browse local files</p>
                </div>
                <p style={{ fontSize: 11, color: 'var(--text-muted)' }}>PDF, JPG, PNG — Max 10MB per file</p>
              </>
            )}
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '22px' }}>
          <h3 style={{ marginBottom: 14, fontSize: 15, fontWeight: 600 }}>Recent Processing ({filteredDocs.length})</h3>
          <div className="activity-list stagger-children">
            {filteredDocs.map(doc => (
              <div key={doc.id} className="activity-item">
                <div className="activity-icon"><File size={18} color="var(--primary)" /></div>
                <div className="activity-content" style={{ minWidth: 0 }}>
                  <h4 className="ellipsis">{doc.name}</h4>
                  <p style={{ color: `var(--${doc.tone})` }}>
                    {doc.tone === 'success' ? '✓ ' : doc.tone === 'warning' ? '⚙ ' : '! '}
                    {doc.status}
                  </p>
                </div>
                <div className="activity-time">{doc.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

