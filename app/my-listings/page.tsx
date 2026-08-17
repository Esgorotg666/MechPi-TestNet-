'use client'

import Link from 'next/link'

export default function MyListingsPage() {
  // Temporary fake data
  const myListings = [
    {
      id: 1,
      title: "Mobile Oil Change",
      price: 25,
      category: "Oil Change",
      status: "Active",
      bookings: 3
    },
    {
      id: 2,
      title: "OBD Diagnostic Scan",
      price: 40,
      category: "Diagnostics",
      status: "Active",
      bookings: 1
    }
  ]

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>My Listings</h1>
        <Link 
          href="/create"
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '8px 14px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px'
          }}
        >
          + New
        </Link>
      </div>

      {myListings.length === 0 ? (
        <p style={{ color: '#666' }}>You haven’t created any listings yet.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {myListings.map((listing) => (
            <div
              key={listing.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '16px',
                backgroundColor: '#fff'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h2 style={{ margin: 0, fontSize: '17px' }}>{listing.title}</h2>
                <span style={{ 
                  fontSize: '12px', 
                  backgroundColor: '#dcfce7', 
                  color: '#166534',
                  padding: '2px 8px',
                  borderRadius: '999px'
                }}>
                  {listing.status}
                </span>
              </div>
              
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
                {listing.category} • {listing.price} π
              </p>
              
              <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>
                {listing.bookings} booking{listing.bookings !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
