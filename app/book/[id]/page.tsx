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
        <
