import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { paymentId } = body

    if (!paymentId) {
      return NextResponse.json({ error: 'Missing paymentId' }, { status: 400 })
    }

    const apiKey = process.env.PI_API_KEY

    if (!apiKey) {
      console.error('PI_API_KEY is missing')
      return NextResponse.json({ error: 'API Key not configured' }, { status: 500 })
    }

    const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Pi Approve Error:', data)
      return NextResponse.json({ error: 'Failed to approve payment', details: data }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Approve route error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
