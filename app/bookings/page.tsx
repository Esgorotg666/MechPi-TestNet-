'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Toast from '@/components/Toast'

function StatusBadge({ status }: { status: string }) {
  const styles: any = {
    Confirmed: { backgroundColor: '#dcfce7', color: '#166534' },
    Pending: { backgroundColor: '#fef3c7', color: '#92400e' },
    Completed: { backgroundColor: '#e0e7ff', color: '#3730a3' },
    Cancelled: { backgroundColor: '#fee2e2', color: '#991b1b' }
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
  const [cancellingIndex, setCancellingIndex] = useState<number | null>(null)
  const [toast, setToast] = useState<{ message: string, type: 'error' | 'success' }>({
    message: '',
    type: 'error'
  })

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
      setToast({ message: 'Failed to load bookings', type: 'error' })
    } finally {
      setLoading(false)
    }
  }, [])

  const cancelBooking = async (index: number) => {
    const confirmed = window.confirm('Are you sure you want to cancel this booking?')
    if (!confirmed) return

    const previousBookings = [...bookings]
    const updated = [...bookings]
    updated[index] = {
      ...updated[index],
      status: 'Cancelled'
    }

    // Optimistic update
    setBookings(updated)
    setCancellingIndex(index)

    try {
      localStorage.setItem('mechpi_bookings', JSON.stringify(updated))

      // Restore the time slot
      const booking = previousBookings[index]
      if (booking.selectedSlot && booking.listingId) {
        const [date, time] = booking.selectedSlot.split('|')
        const listings = JSON.parse(localStorage.getItem('mechpi_listings') || '[]')
        const listingIndex = listings.findIndex((l: any) => l.id === booking.listingId)

        if (listingIndex !== -1) {
          const slots = listings[listingIndex].availableSlots || []
          const slotExists = slots.some((s: any) => s.date === date && s.time === time)
          
          if (!slotExists) {
            listings[listingIndex].availableSlots = [...slots, { date, time }]
            localStorage.setItem('mechpi_listings', JSON.stringify(listings))
          }
        }
      }

      setToast({ message: 'Booking cancelled successfully', type: 'success' })
    } catch (error) {
      console.error('Failed to cancel booking:', error)
      setBookings(previousBookings)
      setToast({ message: 'Failed to cancel booking. Please try again.', type: 'error' })
    } finally {
      setCancellingIndex(null)
    }
  }

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
                backgroundColor: '#fff',
                opacity: cancellingIndex === index ? 0.6 : 1,
                transition: 'opacity 0.2s'
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

              {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                <button
                  onClick={() => cancelBooking(index)}
                  disabled={cancellingIndex === index}
                  style={{
                    marginTop: '12px',
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    border: 'none',
                    padding: '8px 14px',
                    borderRadius: '6px',
                    fontSize: '13px',
                    fontWeight: '500',
                    cursor: cancellingIndex === index ? 'not-allowed' : 'pointer'
                  }}
                >
                  {cancellingIndex === index ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <Toast 
        message={toast.message} 
        type={toast.type} 
        onClose={() => setToast({ message: '', type: 'error' })} 
      />
    </main>
  )
}
