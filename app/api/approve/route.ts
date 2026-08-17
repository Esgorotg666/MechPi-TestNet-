import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { paymentId } = await req.json()

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 })
    }

    // Get your API Key from the Pi Developer Portal
    const apiKey = process.env.PI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 })
    }

    // Call Pi Platform to approve the payment
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Pi approve error:', errorData)
      return NextResponse.json({ error: 'Failed to approve payment' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Approve error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
