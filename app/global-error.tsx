'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body style={{ margin: 0, fontFamily: 'system-ui' }}>
        <main style={{
          padding: '40px 20px',
          maxWidth: '480px',
          margin: '0 auto',
          textAlign: 'center',
          minHeight: '100vh',
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
            A critical error occurred. Please try refreshing the page.
          </p>

          <button
            onClick={() => reset()}
            style={{
              backgroundColor: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  )
}
