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
  const [imageUrls, setImageUrls] = useState<string[]>([''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const addImageField = () => {
    setImageUrls([...imageUrls, ''])
  }

  const updateImageUrl = (index: number, value: string) => {
    const updated = [...imageUrls]
    updated[index] = value
    setImageUrls(updated)
  }

  const removeImageField = (index: number) => {
    if (imageUrls.length === 1) return
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!title.trim()) throw new Error('Please enter a service title')
      if (!price || Number(price) <= 0) throw new Error('Please enter a valid price')

      // Filter out empty image URLs
      const cleanImages = imageUrls.filter(url => url.trim() !== '')

      const newListing = {
        id: Date.now().toString(),
        title: title.trim(),
        price: Number(price),
        category,
        location: location.trim() || 'Not specified',
        description: description.trim(),
        images: cleanImages,
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

        {/* Image Gallery Section */}
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Images (optional)
          </label>
          
          {imageUrls.map((url, index) => (
            <div key={index} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
