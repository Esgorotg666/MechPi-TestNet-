'use client'

import { useEffect } from 'react'

export default function Toast({ 
  message, 
  type = 'error',
  onClose 
}: { 
  message: string
  type?: 'error' | 'success'
  onClose: () => void 
}) {
  useEffect(() => {
    if (!message) return

    const timer = setTimeout(() => {
      onClose()
    }, 4000)

    return () => clearTimeout(timer)
  }, [message, onClose])

  if (!message) return null

  const isError = type === 'error'

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: isError ? '#991b1b' : '#166534',
      color: 'white',
      padding: '14px 20px',
      borderRadius: '10px',
      fontSize: '14px',
      fontWeight: '500',
      zIndex: 9999,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      maxWidth: '90%',
      display: 'flex',
      alignItems: 'center',
      gap: '12px'
    }}>
      <span>{message}</span>
      <button
        onClick={onClose}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '18px',
          cursor: 'pointer',
          padding: 0,
          lineHeight: 1
        }}
      >
        ×
      </button>
    </div>
  )
}
