'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <main style={{
      padding: '40px 20px',
      fontFamily: 'system-ui',
      maxWidth: '480px',
      margin: '0 auto',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{
        width: '70px',
        height: '70px',
        backgroundColor: '#fee2e2',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '28px'
      }}>
        !
      </div>

      <h1 style={{ margin: '0 0 12px 0', fontSize: '22px' }}>
        Something went wrong
      </h1>

      <p style={{ color: '#666', marginBottom: '28px', lineHeight: '1.5' }}>
        An unexpected error occurred. Please try again.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Try Again
        </button>

        <Link
          href="/"
          style={{
            display: 'block',
            backgroundColor: '#f3f4f6',
            color: '#111',
            padding: '14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Go Home
        </Link>
      </div>
    </main>
  )
}
