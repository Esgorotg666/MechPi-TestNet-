'use client'

import Link from 'next/link'

export default function SuccessPage() {
  return (
    <main style={{ 
      padding: '20px', 
      fontFamily: 'system-ui', 
      maxWidth: '500px', 
      margin: '0 auto',
      textAlign: 'center',
      paddingTop: '60px'
    }}>
      <div style={{
        width: '70px',
        height: '70px',
        backgroundColor: '#dcfce7',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '32px'
      }}>
        ✓
      </div>

      <h1 style={{ marginBottom: '12px' }}>Booking Confirmed</h1>
      <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.5' }}>
        Your service has been booked. The provider will contact you soon.
      </p>

      <Link
        href="/listings"
        style={{
          display: 'inline-block',
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '12px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        Back to Services
      </Link>
    </main>
  )
}
