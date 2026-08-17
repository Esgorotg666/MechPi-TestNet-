'use client'

export default function ErrorBanner({ 
  message, 
  onClose 
}: { 
  message: string
  onClose?: () => void 
}) {
  if (!message) return null

  return (
    <div style={{
      backgroundColor: '#fef2f2',
      color: '#b91c1c',
      padding: '12px 16px',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid #fecaca'
    }}>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#b91c1c',
            fontSize: '18px',
            cursor: 'pointer',
            padding: '0 0 0 12px'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}
