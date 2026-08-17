import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { paymentId, txid } = await req.json()

    if (!paymentId || !txid) {
      return NextResponse.json({ error: 'Missing paymentId or txid' }, { status: 400 })
    }

    const apiKey = process.env.PI_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 })
    }

    // Call Pi Platform to complete the payment
    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/complete`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ txid })
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Pi complete error:', errorData)
      return NextResponse.json({ error: 'Failed to complete payment' }, { status: 500 })
    }

    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('Complete error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
