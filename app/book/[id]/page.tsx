'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechpi_listings')
      if (saved) {
        const listings = JSON.parse(saved)
        const found = listings.find((item: any) => item.id === id)
        setListing(found || null)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number')
      return
    }

    if (!selectedSlot && listing?.availableSlots?.length > 0) {
      alert('Please select an available time slot')
      return
    }

    setIsSubmitting(true)

    const bookingData = {
      listingId: id,
      title: listing.title,
      price: listing.price,
      category: listing.category,
      location: listing.location,
      provider: listing.provider,
      customerName: name,
      customerPhone: phone,
      selectedSlot,
      notes,
      createdAt: new Date().toISOString()
    }

    localStorage.setItem('lastBooking', JSON.stringify(bookingData))

    // Remove the selected slot so it can't be double-booked
    if (selectedSlot) {
      const [date, time] = selectedSlot.split('|')
      const updatedListings = JSON.parse(localStorage.getItem('mechpi_listings') || '[]')
      const listingIndex = updatedListings.findIndex((l: any) => l.id === id)
      
      if (listingIndex !== -1) {
        updatedListings[listingIndex].availableSlots = 
          updatedListings[listingIndex].availableSlots.filter(
            (slot: any) => !(slot.date === date && slot.time === time)
          )
        localStorage.setItem('mechpi_listings', JSON.stringify(updatedListings))
      }
    }

    // Start Pi Payment
    try {
      if (!(window as any).Pi) {
        alert('Pi SDK not loaded. Open this app in the Pi Browser.')
        setIsSubmitting(false)
        return
      }

      const paymentData = {
        amount: listing.price,
        memo: `Booking: ${listing.title}`,
        metadata: { listingId: id, customerName: name, slot: selectedSlot }
      }

      const callbacks = {
        onReadyForServerApproval: async (paymentId: string) => {
          await fetch('/api/approve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId })
          })
        },
        onReadyForServerCompletion: async (paymentId: string, txid: string) => {
          await fetch('/api/complete', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentId, txid })
          })
          router.push('/success')
        },
        onCancel: () => {
          alert('Payment cancelled')
          setIsSubmitting(false)
        },
        onError: () => {
          alert('Payment failed')
          setIsSubmitting(false)
        }
      }

      await (window as any).Pi.createPayment(paymentData, callbacks)
    } catch (error) {
      console.error(error)
      alert('Could not start payment')
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 20, fontFamily: 'system-ui' }}>
        <p>Loading...</p>
      </main>
    )
  }

  if (!listing) {
    return (
      <main style={{ padding: 20, fontFamily: 'system-ui' }}>
        <p>Listing not found</p>
        <Link href="/listings">← Back</Link>
      </main>
    )
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/listings" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ marginBottom: '6px' }}>Book Service</h1>
      <p style={{ color: '#666', marginBottom: '20px' }}>
        {listing.title} • {listing.price} π
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* Available Slots */}
        {listing.availableSlots && listing.availableSlots.length > 0 ? (
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
              Select Available Time *
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {listing.availableSlots.map((slot: any, index: number) => {
                const value = `${slot.date}|${slot.time}`
                return (
                  <label
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '12px',
                      border: selectedSlot === value ? '2px solid #7c3aed' : '1px solid #e5e7eb',
                      borderRadius: '8px',
                      backgroundColor: selectedSlot === value ? '#f5f3ff' : '#fff',
                      cursor: 'pointer'
                    }}
                  >
                    <input
                      type="radio"
                      name="slot"
                      value={value}
                      checked={selectedSlot === value}
                      onChange={() => setSelectedSlot(value)}
                    />
                    <span>{slot.date} at {slot.time}</span>
                  </label>
                )
              })}
            </div>
          </div>
        ) : (
          <div style={{ padding: '12px', backgroundColor: '#fef3c7', borderRadius: '8px', fontSize: '14px' }}>
            No specific time slots set. Provider will contact you to schedule.
          </div>
        )}

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Your Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Phone Number *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            placeholder="Vehicle details or special requests..."
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div style={{ backgroundColor: '#f9fafb', borderRadius: '10px', padding: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '18px' }}>
            <span>Total</span>
            <span style={{ color: '#7c3aed' }}>{listing.price} π</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            backgroundColor: isSubmitting ? '#a78bfa' : '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          {isSubmitting && (
            <span
              style={{
                width: '18px',
                height: '18px',
                border: '2px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                display: 'inline-block',
                animation: 'spin 0.8s linear infinite'
              }}
            />
          )}
          {isSubmitting ? 'Processing...' : 'Pay with Pi'}
        </button>
      </form>

      <style jsx>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </main>
  )
}
