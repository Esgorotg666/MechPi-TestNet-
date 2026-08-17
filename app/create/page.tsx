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
        id: Date.now().toString(),
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
        <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Basic fields */}
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>Service Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px
