'use client'

import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import ErrorBanner from '@/components/ErrorBanner'

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
  const [error, setError] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechpi_listings')
      if (saved) {
        const listings = JSON.parse(saved)
        const found = listings.find((item: any) => item.id === id)
        setListing(found || null)
      }
    } catch (err) {
      console.error(err)
      setError('Failed to load listing')
    } finally {
      setLoading(false)
    }
  }, [id])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
