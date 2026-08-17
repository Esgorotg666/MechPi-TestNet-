'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function MyListingsPage() {
  const [listings, setListings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mechpi_listings')
      if (saved) {
        // For now show all listings (later we filter by the logged-in user)
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

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ margin: 0 }}>My Listings</h1>
        <Link 
          href="/create"
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '8px 14px',
