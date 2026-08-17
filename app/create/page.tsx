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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleImageChange = (e: any) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    Array.from(files).forEach((file: any) => {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed')
        return
      }

      // Limit file size to 1MB
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

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!title.trim()) throw new Error('Please enter a service title')
      if (!price || Number(price) <= 0) throw new Error('Please enter a valid price')

      const newListing = {
        id: Date.now().toString(),
        title: title.trim(),
        price: Number(price),
        category,
        location: location.trim() || 'Not specified',
        description: description.trim(),
        images: images,
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
      console.error('Error saving listing:', err)
      setError(err.message || 'Failed to save listing. Please try again.')
      setIsSubmitting(false)
    }
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back
        </Link>
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
            placeholder="e.g. Mobile Oil Change"
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
            placeholder="25"
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
            placeholder="e.g. Vista, CA"
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px' }}
          />
        </div>

        {/* Image Upload Section */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Photos
          </label>

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ marginBottom: '12px' }}
          />

          {images.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {images.map((img, index) => (
                <div key={index} style={{ position: 'relative' }}>
                  <img
                    src={img}
                    alt={`Preview ${index + 1}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '8px',
                      border: '1px solid #e5e7eb'
                    }}
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
                      width: '22px',
                      height: '22px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
          <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#888' }}>
            Max 1MB per image. Base64 (temporary storage)
          </p>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the service..."
            rows={4}
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
            fontWeight: '600',
            marginTop: '10px',
            opacity: isSubmitting ? 0.7 : 1
          }}
        >
          {isSubmitting ? 'Saving...' : 'Create Listing'}
        </button>
      </form>
    </main>
  )
}
