'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function CreateListingPage() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Oil Change')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()
    alert('Listing created (this is just a demo for now)\n\n' + 
          `Title: ${title}\nPrice: ${price} π\nCategory: ${category}`)
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '20px' }}>
        <Link href="/" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ marginBottom: '20px' }}>Create a Listing</h1>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Service Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Mobile Oil Change"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Price (π)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25"
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
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
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Location
          </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Vista, CA"
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '6px', fontWeight: '500' }}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the service..."
            rows={4}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '16px'
            }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            border: 'none',
            padding: '14px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '10px'
          }}
        >
          Create Listing
        </button>
      </form>
    </main>
  )
}
