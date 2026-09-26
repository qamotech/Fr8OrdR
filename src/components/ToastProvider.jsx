import { createContext, useContext, useState, useCallback } from 'react'
import { CheckCircle, Info, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext()

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'info', duration = 3500) => {
    const id = ++toastId
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, exiting: true } : t))
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 300)
    }, duration)
  }, [])

  const icons = {
    success: <CheckCircle size={20} />,
    info: <Info size={20} />,
    warning: <AlertTriangle size={20} />
  }

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast toast-${t.type} ${t.exiting ? 'exiting' : ''}`}>
            <div className="toast-icon">{icons[t.type] || icons.info}</div>
            <span style={{ flex: 1 }}>{t.message}</span>
            <X size={16} style={{ cursor: 'pointer', opacity: 0.5 }} onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
