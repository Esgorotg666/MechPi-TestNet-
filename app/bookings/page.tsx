'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Confirmed: {
      backgroundColor: '#dcfce7',
      color: '#166534'
    },
    Pending: {
      backgroundColor: '#fef3c7',
      color: '#92400e'
    },
    Completed: {
      backgroundColor: '#e0e7ff',
      color: '#3730a3'
    },
    Cancelled: {
      backgroundColor: '#fee2e2',
      color: '#991b1b'
    }
  }

  const style = styles[status] || styles.Confirmed

  return (
    <span style={{
      fontSize: '12px',
      fontWeight: '500',
      padding: '3px 10px',
      borderRadius: '999px',
      ...style
    }}>
      {status}
    </span>
  )
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechpi_bookings')
      let allBookings = saved ? JSON.parse(saved) : []

      const last = localStorage.getItem('lastBooking')
      if (last) {
        const lastBooking = JSON.parse(last)
        const alreadyExists = allBookings.some((b: any) => 
          b.createdAt === lastBooking.createdAt
        )
        
        if (!alreadyExists) {
          lastBooking.status = 'Confirmed'
          allBookings = [lastBooking, ...allBookings]
          localStorage.setItem('mechpi_bookings', JSON.stringify(allBookings))
        }
      }

      setBookings(allBookings)
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '17px', paddingRight: '12px' }}>
                  {booking.title}
                </h2>
                <StatusBadge status={booking.status || 'Confirmed'} />
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
