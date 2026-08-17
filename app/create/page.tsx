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
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      // Basic validation
      if (!title.trim()) {
        throw new Error('Please enter a service title')
      }

      if (!price || Number(price) <= 0) {
        throw new Error('Please enter a valid price')
      }

      // Create the new listing object
      const newListing = {
        id: Date.now().toString(),
        title: title.trim(),
        price: Number(price),
        category,
        location: location.trim() || 'Not specified',
        description: description.trim(),
        provider: 'You', // Later we will use the real Pi username
        createdAt: new Date().toISOString(),
        status: 'Active',
        bookings: 0
      }

      // Get existing listings from localStorage
      const
