'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SuccessPage() {
  const [booking, setBooking] = useState<any>(null)

  useEffect(() => {
    // Get the last booking from localStorage
    const saved = localStorage.getItem('lastBooking')
    if (saved) {
      setBooking(JSON.parse(saved))
    }
  }, [])

  return (
    <main style={{ 
      padding: '20px', 
      fontFamily: 'system-ui', 
      maxWidth: '500px', 
      margin: '0 auto',
      textAlign: 'center',
      paddingTop: '50px'
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

      <h1 style={{ marginBottom: '12px' }}>Booking Confirmed!</h1>
      
      {booking ? (
        <div style={{ 
          textAlign: 'left',
          backgroundColor: '#f9fafb',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ margin: '0 0 6px 0', fontWeight: '600' }}>{booking.title}</p>
          <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
            {booking.category} • {booking.location}
          </p>
          <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
            Provider: {booking.provider}
          </p>
          <p style={{ margin: '8px 0 0 0', fontWeight: 'bold', color: '#7c3aed' }}>
            {booking.price} π paid
          </p>
        </div>
      ) : (
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Your service has been booked successfully.
        </p>
      )}

      <Link
        href="/
