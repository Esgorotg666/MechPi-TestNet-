'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSlot, setSelectedSlot] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    
    if (!name.trim() || !phone.trim()) {
      alert('Please fill in your name and phone number')
      return
    }

    if (!selectedSlot && listing?.availableSlots?.length > 0) {
      alert('Please select an available time slot')
      return
    }

    setIsSubmitting(true)

    const bookingData = {
      listingId: id,
      title: listing.title,
      price: listing.price,
      category: listing.category,
      location
