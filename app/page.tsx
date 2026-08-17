'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Initialize Pi SDK
    if (typeof window !== 'undefined' && (window as any).Pi) {
      (window as any).Pi.init({ version: "2.0", sandbox: true })
    }
    setLoading(false)
  }, [])

  const handleLogin = async () => {
    try {
      const scopes = ['username', 'payments']
      const authResult = await (window as any).Pi.authenticate(scopes, onIncompletePaymentFound)
      setUser(authResult.user)
      console.log('User authenticated:', authResult.user)
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Make sure you are inside the Pi Browser.')
    }
  }

  function onIncompletePaymentFound(payment: any) {
    console.log('Incomplete payment found:', payment)
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>MechPi</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Local auto repair & services marketplace paid with Pi
      </p>

      {loading ? (
        <p>Loading...</p>
      ) : user ? (
        <div>
          <p style={{ marginBottom: '10px' }}>
            Logged in as: <strong>{user.username}</
