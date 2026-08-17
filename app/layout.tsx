export const metadata = {
  title: 'MechPi',
  description: 'Local auto repair & services marketplace paid with Pi',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
