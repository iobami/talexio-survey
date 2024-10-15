'use client'

import { Suspense, useEffect, useState } from 'react'
import { Header, Sidebar } from '@/components/shared/dashboard'

function Main ({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="app_dash_main flex-1">
      <Sidebar />

      <div className="app_dash_main__ctt">
        <Header />

        <div className="app_dash_main__ctt__mn">
          <div className="app_dashboard_page">{children}</div>
        </div>
      </div>
    </main>
  )
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Suspense fallback={null}>
      <Main>{children}</Main>
    </Suspense>
  )
}
