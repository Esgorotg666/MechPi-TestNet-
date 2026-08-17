'use client'

import Link from 'next/link'

export default function ListingsPage() {
  const listings = [
    {
      id: 1,
      title: "Mobile Oil Change",
      price: 25,
      category: "Oil Change",
      location: "Vista, CA",
      provider: "MidnightMechanix"
    },
    {
      id: 2,
      title: "OBD Diagnostic Scan",
      price: 40,
      category: "Diagnostics",
      location: "San Diego Area",
      provider: "DiagPro"
    },
    {
      id: 3,
      title: "Brake Pad Replacement",
      price: 120,
      category: "Brakes",
      location: "Inland Empire",
      provider: "Brake
