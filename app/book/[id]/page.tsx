'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function BookPage() {
  const params = useParams()
  const id = params.id

  // Temporary fake data (later this will come from a database)
  const listings: any = {
    "1": {
      title: "Mobile Oil Change",
      price: 25,
      category: "Oil Change",
      location: "Vista, CA",
      provider: "MidnightMechanix"
    },
    "2": {
      title: "OBD Diagnostic Scan",
      price: 40,
      category: "Diagnostics",
      location: "San Diego Area",
      provider: "DiagPro"
    },
    "3": {
      title: "Brake Pad Replacement",
      price: 120,
      category: "Brakes",
      location: "Inland Empire",
      provider: "BrakeKing"
    }
  }

  const listing = listings[id as string]

  if (!listing) {
    return (
      <main style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <p>Listing not found.</p>
        <Link href="/listings">← Back to listings</Link>
      </main>
    )
  }

  const handlePay = () => {
    alert(`Payment of ${listing.price} π would start here.\n\n(Pi payment integration coming next)`)
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/listings" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ marginBottom: '8px' }}>Confirm Booking</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Review the details before paying</p>

      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{listing.title}</h2>
        <p style={{ margin: '0 0 4px 0', color: '#666' }}>{listing.category}</p>
        <p style={{ margin: '0 0 4px 0', color: '#666' }}>{listing.location}</p>
        <p style={{ margin: '0 0 16px 0', color: '#888', fontSize: '14px' }}>
          Provider: {listing.provider}
        </p>
        
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '15px', color: '#666' }}>Total</span>
          <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#7c3aed' }}>
            {listing.price} π
          </span>
        </div>
      </div>

      <button
        onClick={handlePay}
        style={{
          width: '100%',
          backgroundColor: '#7c3aed',
          color: 'white',
          border: 'none',
          padding: '14px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600'
        }}
      >
        Pay with Pi
      </button>
    </main>
  )
}
