'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      // For now we store bookings in localStorage
      // Later this will come from Supabase
      const saved = localStorage.getItem('mechpi_bookings')
      if (saved) {
        setBookings(JSON.parse(saved))
      }

      // Also check the last booking
      const last = localStorage.getItem('lastBooking')
      if (last) {
        const lastBooking = JSON.parse(last)
        const existing = saved ? JSON.parse(saved) : []
        
        // Add it if it's not already in the list
        const alreadyExists = existing.some((b: any) => 
          b.createdAt === lastBooking.createdAt
        )
        
        if (!alreadyExists) {
          const updated = [lastBooking, ...existing]
          localStorage.setItem('mechpi_bookings', JSON.stringify(updated))
          setBookings(updated)
        }
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <h1 style={{ marginBottom: '8px' }}>My Bookings</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        Your booking history
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p style={{ marginBottom: '16px' }}>No bookings yet.</p>
          <Link
            href="/listings"
            style={{
              display: 'inline-block',
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            Browse Services
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {bookings.map((booking, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '17px' }}>{booking.title}</h2>
                <span style={{
                  fontSize: '12px',
                  backgroundColor: '#dcfce7',
                  color: '#166534',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}>
                  Confirmed
                </span>
              </div>

              <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                {booking.price} π
              </p>

              {booking.selectedSlot && (
                <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                  {booking.selectedSlot.replace('|', ' at ')}
                </p>
              )}

              <p style={{ margin: '0 0 4px 0', color: '#888', fontSize: '13px' }}>
                {booking.customerName} • {booking.customerPhone}
              </p>

              {booking.notes && (
                <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: '#666' }}>
                  Note: {booking.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
