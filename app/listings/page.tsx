'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ListingsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechpi_listings')
      if (saved) {
        setListings(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Error loading listings:', error)
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

      <h1 style={{ marginBottom: '8px' }}>Available Services</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Local auto repair & services paid in Pi</p>

      {loading ? (
        <p>Loading listings...</p>
      ) : listings.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 20px', color: '#666' }}>
          <p style={{ marginBottom: '16px' }}>No services listed yet.</p>
          <Link
            href="/create"
            style={{
              display: 'inline-block',
              backgroundColor: '#7c3aed',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none'
            }}
          >
            Create the first listing
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {listings.map((listing) => (
            <div
              key={listing.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                overflow: 'hidden',
                backgroundColor: '#fff'
              }}
            >
              {/* Image */}
              {listing.images && listing.images.length > 0 && (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  style={{
                    width: '100%',
                    height: '180px',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              )}

              <div style={{ padding: '16px' }}>
                <h2 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>{listing.title}</h2>
                <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>
                  {listing.category} • {listing.location}
                </p>
                <p style={{ margin: '0 0 12px 0', color: '#888', fontSize: '13px' }}>
                  by {listing.provider}
                </p>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#7c3aed', fontSize: '18px' }}>
                    {listing.price} π
                  </p>
                  
                  <Link
                    href={`/book/${listing.id}`}
                    style={{
                      backgroundColor: '#7c3aed',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '500',
                      textDecoration: 'none'
                    }}
                  >
                    Book
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
