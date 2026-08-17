'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    const saved = localStorage.getItem('lastBooking')
    if (saved) {
      try {
        setBooking(JSON.parse(saved))
      } catch (error) {
        console.error('Error reading booking:', error)
      }
    }
  }, [])

  return (
    <main style={{
      padding: '20px',
      fontFamily: 'system-ui',
      maxWidth: '480px',
      margin: '0 auto',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      {/* Success Icon */}
      <div style={{
        width: '80px',
        height: '80px',
        backgroundColor: '#dcfce7',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 24px',
        fontSize: '36px'
      }}>
        ✓
      </div>

      <h1 style={{
        textAlign: 'center',
        margin: '0 0 8px 0',
        fontSize: '24px'
      }}>
        Booking Confirmed!
      </h1>

      <p style={{
        textAlign: 'center',
        color: '#666',
        marginBottom: '32px',
        lineHeight: '1.5'
      }}>
        Your payment was successful. The provider will contact you soon.
      </p>

      {/* Booking Details Card */}
      {booking && (
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '32px',
          border: '1px solid #e5e7eb'
        }}>
          <h2 style={{
            margin: '0 0 12px 0',
            fontSize: '18px'
          }}>
            {booking.title}
          </h2>

          <div style={{ fontSize: '14px', color: '#555', lineHeight: '1.7' }}>
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Price:</strong> {booking.price} π
            </p>
            {booking.selectedSlot && (
              <p style={{ margin: '0 0 4px 0' }}>
                <strong>Time:</strong> {booking.selectedSlot.replace('|', ' at ')}
              </p>
            )}
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Name:</strong> {booking.customerName}
            </p>
            <p style={{ margin: '0 0 4px 0' }}>
              <strong>Phone:</strong> {booking.customerPhone}
            </p>
            {booking.notes && (
              <p style={{ margin: '8px 0 0 0' }}>
                <strong>Notes:</strong> {booking.notes}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Link
          href="/listings"
          style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600'
          }}
        >
          Browse More Services
        </Link>

        <Link
          href="/"
          style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: '#f3f4f6',
            color: '#111',
            padding: '14px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
