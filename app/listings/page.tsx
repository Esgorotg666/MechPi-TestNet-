'use client'

export default function ListingsPage() {
  // Temporary fake data so we can see the layout
  const listings = [
    {
      id: 1,
      title: "Mobile Oil Change",
      price: 25,
      category: "Oil Change",
      location: "Vista, CA"
    },
    {
      id: 2,
      title: "OBD Diagnostic Scan",
      price: 40,
      category: "Diagnostics",
      location: "San Diego Area"
    },
    {
      id: 3,
      title: "Brake Pad Replacement",
      price: 120,
      category: "Brakes",
      location: "Inland Empire"
    }
  ]

  return (
    <main style={{ padding: '20px', fontFamily: 'system-ui', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '8px' }}>Available Services</h1>
      <p style={{ color: '#666', marginBottom: '24px' }}>Local auto repair & services paid in Pi</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {listings.map((listing) => (
          <div
            key={listing.id}
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '16px',
              backgroundColor: '#fff'
            }}
          >
            <h2 style={{ margin: '0 0 6px 0', fontSize: '18px' }}>{listing.title}</h2>
            <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px' }}>
              {listing.category} • {listing.location}
            </p>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#7c3aed', fontSize: '18px' }}>
              {listing.price} π
            </p>
          </div>
        ))}
      </div>
    </main>
  )
}
