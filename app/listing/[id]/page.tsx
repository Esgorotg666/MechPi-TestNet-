'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ListingDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

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
        <p>Listing not found.</p>
        <Link href="/listings" style={{ color: '#7c3aed' }}>← Back to listings</Link>
      </main>
    )
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/listings" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back to listings
        </Link>
      </div>

      {/* Main Image */}
      {listing.images && listing.images.length > 0 ? (
        <div style={{ marginBottom: '16px' }}>
          <img
            src={listing.images[selectedImage]}
            alt={listing.title}
            style={{
              width: '100%',
              height: '260px',
              objectFit: 'cover',
              borderRadius: '12px',
              display: 'block'
            }}
          />

          {/* Thumbnails */}
          {listing.images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', overflowX: 'auto' }}>
              {listing.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt=""
                  onClick={() => setSelectedImage(index)}
                  style={{
                    width: '64px',
                    height: '64px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: selectedImage === index ? '2px solid #7c3aed' : '2px solid transparent',
                    cursor: 'pointer'
                  }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div style={{
          height: '180px',
          backgroundColor: '#f3f4f6',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9ca3af',
          marginBottom: '16px'
        }}>
          No image
        </div>
      )}

      {/* Title & Price */}
      <h1 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>{listing.title}</h1>
      <p style={{ margin: '0 0 16px 0', fontSize: '22px', fontWeight: 'bold', color: '#7c3aed' }}>
        {listing.price} π
      </p>

      {/* Meta */}
      <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
        <p style={{ margin: '0 0 4px 0' }}>{listing.category} • {listing.location}</p>
        <p style={{ margin: 0 }}>Provider: {listing.provider}</p>
      </div>

      {/* Description */}
      {listing.description && (
        <div style={{ marginBottom: '24px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>Description</h3>
          <p style={{ margin: 0, color: '#444', lineHeight: '1.5' }}>{listing.description}</p>
        </div>
      )}

      {/* Available Slots */}
      {listing.availableSlots && listing.availableSlots.length > 0 && (
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Available Times</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {listing.availableSlots.map((slot: any, index: number) => (
              <span
                key={index}
                style={{
                  backgroundColor: '#f3f4f6',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  fontSize: '13px'
                }}
              >
                {slot.date} at {slot.time}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Book Button */}
      <Link
        href={`/book/${listing.id}`}
        style={{
          display: 'block',
          textAlign: 'center',
          backgroundColor: '#7c3aed',
          color: 'white',
          padding: '16px',
          borderRadius: '10px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '16px'
        }}
      >
        Book this Service
      </Link>
    </main>
  )
}
