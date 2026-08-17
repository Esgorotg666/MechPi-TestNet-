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
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

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
        imageUrl: imageUrl.trim() || null,
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
      console.error('Error saving listing:',
