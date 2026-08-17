'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function BookPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id

  const listings: any = {
    "1": {
      title: "Mobile Oil Change",
      price: 25,
      category: "Oil Change",
      location: "Vista, CA",
      provider: "MidnightMechanix"
    },
    "2": {
      title: "OBD Diagnostic Scan",
      price: 40,
      category: "Diagnostics",
      location: "San Diego Area",
      provider: "DiagPro"
    },
    "3": {
      title: "Brake Pad Replacement",
      price: 120,
      category: "Brakes",
      location: "Inland Empire",
      provider: "BrakeKing"
    }
  }

  const listing = listings[id as string]

  if (!listing) {
    return (
      <main style={{ padding: '20px', fontFamily: 'system-ui' }}>
        <p>Listing not found.</p>
        <Link href="/listings">← Back to listings</Link>
      </main>
    )
  }

  const handlePay = async () => {
    try {
      if (!(window as any).Pi) {
        alert('Pi SDK not loaded. Please open this app inside the Pi Browser.')
        return
      }

      const paymentData = {
        amount: listing.price,
        memo: `Booking: ${listing.title}`,
        metadata: {
          listingId: id,
          title: listing.title,
          provider: listing.provider
        }
      }

      const callbacks = {
        onReadyForServerApproval: (paymentId: string) => {
          console.log('Ready for server approval:', paymentId)
          // Later we will call our backend here to approve the payment
          // For now we just log it
        },
        onReadyForServerCompletion: (paymentId: string, txid: string) => {
          console.log('Payment completed:', paymentId, txid)
          // Later we will call our backend here to complete the payment
          router.push('/success')
        },
        onCancel: (paymentId: string) => {
          console.log('Payment cancelled:', paymentId)
          alert('Payment was cancelled.')
        },
        onError: (error: any, payment: any) => {
          console.error('Payment error:', error)
          alert('Payment failed. Please try again.')
        }
      }

      await (window as any).Pi.createPayment(paymentData, callbacks)

    } catch (error) {
      console.error('Error creating payment:', error)
      alert('Could not start payment. Make sure you are in the Pi Browser.')
    }
  }

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '16px' }}>
        <Link href="/listings" style={{ color: '#7c3aed', textDecoration: 'none' }}>
          ← Back
        </Link>
      </div>

      <h1 style={{ marginBottom: '8px' }}>Confirm Booking</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Review the details before paying</p>

      <div style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '24px',
        backgroundColor: '#fff'
      }}>
        <h2 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{listing.title}</h2>
        <p style={{ margin: '0 0 4px 0', color: '#666' }}>{listing.category}</p>
        <p style={{ margin: '0 0 4px 0', color: '#666' }}>{listing.location}</p>
        <p style={{ margin: '0 0 16px 0', color: '#888', fontSize: '14px' }}>
          Provider: {listing.provider}
        </p>
        
        <div style={{ 
          borderTop: '1px solid #e5e7eb', 
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: '15px', color: '#666' }}>Total</span>
          <
