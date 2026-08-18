'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function CreateListingPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Oil Change')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [availableSlots, setAvailableSlots] = useState<{date: string, time: string}[]>([])
  const [newDate, setNewDate] = useState('')
  const [newTime, setNewTime] = useState('09:00')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e: any) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file: any) => {
      if (!file.type.startsWith('image/')) return
      if (file.size > 1 * 1024 * 1024) {
        setError('Image must be smaller than 1MB')
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }

  const addSlot = () => {
    if (!newDate || !newTime) return
    setAvailableSlots([...availableSlots, { date: newDate, time: newTime }])
    setNewDate('')
  }

  const removeSlot = (index: number) => {
    setAvailableSlots(availableSlots.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!title.trim()) throw new Error('Please enter a service title')
      if (!price || Number(price) <= 0) throw new Error('Please enter a valid price')

      const newListing = {
        id: crypto.randomUUID(),
        title: title.trim(),
        price: Number(price),
        category,
        location: location.trim() || 'Not specified',
        description: description.trim(),
        images,
        availableSlots,
        provider: 'You',
        createdAt: new Date().toISOString(),
        status: 'Active',
        bookings: 0
      }

      const existing = localStorage.getItem('mechpi_listings')
      const listings = existing ? JSON.parse(existing) : []
      listings.unshift(newListing)
      localStorage.setItem('mechpi_listings', JSON.stringify(listings))

      router.push('/my-listings')
    } catch (err: any) {
      setError(err.message || 'Failed to save listing')
      setIsSubmitting(false)
    }
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>← Back</Link>
      </div>

      <h1 style={{ marginBottom: '20px' }}>Create a Listing</h1>

      {error && (
        <div style={{
          backgroundColor: '#fef2f2',
          color: '#b91c1c',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Service Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Price (π)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          >
            <option>Oil Change</option>
            <option>Diagnostics</option>
            <option>Brakes</option>
            <option>Battery / Electrical</option>
            <option>Engine Work</option>
            <option>Other</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
        </div>

        {/* Availability Section */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Available Time Slots</label>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              style={{ width: '110px', padding: '8px', borderRadius: '6px', border: '1px solid #d1d5db' }}
            />
            <button
              type="button"
              onClick={addSlot}
              style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', borderRadius: '6px', padding: '0 14px' }}
            >
              Add
            </button>
          </div>

          {availableSlots.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {availableSlots.map((slot, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  backgroundColor: '#f9fafb',
                  padding: '8px 10px',
                  borderRadius: '6px'
                }}>
                  <span style={{ fontSize: '14px' }}>{slot.date} at {slot.time}</span>
                  <button
                    type="button"
                    onClick={() => removeSlot(index)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>No slots added yet</p>
          )}
        </div>

        {/* Images */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Photos</label>
          <input type="file" accept="image/*" multiple onChange={handleImageChange} />
          {images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
              {images.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={img}
                    alt=""
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    style={{
                      position: 'absolute',
                      top: '-6px',
                      right: '-6px',
                      backgroundColor: '#ef4444',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '20px',
                      height: '20px',
                      fontSize: '12px'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#a78bfa' : '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600'
          }}
        >
          {isSubmitting ? 'Saving...' : 'Create Listing'}
        </button>
      </form>
    </main>
  )
}
